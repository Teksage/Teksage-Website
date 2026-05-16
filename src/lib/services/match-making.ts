import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { CompatibilityFormValues, RashiOption } from "@/types/match-making";
import { parseCompatibilityGet, parseCompatibilityPost } from "@/lib/prediction-api-parse";

export async function fetchRashiList(): Promise<RashiOption[]> {
  const { data } = await http.get<{ data?: { id: number; name: string }[] }>(
    API_ENDPOINTS.astrologerRashi
  );
  return (data.data ?? []).map((r) => ({ id: r.id, name: r.name }));
}

export async function fetchNakshatraList(
  signId?: number
): Promise<{ id: number; name: string }[]> {
  const q =
    signId != null
      ? `${API_ENDPOINTS.astrologerNakshatra}?sign_id=${signId}`
      : API_ENDPOINTS.astrologerNakshatra;
  const { data } = await http.get<{
    data?: { id: number; name: string }[];
  }>(q);
  return (data.data ?? []).map((n) => ({ id: n.id, name: n.name }));
}

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
