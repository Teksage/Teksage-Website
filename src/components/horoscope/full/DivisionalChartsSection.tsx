"use client";

import { useState } from "react";
import { HoroscopeChartFrame } from "@/components/horoscope/HoroscopeChartFrame";
import { ChartsIcon } from "@/components/horoscope/full/FullHoroscopeIcons";
import { HOROSCOPE_SCREEN, HOROSCOPE_LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { DivisionalChart, FullHoroscopeSection } from "@/types";

interface Props {
  section: FullHoroscopeSection<DivisionalChart[]>;
  className?: string;
}

const SIDEBAR_ITEM =
  "w-full cursor-pointer rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors";
const SIDEBAR_ACTIVE =
  "bg-[var(--color-brand-primary)] text-white font-semibold shadow-sm";
const SIDEBAR_IDLE =
  "text-[var(--color-brand-panchang)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)]";

/** Astrosoft-style sidebar: click a chart name on the left to view it on the right. */
export function DivisionalChartsSection({ section, className }: Props) {
  const [selectedId, setSelectedId] = useState<string>("");

  if (section.isLoading) {
    return (
      <p className="py-10 text-center text-sm text-black/50">
        {HOROSCOPE_SCREEN.loadingLabel}
      </p>
    );
  }

  if (section.error || !section.data?.length) {
    return (
      <p className="py-10 text-center text-sm text-red-500">
        {section.error ?? HOROSCOPE_SCREEN.errorLoadLabel}
      </p>
    );
  }

  const charts = section.data;
  const activeId = selectedId || charts[0]?.id || "";
  const activeChart = charts.find((c) => c.id === activeId) ?? charts[0];

  return (
    <div className={cn("flex flex-col gap-3 md:flex-row md:gap-4", className)}>
      {/* ── Mobile: pill chip scroller ── */}
      <div className={cn(HOROSCOPE_LAYOUT.pillTabListScroll, "md:hidden")}>
        {charts.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedId(c.id)}
            className={cn(
              HOROSCOPE_LAYOUT.pillTabScroll,
              c.id === activeId
                ? HOROSCOPE_LAYOUT.pillTabActive
                : HOROSCOPE_LAYOUT.pillTabIdle
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* ── Desktop: sticky left sidebar (mirrors Astrosoft) ── */}
      <aside className="hidden w-44 shrink-0 md:block">
        <div className="scrollbar-hidden sticky top-4 flex max-h-[80vh] flex-col gap-1 overflow-y-auto rounded-2xl border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,transparent)] bg-white p-2 shadow-sm">
          <div className="mb-1 flex items-center gap-1.5 px-2 py-1">
            <ChartsIcon className="size-4 text-[var(--color-brand-panchang)]" />
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--color-brand-panchang)]">
              {HOROSCOPE_SCREEN.tabCharts}
            </span>
          </div>
          {charts.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedId(c.id)}
              className={cn(SIDEBAR_ITEM, c.id === activeId ? SIDEBAR_ACTIVE : SIDEBAR_IDLE)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </aside>

      {/* ── Chart display area (square, full width on mobile) ── */}
      <div className="flex min-w-0 flex-1 flex-col items-center gap-2 px-1 sm:px-0">
        {activeChart && (
          <>
            <p className="text-center text-sm font-bold uppercase tracking-wide text-[var(--color-brand-panchang)]">
              {activeChart.label}
            </p>
            <div className="w-full max-w-[min(100%,22rem)] sm:max-w-xs lg:max-w-[20rem]">
              <HoroscopeChartFrame
                title={activeChart.label}
                html={activeChart.html}
                showTitle={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
