import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { HoroscopeChartsPayload, HoroscopePayload } from "@/types";

export async function fetchHoroscope(): Promise<HoroscopePayload> {
  const { data } = await http.get<HoroscopePayload>(API_ENDPOINTS.horoscope);
  return data;
}

export async function fetchHoroscopeCharts(): Promise<HoroscopeChartsPayload> {
  const { data } = await http.get<HoroscopeChartsPayload>(
    API_ENDPOINTS.horoscopeCharts,
    { timeout: 90_000 }
  );
  return data;
}

export async function fetchHoroscopePdf(): Promise<Blob> {
  const { data } = await http.get<Blob>(API_ENDPOINTS.horoscopeDownload, {
    responseType: "blob",
  });
  return data;
}
