/** Format Astrosoft ephemeris title / month picker labels. */

import type { EphemerisMode, EphemerisPayload } from "@/types";

export function ephemerisTitle(
  payload: EphemerisPayload | null,
  copy: { fallback: string; prefix: string; at: string }
): string {
  if (!payload) return copy.fallback;
  return `${copy.prefix} ${payload.place} ${copy.at} ${payload.timeLabel}`;
}

export function ephemerisMonthLabel(
  month: number,
  year: number,
  monthNames: readonly string[]
): string {
  const name = monthNames[month - 1] ?? String(month);
  return `${name} ${year}`;
}

export function ephemerisFirstColLabel(
  mode: EphemerisMode,
  labels: { month: string; date: string }
): string {
  return mode === "monthly" ? labels.month : labels.date;
}
