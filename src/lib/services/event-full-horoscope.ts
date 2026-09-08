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

function eventHoroscopeBase(eventId: string | number): string {
  return `${API_ENDPOINTS.astroEventHoroscope}/${eventId}/horoscope`;
}

export async function fetchEventDivisionalCharts(
  eventId: string | number
): Promise<DivisionalChart[]> {
  const { data } = await http.get<{ charts: DivisionalChart[] }>(
    `${eventHoroscopeBase(eventId)}/charts`
  );
  return data.charts;
}

export async function fetchEventHoroscopeDasa(
  eventId: string | number
): Promise<DasaPayload> {
  const { data } = await http.get<{ data: DasaPayload }>(
    `${eventHoroscopeBase(eventId)}/dasa`
  );
  return data.data;
}

export async function fetchEventHoroscopeAshtaVarga(
  eventId: string | number
): Promise<AshtaVargaPayload> {
  const { data } = await http.get<{ data: AshtaVargaPayload }>(
    `${eventHoroscopeBase(eventId)}/ashta-varga`
  );
  return data.data;
}

export async function fetchEventHoroscopeSpecialLagna(
  eventId: string | number
): Promise<SpecialLagnaPayload> {
  const { data } = await http.get<{ data: SpecialLagnaPayload }>(
    `${eventHoroscopeBase(eventId)}/special-lagna`
  );
  return data.data;
}

export async function fetchEventHoroscopeShadbala(
  eventId: string | number
): Promise<ShadbalaPayload> {
  const { data } = await http.get<{ data: ShadbalaPayload }>(
    `${eventHoroscopeBase(eventId)}/shadbala`
  );
  return data.data;
}

export async function fetchEventHoroscopeBhavaPosition(
  eventId: string | number
): Promise<BhavaPositionPayload> {
  const { data } = await http.get<{ data: BhavaPositionPayload }>(
    `${eventHoroscopeBase(eventId)}/bhava-position`
  );
  return data.data;
}

export async function fetchEventHoroscopePlanetaryPosition(
  eventId: string | number
): Promise<PlanetaryPositionPayload> {
  const { data } = await http.get<{ data: PlanetaryPositionPayload }>(
    `${eventHoroscopeBase(eventId)}/planetary-position`
  );
  return data.data;
}

export async function fetchEventHoroscopeEphemeris(
  eventId: string | number,
  params: { year: number; month: number; mode: EphemerisMode }
): Promise<EphemerisPayload> {
  const { data } = await http.get<{ data: EphemerisPayload }>(
    `${eventHoroscopeBase(eventId)}/ephemeris`,
    { params }
  );
  return data.data;
}
