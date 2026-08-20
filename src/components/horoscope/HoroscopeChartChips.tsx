"use client";

import { Button } from "@/components/ui/button";
import { HOROSCOPE_CHARTS_UI, HOROSCOPE_LAYOUT } from "@/lib/constants";
import type { HoroscopeChartChipsProps } from "@/types";

export function HoroscopeChartChips({
  charts,
  selectedId,
  onSelect,
}: HoroscopeChartChipsProps) {
  const index = Math.max(
    0,
    charts.findIndex((chart) => chart.id === selectedId)
  );
  const current = charts[index];
  if (!current) return null;

  function go(delta: number) {
    const next = (index + delta + charts.length) % charts.length;
    onSelect(charts[next].id);
  }

  return (
    <div className={HOROSCOPE_LAYOUT.chartPicker}>
      <div className={HOROSCOPE_LAYOUT.chartNav}>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={HOROSCOPE_LAYOUT.chartNavBtn}
          aria-label={HOROSCOPE_CHARTS_UI.prevChartAria}
          onClick={() => go(-1)}
        >
          {HOROSCOPE_CHARTS_UI.prevGlyph}
        </Button>
        <select
          className={HOROSCOPE_LAYOUT.chartSelect}
          aria-label={HOROSCOPE_CHARTS_UI.listAria}
          value={current.id}
          onChange={(event) => onSelect(event.target.value)}
        >
          {charts.map((chart) => (
            <option key={chart.id} value={chart.id}>
              {chart.label}
            </option>
          ))}
        </select>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={HOROSCOPE_LAYOUT.chartNavBtn}
          aria-label={HOROSCOPE_CHARTS_UI.nextChartAria}
          onClick={() => go(1)}
        >
          {HOROSCOPE_CHARTS_UI.nextGlyph}
        </Button>
      </div>
    </div>
  );
}
