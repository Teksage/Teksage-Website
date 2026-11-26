import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { CompatibilityFormValues } from "@/types/match-making";
import { parseCompatibilityGet, parseCompatibilityPost } from "@/lib/prediction-api-parse";

export function fetchExistingMatch() {
  return http.get<unknown>(API_ENDPOINTS.matchMakingCompatibility);
}

export async function checkMatchMakingExists(): Promise<boolean> {
  const { data } = await http.get<unknown>(API_ENDPOINTS.matchMakingCompatibility);
  const { existing } = parseCompatibilityGet(data);
  return Boolean(existing?.matchMakingId);
}

export async function submitCompatibility(
  body: CompatibilityFormValues
): Promise<ReturnType<typeof parseCompatibilityPost>> {
  const { data } = await http.post<unknown>(
    API_ENDPOINTS.matchMakingCompatibility,
    body
  );
  return parseCompatibilityPost(data);
}

export async function downloadMatchMakingPdf(
  matchMakingId: number,
  filename: string
): Promise<void> {
  const { data } = await http.post<Blob>(
    API_ENDPOINTS.shareMatchMaking,
    { prediction_id: matchMakingId },
    { responseType: "blob" }
  );
  const url = URL.createObjectURL(data);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
