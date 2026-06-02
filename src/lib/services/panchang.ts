import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { PanchangDetail, PanchangPayload } from "@/types";

interface PanchangApiBody {
  data?: unknown;
  panchang_id?: number;
}

function parsePanchangBody(body: PanchangApiBody): PanchangPayload {
  const raw = body?.data;
  if (raw == null || typeof raw !== "object" || Array.isArray(raw)) {
    const msg = typeof raw === "string" ? raw : "Unable to load Panchang.";
    throw new Error(msg);
  }
  const id = Number(body.panchang_id);
  if (!Number.isFinite(id)) {
    throw new Error("Invalid Panchang response.");
  }
  return { panchangId: id, panchang: raw as PanchangDetail };
}

export async function fetchPanchang(): Promise<PanchangPayload> {
  const { data } = await http.get<PanchangApiBody>(API_ENDPOINTS.panchang);
  return parsePanchangBody(data);
}

export async function fetchPanchangSharePdf(
  predictionId: number
): Promise<Blob> {
  const { data } = await http.post<Blob>(
    API_ENDPOINTS.sharePanchang,
    { prediction_id: predictionId },
    { responseType: "blob" }
  );
  return data;
}
