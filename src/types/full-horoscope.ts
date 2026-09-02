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
export interface BhavaPositionEntry {
  bhava?: number;
  sign?: string;
  degree?: number;
  [key: string]: unknown;
}

export type BhavaPositionPayload = Record<string, BhavaPositionEntry | unknown>;

// --- Planetary Position ---
export interface PlanetaryPositionEntry {
  planet: string;
  sign?: string;
  signNumber?: number;
  signPosition?: number;
  isRetro?: boolean;
  nakshatraPada?: { nak: string; pada: number };
  [key: string]: unknown;
}

export type PlanetaryPositionPayload = Record<string, PlanetaryPositionEntry>;

// --- Aggregate type used by useFullHoroscope ---
export interface FullHoroscopeSection<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}
