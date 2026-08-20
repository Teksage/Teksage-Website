import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { HoroscopePayload } from "@/types";

export async function fetchHoroscope(): Promise<HoroscopePayload> {
  const { data } = await http.get<HoroscopePayload>(API_ENDPOINTS.horoscope);
  return data;
}

export async function fetchHoroscopePdf(): Promise<Blob> {
  const { data } = await http.get<Blob>(API_ENDPOINTS.horoscopeDownload, {
    responseType: "blob",
  });
  return data;
}
