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

/** Professional workspace: chart rail + large canvas viewer. */
export function DivisionalChartsSection({ section, className }: Props) {
  const [selectedId, setSelectedId] = useState<string>("");
  const L = HOROSCOPE_LAYOUT;

  if (section.isLoading) {
    return null;
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
    <div className={cn(L.chartsRoot, className)}>
      <div className={cn(L.pillTabListScroll, "md:hidden")}>
        {charts.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedId(c.id)}
            className={cn(
              L.pillTabScroll,
              c.id === activeId ? L.pillTabActive : L.pillTabIdle
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className={L.chartsStage}>
        <aside className={L.chartsSidebar} aria-label={HOROSCOPE_SCREEN.tabCharts}>
          <div className={L.chartsSidebarHeader}>
            <ChartsIcon className="size-3.5 text-[var(--color-brand-panchang)]" />
            <span className={L.chartsSidebarTitle}>{HOROSCOPE_SCREEN.tabCharts}</span>
          </div>
          <div className={L.chartsSidebarList}>
            {charts.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className={cn(
                  L.chartsSidebarItem,
                  c.id === activeId ? L.chartsSidebarActive : L.chartsSidebarIdle
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </aside>

        <div className={L.chartsDisplay}>
          {activeChart ? (
            <>
              <header className={L.chartsDisplayHeader}>
                <div className="min-w-0">
                  <p className={L.chartsDisplayEyebrow}>
                    {HOROSCOPE_SCREEN.chartsViewerEyebrow}
                  </p>
                  <h2 className={L.chartsDisplayTitle}>{activeChart.label}</h2>
                </div>
              </header>
              <div className={L.chartsCanvas}>
                <div className={L.chartsFrameWrap}>
                  <HoroscopeChartFrame
                    title={activeChart.label}
                    html={activeChart.html}
                    showTitle={false}
                    frameClassName={L.chartsFrame}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
