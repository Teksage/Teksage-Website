/**
 * Shadbala — 4 tabs; sort filters only on Shadbala + Bhava Bala.
 */
"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN, HOROSCOPE_LAYOUT } from "@/lib/constants";
import { ShadbalaBhavaTable } from "@/components/horoscope/full/ShadbalaBhavaTable";
import { ShadbalaPlanetGrid } from "@/components/horoscope/full/ShadbalaPlanetGrid";
import { FullHoroscopeTableScroll } from "@/components/horoscope/full/FullHoroscopeTableScroll";
import {
  buildShadbalaRows,
  sortShadbalaRows,
  type ShadbalaSortKey,
} from "@/lib/format-shadbala";
import {
  buildBhavaBalaRows,
  sortBhavaBalaRows,
  type BhavaBalaSortKey,
} from "@/lib/format-bhava-bala";
import {
  SHADBALA_KALA_COLS,
  SHADBALA_MAIN_COLS,
  SHADBALA_STHANA_COLS,
} from "@/lib/shadbala-columns";
import type { ShadbalaCol, ShadbalaInnerTab } from "@/lib/shadbala-consts";
import type { FullHoroscopeSection, ShadbalaPayload } from "@/types";

const PLACEHOLDER = "py-8 text-center text-xs text-black/40";

const VIEW_TABS: { id: ShadbalaInnerTab; label: string }[] = [
  { id: "shadbala", label: HOROSCOPE_SCREEN.shadbalaInnerShadbala },
  { id: "sthana", label: HOROSCOPE_SCREEN.shadbalaInnerSthana },
  { id: "kala", label: HOROSCOPE_SCREEN.shadbalaInnerKala },
  { id: "bhava", label: HOROSCOPE_SCREEN.shadbalaInnerBhava },
];

const PLANET_SORT_OPTIONS: { key: ShadbalaSortKey; label: string }[] = [
  { key: "rank", label: HOROSCOPE_SCREEN.shadbalaSortRank },
  { key: "shadbala", label: HOROSCOPE_SCREEN.shadbalaSortShadbala },
  { key: "ishta", label: HOROSCOPE_SCREEN.shadbalaSortIshta },
  { key: "balaPercent", label: HOROSCOPE_SCREEN.shadbalaSortBalaPercent },
];

const BHAVA_SORT_OPTIONS: { key: BhavaBalaSortKey; label: string }[] = [
  { key: "rank", label: HOROSCOPE_SCREEN.shadbalaSortRank },
  { key: "bhavaBala", label: HOROSCOPE_SCREEN.shadbalaSortBhavaBala },
  { key: "rupa", label: HOROSCOPE_SCREEN.shadbalaSortRupa },
  { key: "house", label: HOROSCOPE_SCREEN.shadbalaSortHouse },
];

function colsForTab(tab: ShadbalaInnerTab): ShadbalaCol[] {
  if (tab === "sthana") return SHADBALA_STHANA_COLS;
  if (tab === "kala") return SHADBALA_KALA_COLS;
  return SHADBALA_MAIN_COLS;
}

export function ShadbalaTable({
  section,
}: {
  section: FullHoroscopeSection<ShadbalaPayload>;
}) {
  const [viewTab, setViewTab] = useState<ShadbalaInnerTab>("shadbala");
  const [planetSortKey, setPlanetSortKey] = useState<ShadbalaSortKey>("rank");
  const [bhavaSortKey, setBhavaSortKey] = useState<BhavaBalaSortKey>("rank");
  const [ascending, setAscending] = useState(true);
  const L = HOROSCOPE_LAYOUT;
  const rows = useMemo(() => buildShadbalaRows(section.data), [section.data]);
  const sorted = useMemo(
    () => sortShadbalaRows(rows, planetSortKey, ascending),
    [rows, planetSortKey, ascending]
  );
  const bhavaRows = useMemo(
    () => buildBhavaBalaRows(section.data),
    [section.data]
  );
  const sortedBhava = useMemo(
    () => sortBhavaBalaRows(bhavaRows, bhavaSortKey, ascending),
    [bhavaRows, bhavaSortKey, ascending]
  );
  const showSortFilters = viewTab === "shadbala" || viewTab === "bhava";
  const sortOptions =
    viewTab === "bhava" ? BHAVA_SORT_OPTIONS : PLANET_SORT_OPTIONS;
  const sortSelectId =
    viewTab === "bhava" ? "bhava-bala-sort" : "shadbala-sort";
  const sortValue = viewTab === "bhava" ? bhavaSortKey : planetSortKey;

  if (section.isLoading) {
    return null;
  }
  if (section.error || !section.data) {
    return (
      <p className={PLACEHOLDER}>
        {section.error ?? HOROSCOPE_SCREEN.errorLoadLabel}
      </p>
    );
  }

  return (
    <div className={L.shadbalaRoot}>
      <div className={L.shadbalaStage}>
        <header className={L.shadbalaHeader}>
          <h2 className={L.shadbalaHeaderTitle}>
            {HOROSCOPE_SCREEN.sectionShadbalaTitle}
          </h2>
          <div role="tablist" className={L.shadbalaTabRail}>
            {VIEW_TABS.map((t) => {
              const active = t.id === viewTab;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setViewTab(t.id)}
                  className={cn(
                    L.shadbalaTabBtn,
                    active ? L.shadbalaTabActive : L.shadbalaTabIdle
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </header>

        {showSortFilters ? (
          <div className={L.shadbalaToolbar}>
            <div className={L.shadbalaSortGroup}>
              <label htmlFor={sortSelectId} className={L.shadbalaSortLabel}>
                {HOROSCOPE_SCREEN.shadbalaSortLabel}
              </label>
              <select
                id={sortSelectId}
                value={sortValue}
                onChange={(e) => {
                  if (viewTab === "bhava") {
                    setBhavaSortKey(e.target.value as BhavaBalaSortKey);
                  } else {
                    setPlanetSortKey(e.target.value as ShadbalaSortKey);
                  }
                }}
                className={L.shadbalaSortSelect}
              >
                {sortOptions.map((o) => (
                  <option key={o.key} value={o.key}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => setAscending((v) => !v)}
              className={L.shadbalaOrderBtn}
            >
              {ascending
                ? HOROSCOPE_SCREEN.shadbalaSortAsc
                : HOROSCOPE_SCREEN.shadbalaSortDesc}
            </button>
          </div>
        ) : null}

        <div className={L.shadbalaTableWrap}>
          {viewTab === "bhava" ? (
            <FullHoroscopeTableScroll>
              <ShadbalaBhavaTable rows={sortedBhava} />
            </FullHoroscopeTableScroll>
          ) : (
            <FullHoroscopeTableScroll>
              <ShadbalaPlanetGrid rows={sorted} cols={colsForTab(viewTab)} />
            </FullHoroscopeTableScroll>
          )}
        </div>
      </div>
    </div>
  );
}
