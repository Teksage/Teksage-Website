/** Shared constants for Astrosoft-style Shadbala tables. */

export const SHADBALA_PLANET_ORDER = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "Rahu",
  "Ketu",
] as const;

export const SHADBALA_RANKED_PLANETS = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
] as const;

/** Astrosoft MinStrength — Bala % = (ShadBala / min) * 100. */
export const SHADBALA_MIN_STRENGTH: Record<string, number> = {
  Sun: 300,
  Moon: 360,
  Mars: 300,
  Mercury: 420,
  Jupiter: 390,
  Venus: 330,
  Saturn: 300,
};

export const ROMAN_RANKS = ["I", "II", "III", "IV", "V", "VI", "VII"] as const;

export type ShadbalaInnerTab = "shadbala" | "sthana" | "kala" | "bhava";

export type ShadbalaSortKey =
  | "rank"
  | "shadbala"
  | "balaPercent"
  | "planet"
  | "ishta"
  | "kashta"
  | "sthana"
  | "kala";

export type ShadbalaTone = "plain" | "red" | "green" | "rank" | "label";

/** Astrosoft DecimalFormat patterns used by ShadBalaView / NumberCellRenderer. */
export type ShadbalaNumFormat = "000.00" | "00.0" | "0.0";

export interface ShadbalaCol {
  key: keyof ShadbalaRow;
  label: string;
  format?: ShadbalaNumFormat;
  tone?: ShadbalaTone;
}

export interface ShadbalaRow {
  planet: string;
  residential: number | null;
  sthana: number | null;
  dig: number | null;
  kala: number | null;
  drik: number | null;
  chesta: number | null;
  naisargika: number | null;
  shadbala: number | null;
  rupa: number | null;
  balaPercent: number | null;
  rank: number | null;
  rankLabel: string;
  ishta: number | null;
  kashta: number | null;
  ochcha: number | null;
  saptavargaja: number | null;
  ojaYugma: number | null;
  kendra: number | null;
  drekkana: number | null;
  abda: number | null;
  masa: number | null;
  vara: number | null;
  hora: number | null;
  paksha: number | null;
  tribhaga: number | null;
  natonnata: number | null;
  ayana: number | null;
  yuddha: number | null;
  partial: boolean;
}
