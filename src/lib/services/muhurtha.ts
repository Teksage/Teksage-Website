import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { MuhurthaPayload, MuhurthaResult, MuhurthaSearchParams } from "@/types/muhurtha";

interface MuhurthaApiBody {
  data?: unknown;
  muhurtha_id?: number;
}

function parseMuhurthaBody(body: MuhurthaApiBody): MuhurthaPayload {
  const raw = body?.data;
  if (raw == null || typeof raw !== "object" || Array.isArray(raw)) {
    const msg = typeof raw === "string" ? raw : "Unable to load Muhurtha.";
    throw new Error(msg);
  }
  const id = Number(body.muhurtha_id);
  return {
    muhurthaId: Number.isFinite(id) ? id : 0,
    result: raw as MuhurthaResult,
  };
}

export async function fetchMuhurtha(
  params: MuhurthaSearchParams
): Promise<MuhurthaPayload> {
  const { data } = await http.get<MuhurthaApiBody>(API_ENDPOINTS.muhurtha, {
    params: {
      event: params.event,
      start_date: params.startDate,
      location: params.location,
    },
  });
  return parseMuhurthaBody(data);
}
