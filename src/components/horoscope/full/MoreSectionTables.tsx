/**
 * Bhava / Special Lagna tables for Full Horoscope.
 */
"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import {
  FH_TABLE,
  FH_TABLE_STICKY_TH,
} from "@/lib/constants/horoscope-full-table-ui";
import { FullHoroscopeTableScroll } from "@/components/horoscope/full/FullHoroscopeTableScroll";
import { FullHoroscopeTablePlaceholder } from "@/components/horoscope/full/FullHoroscopeTablePlaceholder";
import { buildBhavaRows } from "@/lib/format-bhava-position";
import { formatSpecialLagnaLabel } from "@/lib/format-special-lagna-label";
import type {
  SpecialLagnaPayload,
  BhavaPositionPayload,
  FullHoroscopeSection,
} from "@/types";

/** Bhava Positions — Astrosoft columns. */
export function BhavaTable({
  section,
}: {
  section: FullHoroscopeSection<BhavaPositionPayload>;
}) {
  const rows = buildBhavaRows(section.data);
  if (section.isLoading || section.error) {
    return <FullHoroscopeTablePlaceholder section={section} />;
  }
  if (!rows.length) return <FullHoroscopeTablePlaceholder section={section} />;

  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-sm font-bold text-[var(--color-brand-panchang)]">
        {HOROSCOPE_SCREEN.sectionBhavaPositions}
      </p>
      <FullHoroscopeTableScroll>
        <table className={cn(FH_TABLE.table, "min-w-[28rem]")}>
          <thead>
            <tr>
              <th className={FH_TABLE_STICKY_TH}>{HOROSCOPE_SCREEN.colHouse}</th>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colBhava}</th>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colStart}</th>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colMid}</th>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colEnd}</th>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colLength}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.house} className={FH_TABLE.tr}>
                <td className={cn(FH_TABLE.td, FH_TABLE.stickyTd, FH_TABLE.labelCol)}>
                  {r.house}
                </td>
                <td className={FH_TABLE.td}>{r.bhava}</td>
                <td className={cn(FH_TABLE.td, "whitespace-nowrap")}>{r.start}</td>
                <td className={cn(FH_TABLE.td, "whitespace-nowrap")}>{r.mid}</td>
                <td className={cn(FH_TABLE.td, "whitespace-nowrap")}>{r.end}</td>
                <td className={cn(FH_TABLE.td, "whitespace-nowrap")}>{r.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FullHoroscopeTableScroll>
    </div>
  );
}

/** Special Lagna table. */
export function SpecialLagnaTable({
  section,
}: {
  section: FullHoroscopeSection<SpecialLagnaPayload>;
}) {
  const d = section.data;
  const rows = d
    ? Object.entries(d).map(([k, v]) => ({
        key: k,
        label: formatSpecialLagnaLabel(k),
        sign: (v as { sign?: string })?.sign ?? "—",
        degree: (v as { degree?: number | string })?.degree ?? "",
      }))
    : [];
  if (!rows.length) return <FullHoroscopeTablePlaceholder section={section} />;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-center text-sm font-bold text-[var(--color-brand-panchang)]">
        {HOROSCOPE_SCREEN.sectionSpecialLagna}
      </p>
      <FullHoroscopeTableScroll>
        <table className={FH_TABLE.table}>
          <thead>
            <tr>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colLagna}</th>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colSign}</th>
              <th className={FH_TABLE.th}>{HOROSCOPE_SCREEN.colDegree}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className={FH_TABLE.tr}>
                <td className={cn(FH_TABLE.td, FH_TABLE.labelCol)}>{r.label}</td>
                <td className={FH_TABLE.td}>{r.sign}</td>
                <td className={FH_TABLE.td}>{r.degree ? `${r.degree}°` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FullHoroscopeTableScroll>
    </div>
  );
}

export { PlanetsTable } from "@/components/horoscope/full/PlanetsTable";
