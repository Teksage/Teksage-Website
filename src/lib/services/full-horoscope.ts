import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  DivisionalChart,
  DasaPayload,
  AshtaVargaPayload,
  SpecialLagnaPayload,
  ShadbalaPayload,
  BhavaPositionPayload,
  PlanetaryPositionPayload,
} from "@/types";

export async function fetchDivisionalCharts(): Promise<DivisionalChart[]> {
  const { data } = await http.get<{ charts: DivisionalChart[] }>(
    API_ENDPOINTS.horoscopeCharts
  );
  return data.charts;
}

export async function fetchHoroscopeDasa(): Promise<DasaPayload> {
  const { data } = await http.get<{ data: DasaPayload }>(
    API_ENDPOINTS.horoscopeDasa
  );
  return data.data;
}

export async function fetchHoroscopeAshtaVarga(): Promise<AshtaVargaPayload> {
  const { data } = await http.get<{ data: AshtaVargaPayload }>(
    API_ENDPOINTS.horoscopeAshtaVarga
  );
  return data.data;
}

export async function fetchHoroscopeSpecialLagna(): Promise<SpecialLagnaPayload> {
  const { data } = await http.get<{ data: SpecialLagnaPayload }>(
    API_ENDPOINTS.horoscopeSpecialLagna
  );
  return data.data;
}

export async function fetchHoroscopeShadbala(): Promise<ShadbalaPayload> {
  const { data } = await http.get<{ data: ShadbalaPayload }>(
    API_ENDPOINTS.horoscopeShadbala
  );
  return data.data;
}

export async function fetchHoroscopeBhavaPosition(): Promise<BhavaPositionPayload> {
  const { data } = await http.get<{ data: BhavaPositionPayload }>(
    API_ENDPOINTS.horoscopeBhavaPosition
  );
  return data.data;
}

export async function fetchHoroscopePlanetaryPosition(): Promise<PlanetaryPositionPayload> {
  const { data } = await http.get<{ data: PlanetaryPositionPayload }>(
    API_ENDPOINTS.horoscopePlanetaryPosition
  );
  return data.data;
}
