"use client";

import { useEffect, useState } from "react";
import { HoroscopeChartChips } from "@/components/horoscope/HoroscopeChartChips";
import { HoroscopeChartFrame } from "@/components/horoscope/HoroscopeChartFrame";
import { useHoroscopeCharts } from "@/hooks/useHoroscopeCharts";
import { HOROSCOPE_CHARTS_UI, HOROSCOPE_LAYOUT } from "@/lib/constants";
import type { HoroscopeSouthChartsProps } from "@/types";

export function HoroscopeSouthCharts({ data }: HoroscopeSouthChartsProps) {
  const { charts, isLoading } = useHoroscopeCharts(data);
  const [selectedId, setSelectedId] = useState("d1");

  useEffect(() => {
    if (charts.length === 0) return;
    if (!charts.some((c) => c.id === selectedId)) {
      setSelectedId(charts[0].id);
    }
  }, [charts, selectedId]);

  const primary = charts.find((c) => c.id === selectedId) ?? charts[0];
  if (!primary) return null;

  return (
    <div className={HOROSCOPE_LAYOUT.southCharts}>
      {isLoading ? (
        <p className={HOROSCOPE_LAYOUT.chartsLoading}>
          {HOROSCOPE_CHARTS_UI.loadingCharts}
        </p>
      ) : null}
      <div className={HOROSCOPE_LAYOUT.chartStack}>
        <HoroscopeChartChips
          charts={charts}
          selectedId={primary.id}
          onSelect={setSelectedId}
        />
        <HoroscopeChartFrame
          title={primary.label}
          html={primary.html}
          showTitle={false}
          className={HOROSCOPE_LAYOUT.chartFrame}
        />
      </div>
    </div>
  );
}
