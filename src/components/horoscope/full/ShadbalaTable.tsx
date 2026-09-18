/**
 * Shadbala — 4 tabs; sort filters only on Shadbala + Bhava Bala.
 */
"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN, HOROSCOPE_LAYOUT } from "@/lib/constants";
import { useI18nConstants, useT } from "@/hooks/useT";
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
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const { t } = useT();
  const viewTabs = [
    { id: "shadbala", label: H.shadbalaInnerShadbala },
    { id: "sthana", label: H.shadbalaInnerSthana },
    { id: "kala", label: H.shadbalaInnerKala },
    { id: "bhava", label: H.shadbalaInnerBhava },
  ] as const;
  const planetSortOptions = [
    { key: "rank", label: H.shadbalaSortRank },
    { key: "shadbala", label: H.shadbalaSortShadbala },
    { key: "ishta", label: H.shadbalaSortIshta },
    { key: "balaPercent", label: H.shadbalaSortBalaPercent },
  ] as const;
  const bhavaSortOptions = [
    { key: "rank", label: H.shadbalaSortRank },
    { key: "bhavaBala", label: H.shadbalaSortBhavaBala },
    { key: "rupa", label: H.shadbalaSortRupa },
    { key: "house", label: H.shadbalaSortHouse },
  ] as const;
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
    viewTab === "bhava" ? bhavaSortOptions : planetSortOptions;
  const sortSelectId =
    viewTab === "bhava" ? "bhava-bala-sort" : "shadbala-sort";
  const sortValue = viewTab === "bhava" ? bhavaSortKey : planetSortKey;

  if (section.isLoading) {
    return null;
  }
  if (section.error || !section.data) {
    return (
      <p className={PLACEHOLDER}>
        {H.errorLoadLabel}
      </p>
    );
  }

  return (
    <div className={L.shadbalaRoot}>
      <div className={L.shadbalaStage}>
        <header className={L.shadbalaHeader}>
          <h2 className={L.shadbalaHeaderTitle}>
            {H.sectionShadbalaTitle}
          </h2>
          <div role="tablist" className={L.shadbalaTabRail}>
            {viewTabs.map((tab) => {
              const active = tab.id === viewTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setViewTab(tab.id)}
                  className={cn(
                    L.shadbalaTabBtn,
                    active ? L.shadbalaTabActive : L.shadbalaTabIdle
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>

        {showSortFilters ? (
          <div className={L.shadbalaToolbar}>
            <div className={L.shadbalaSortGroup}>
              <label htmlFor={sortSelectId} className={L.shadbalaSortLabel}>
                {H.shadbalaSortLabel}
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
                ? H.shadbalaSortAsc
                : H.shadbalaSortDesc}
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
              <ShadbalaPlanetGrid
                rows={sorted}
                cols={colsForTab(viewTab).map((col) => ({ ...col, label: t(col.label) }))}
              />
            </FullHoroscopeTableScroll>
          )}
        </div>
      </div>
    </div>
  );
}
