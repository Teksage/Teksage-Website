/** Format Astrosoft ephemeris title / month picker labels. */

import { HOROSCOPE_SCREEN } from "@/lib/constants";
import type { EphemerisMode, EphemerisPayload } from "@/types";

export function ephemerisTitle(payload: EphemerisPayload | null): string {
  if (!payload) return HOROSCOPE_SCREEN.tabEphemeris;
  return `${HOROSCOPE_SCREEN.ephemerisTitlePrefix} ${payload.place} ${HOROSCOPE_SCREEN.ephemerisTitleAt} ${payload.timeLabel}`;
}

export function ephemerisMonthLabel(month: number, year: number): string {
  const name = HOROSCOPE_SCREEN.ephemerisMonths[month - 1] ?? String(month);
  return `${name} ${year}`;
}

export function ephemerisFirstColLabel(mode: EphemerisMode): string {
  return mode === "monthly"
    ? HOROSCOPE_SCREEN.ephemerisColMonth
    : HOROSCOPE_SCREEN.ephemerisColDate;
}
