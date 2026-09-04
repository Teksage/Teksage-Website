/** Shared layout helpers for Astrosoft-style Ashtavarga bindu charts. */

import type { SignBindus, SignName } from "@/types";

/** South-Indian box order used by astrochart/ashtaVargaTable.js */
export const ASHTA_BOX_SIGNS: SignName[] = [
  "Meena",
  "Mesha",
  "Vrishabha",
  "Mithuna",
  "Kumbha",
  "Kataka",
  "Makara",
  "Simha",
  "Dhanus",
  "Vrichika",
  "Thula",
  "Kanya",
];

/**
 * Maps planetPos (1–12, Mesha=1) → CSS grid cell index (1–13, center=6).
 * Mirrors astrochart `positionArray`.
 */
export const ASHTA_SIGN_TO_CELL = [2, 3, 4, 7, 9, 13, 12, 11, 10, 8, 5, 1] as const;

export const ASHTA_PLANET_TAB_ORDER = [
  "Sun",
  "Moon",
  "Mars",
  "Mercury",
  "Jupiter",
  "Venus",
  "Saturn",
  "SarvaAshtavarga",
] as const;

export function sumBindus(bindus: SignBindus | undefined): number {
  if (!bindus) return 0;
  return ASHTA_BOX_SIGNS.reduce((acc, s) => acc + (bindus[s] ?? 0), 0);
}

export function highlightedCell(planetPos: number | null | undefined): number | null {
  if (typeof planetPos !== "number" || planetPos < 1 || planetPos > 12) return null;
  return ASHTA_SIGN_TO_CELL[planetPos - 1] ?? null;
}
