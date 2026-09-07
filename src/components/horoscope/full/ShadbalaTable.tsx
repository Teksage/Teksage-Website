/**
 * Astrosoft-style Shadbala — tabs: Shadbala | Sthana | Kala | Bhava Bala.
 */
"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN, HOROSCOPE_LAYOUT } from "@/lib/constants";
import { ShadbalaBhavaTable } from "@/components/horoscope/full/ShadbalaBhavaTable";
import { FullHoroscopeTableScroll } from "@/components/horoscope/full/FullHoroscopeTableScroll";
import {
  buildShadbalaRows,
  formatShadbalaCell,
  sortShadbalaRows,
  type ShadbalaSortKey,
} from "@/lib/format-shadbala";
import {
  SHADBALA_KALA_COLS,
  SHADBALA_MAIN_COLS,
  SHADBALA_STHANA_COLS,
} from "@/lib/shadbala-columns";
import type { ShadbalaCol, ShadbalaInnerTab, ShadbalaRow } from "@/lib/shadbala-consts";
import type { FullHoroscopeSection, ShadbalaPayload } from "@/types";

const TH =
  "bg-[var(--color-brand-panchang)] px-1 py-3 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-white sm:px-2 sm:text-xs";
const TD =
  "px-1 py-3 text-center text-[10px] tabular-nums text-[var(--color-brand-black)] sm:px-2 sm:text-xs";
const TR =
  "border-b border-[color-mix(in_srgb,var(--color-brand-primary)_12%,transparent)] last:border-0";
const TABLE =
  "w-full min-w-[36rem] table-fixed border-collapse overflow-hidden rounded-xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white shadow-sm sm:min-w-0";
const PLACEHOLDER = "py-8 text-center text-xs text-black/40";
const CTRL =
  "rounded-md border border-[color-mix(in_srgb,var(--color-brand-primary)_30%,transparent)] bg-white px-2 py-1 text-xs font-semibold text-[var(--color-brand-panchang)]";

const INNER_TABS: { id: ShadbalaInnerTab; label: string }[] = [
  { id: "shadbala", label: HOROSCOPE_SCREEN.shadbalaInnerShadbala },
  { id: "sthana", label: HOROSCOPE_SCREEN.shadbalaInnerSthana },
  { id: "kala", label: HOROSCOPE_SCREEN.shadbalaInnerKala },
  { id: "bhava", label: HOROSCOPE_SCREEN.shadbalaInnerBhava },
];

const SORT_OPTIONS: { key: ShadbalaSortKey; label: string }[] = [
  { key: "planet", label: HOROSCOPE_SCREEN.shadbalaSortPlanet },
  { key: "rank", label: HOROSCOPE_SCREEN.shadbalaSortRank },
  { key: "shadbala", label: HOROSCOPE_SCREEN.shadbalaSortShadbala },
  { key: "sthana", label: HOROSCOPE_SCREEN.shadbalaInnerSthana },
  { key: "kala", label: HOROSCOPE_SCREEN.shadbalaInnerKala },
  { key: "balaPercent", label: HOROSCOPE_SCREEN.shadbalaSortBalaPercent },
];

function toneClass(tone: ShadbalaCol["tone"]): string {
  if (tone === "red") return "font-semibold text-[var(--color-brand-error)]";
  if (tone === "green") return "font-semibold text-[var(--color-brand-primary)]";
  if (tone === "rank") return "font-bold text-[var(--color-brand-ios)]";
  if (tone === "label") {
    return "text-center font-semibold text-[var(--color-brand-panchang)]";
  }
  return "";
}

function PlanetGrid({ rows, cols }: { rows: ShadbalaRow[]; cols: ShadbalaCol[] }) {
  return (
    <table className={TABLE}>
      <thead>
        <tr>
          {cols.map((c) => (
            <th key={String(c.key)} className={TH}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.planet} className={TR}>
            {cols.map((c) => (
              <td key={String(c.key)} className={cn(TD, toneClass(c.tone))}>
                {formatShadbalaCell(r, c.key, c.format ?? "000.00")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ShadbalaTable({
  section,
}: {
  section: FullHoroscopeSection<ShadbalaPayload>;
}) {
  const [innerTab, setInnerTab] = useState<ShadbalaInnerTab>("shadbala");
  const [sortKey, setSortKey] = useState<ShadbalaSortKey>("planet");
  const [ascending, setAscending] = useState(true);
  const rows = useMemo(() => buildShadbalaRows(section.data), [section.data]);
  const sorted = useMemo(
    () => sortShadbalaRows(rows, sortKey, ascending),
    [rows, sortKey, ascending]
  );

  if (section.isLoading) {
    return <p className={PLACEHOLDER}>{HOROSCOPE_SCREEN.loadingLabel}</p>;
  }
  if (section.error || !section.data) {
    return (
      <p className={PLACEHOLDER}>{section.error ?? HOROSCOPE_SCREEN.errorLoadLabel}</p>
    );
  }

  const cols =
    innerTab === "sthana"
      ? SHADBALA_STHANA_COLS
      : innerTab === "kala"
        ? SHADBALA_KALA_COLS
        : SHADBALA_MAIN_COLS;

  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <p className="text-center text-sm font-bold text-[var(--color-brand-panchang)]">
        {HOROSCOPE_SCREEN.sectionShadbalaTitle}
      </p>
      <div className={HOROSCOPE_LAYOUT.toolbarMobile}>
        <div
          role="tablist"
          className={cn(HOROSCOPE_LAYOUT.pillTabList, "w-full sm:min-w-0 sm:flex-1")}
        >
          {INNER_TABS.map((t) => {
            const active = t.id === innerTab;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setInnerTab(t.id)}
                className={cn(
                  HOROSCOPE_LAYOUT.pillTab,
                  active
                    ? HOROSCOPE_LAYOUT.pillTabActive
                    : HOROSCOPE_LAYOUT.pillTabIdle
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        {innerTab !== "bhava" ? (
          <div className="flex w-full flex-wrap items-center justify-center gap-1.5 sm:ml-auto sm:w-auto sm:justify-end">
            <span className="text-xs font-semibold text-[var(--color-brand-panchang)]">
              {HOROSCOPE_SCREEN.shadbalaSortLabel}
            </span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as ShadbalaSortKey)}
              className={cn(CTRL, "font-medium text-[var(--color-brand-black)]")}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setAscending((v) => !v)}
              className={CTRL}
            >
              {ascending
                ? HOROSCOPE_SCREEN.shadbalaSortAsc
                : HOROSCOPE_SCREEN.shadbalaSortDesc}
            </button>
          </div>
        ) : null}
      </div>

      {innerTab === "bhava" ? (
        <FullHoroscopeTableScroll>
          <ShadbalaBhavaTable payload={section.data} />
        </FullHoroscopeTableScroll>
      ) : (
        <FullHoroscopeTableScroll>
          <PlanetGrid rows={sorted} cols={cols} />
        </FullHoroscopeTableScroll>
      )}
    </div>
  );
}
