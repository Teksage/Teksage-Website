"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import {
  FH_TABLE,
  FH_TABLE_STICKY_TH,
  planetaryHighlightClass,
} from "@/lib/constants/horoscope-full-table-ui";
import { FullHoroscopeTableScroll } from "@/components/horoscope/full/FullHoroscopeTableScroll";
import { FullHoroscopeTablePlaceholder } from "@/components/horoscope/full/FullHoroscopeTablePlaceholder";
import { buildPlanetaryRows } from "@/lib/format-planetary-position";
import type { FullHoroscopeSection, PlanetaryPositionPayload } from "@/types";

/** Planetary Positions — Astrosoft Moon/Asc/retro accents. */
export function PlanetsTable({
  section,
}: {
  section: FullHoroscopeSection<PlanetaryPositionPayload>;
}) {
  const rows = buildPlanetaryRows(section.data);
  if (section.isLoading || section.error) {
    return <FullHoroscopeTablePlaceholder section={section} />;
  }
  if (!rows.length) return <FullHoroscopeTablePlaceholder section={section} />;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-sm font-bold text-[var(--color-brand-panchang)]">
        {HOROSCOPE_SCREEN.sectionPlanetaryPositions}
      </p>
      <FullHoroscopeTableScroll>
        <table className={cn(FH_TABLE.table, "min-w-[32rem]")}>
          <thead>
            <tr>
              <th className={FH_TABLE_STICKY_TH}>{HOROSCOPE_SCREEN.colPlanet}</th>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colLongitude}</th>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colRasi}</th>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colNakshatraPada}</th>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colJaiminiKaraka}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const accent = planetaryHighlightClass(r.highlight);
              const rowAccent = r.highlight === "moon" || r.highlight === "asc";
              return (
                <tr key={r.planet} className={FH_TABLE.tr}>
                  <td
                    className={cn(
                      FH_TABLE.td,
                      FH_TABLE.stickyTd,
                      "font-semibold",
                      accent || FH_TABLE.labelCol
                    )}
                  >
                    {r.planet}
                    {r.isRetro ? HOROSCOPE_SCREEN.retroSuffix : ""}
                  </td>
                  <td className={cn(FH_TABLE.td, "whitespace-nowrap", rowAccent && accent)}>
                    {r.longitude}
                  </td>
                  <td className={cn(FH_TABLE.td, rowAccent && accent)}>{r.rasi}</td>
                  <td className={cn(FH_TABLE.td, "whitespace-nowrap", rowAccent && accent)}>
                    {r.nakshatraPada}
                  </td>
                  <td className={cn(FH_TABLE.td, rowAccent && accent)}>
                    {r.jaiminiKaraka}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </FullHoroscopeTableScroll>
    </div>
  );
}
