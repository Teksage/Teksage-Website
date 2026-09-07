import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { EphemerisMode, EphemerisPayload } from "@/types";

export async function fetchHoroscopeEphemeris(params: {
  year: number;
  month: number;
  mode: EphemerisMode;
}): Promise<EphemerisPayload> {
  const { data } = await http.get<{ data: EphemerisPayload }>(
    API_ENDPOINTS.horoscopeEphemeris,
    { params }
  );
  return data.data;
}
