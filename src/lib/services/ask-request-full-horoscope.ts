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
  EphemerisMode,
  EphemerisPayload,
} from "@/types";
import type { AskRequestHoroscopeDetailResponse } from "@/types/astrologer-portal";

function askRequestHoroscopeBase(requestId: string | number): string {
  return `${API_ENDPOINTS.astroAskRequestHoroscope}/${requestId}/horoscope`;
}

export async function fetchAskRequestHoroscopeDetail(
  requestId: string | number
): Promise<AskRequestHoroscopeDetailResponse> {
  const { data } = await http.get<AskRequestHoroscopeDetailResponse>(
    askRequestHoroscopeBase(requestId)
  );
  return data;
}

export async function fetchAskRequestDivisionalCharts(
  requestId: string | number
): Promise<DivisionalChart[]> {
  const { data } = await http.get<{ charts: DivisionalChart[] }>(
    `${askRequestHoroscopeBase(requestId)}/charts`
  );
  return data.charts;
}

export async function fetchAskRequestHoroscopeDasa(
  requestId: string | number
): Promise<DasaPayload> {
  const { data } = await http.get<{ data: DasaPayload }>(
    `${askRequestHoroscopeBase(requestId)}/dasa`
  );
  return data.data;
}

export async function fetchAskRequestHoroscopeAshtaVarga(
  requestId: string | number
): Promise<AshtaVargaPayload> {
  const { data } = await http.get<{ data: AshtaVargaPayload }>(
    `${askRequestHoroscopeBase(requestId)}/ashta-varga`
  );
  return data.data;
}

export async function fetchAskRequestHoroscopeSpecialLagna(
  requestId: string | number
): Promise<SpecialLagnaPayload> {
  const { data } = await http.get<{ data: SpecialLagnaPayload }>(
    `${askRequestHoroscopeBase(requestId)}/special-lagna`
  );
  return data.data;
}

export async function fetchAskRequestHoroscopeShadbala(
  requestId: string | number
): Promise<ShadbalaPayload> {
  const { data } = await http.get<{ data: ShadbalaPayload }>(
    `${askRequestHoroscopeBase(requestId)}/shadbala`
  );
  return data.data;
}

export async function fetchAskRequestHoroscopeBhavaPosition(
  requestId: string | number
): Promise<BhavaPositionPayload> {
  const { data } = await http.get<{ data: BhavaPositionPayload }>(
    `${askRequestHoroscopeBase(requestId)}/bhava-position`
  );
  return data.data;
}

export async function fetchAskRequestHoroscopePlanetaryPosition(
  requestId: string | number
): Promise<PlanetaryPositionPayload> {
  const { data } = await http.get<{ data: PlanetaryPositionPayload }>(
    `${askRequestHoroscopeBase(requestId)}/planetary-position`
  );
  return data.data;
}

export async function fetchAskRequestHoroscopeEphemeris(
  requestId: string | number,
  params: { year: number; month: number; mode: EphemerisMode }
): Promise<EphemerisPayload> {
  const { data } = await http.get<{ data: EphemerisPayload }>(
    `${askRequestHoroscopeBase(requestId)}/ephemeris`,
    {
      params: {
        year: params.year,
        month: params.month,
        mode: params.mode,
      },
    }
  );
  return data.data;
}
