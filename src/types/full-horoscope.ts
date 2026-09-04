// TypeScript interfaces for the Full Horoscope page — mirrors AstroSoft API shapes.
// Mirrors backend: services/horoscope/extended.py response structures.

// --- Divisional Charts ---
export interface DivisionalChart {
  id: string;
  label: string;
  html: string;
}

// --- Dasa / Bukti / Antra ---
export interface DasaEntry {
  name: string;
  entity: string;
  startDate: string;
  endDate: string;
  isRunning: boolean;
  level: number;
  subDasa: DasaEntry[];
}

export interface DasaPayload {
  dasaInfo: DasaEntry[];
}

// --- Ashtavarga ---
export type SignName =
  | "Mesha" | "Vrishabha" | "Mithuna" | "Kataka"
  | "Simha" | "Kanya" | "Thula" | "Vrichika"
  | "Dhanus" | "Makara" | "Kumbha" | "Meena";

export type SignBindus = Record<SignName, number>;

export interface AshtaVargaPlanet {
  ashtavarga: SignBindus;
  trikonaReduced: SignBindus;
  ekathipathiyaReduced: SignBindus;
  planetPos: number | null;
  rasiGuna: number;
  grahaGuna: number;
}

export type AshtaVargaPayload = Record<string, AshtaVargaPlanet>;

// --- Special Lagna ---
export interface LagnaPoint {
  signNumber: number;
  sign: string;
  degree?: number | string;
}

export interface SpecialLagnaPayload {
  mandi?: LagnaPoint;
  horaLagna?: LagnaPoint;
  dhanaLagna?: LagnaPoint;
  arudhaLagna?: LagnaPoint;
  [key: string]: LagnaPoint | undefined;
}

// --- Shadbala ---
export interface ShadbalaEntry {
  planet: string;
  ishtaPhala?: number;
  kashtaPhala?: number;
  [key: string]: unknown;
}

export type ShadbalaPayload = Record<string, ShadbalaEntry | number | string>;

// --- Bhava Position ---
/** One house row from `/horoscope/bhava-position` (`data.bhava["1"]`…). */
export interface BhavaPositionEntry {
  house?: string;
  start?: number;
  mid?: number;
  end?: number;
  length?: number;
  [key: string]: unknown;
}

/** Raw payload: `{ bhava: { "1": { house, start, mid, end, length }, … } }`. */
export type BhavaPositionPayload = Record<string, unknown>;

// --- Planetary Position ---
/** Normalized planet row used by the UI (after normalizePlanetaryPayload). */
export interface PlanetaryPositionEntry {
  planet: string;
  /** Absolute ecliptic longitude in degrees (Astrosoft Longitude column). */
  position?: number;
  sign?: string;
  signNumber?: number;
  signPosition?: number;
  isRetro?: boolean;
  nakshatraPada?: { nak: string; pada: number };
  /** Jaimini karaka name when provided by API. */
  karaka?: string;
  [key: string]: unknown;
}

/**
 * Raw `/horoscope/planetary-position` payload:
 * `{ Sun: { planetPosition, planetRasi, planetRasiPosition, planetKaraka }, planetNakshathra: {...} }`
 */
export type PlanetaryPositionPayload = Record<string, unknown>;

// --- Aggregate type used by useFullHoroscope ---
export interface FullHoroscopeSection<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}
