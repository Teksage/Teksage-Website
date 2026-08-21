"use client";

import { useI18nConstants } from "@/hooks/useT";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HOROSCOPE_LAYOUT, HOROSCOPE_SCREEN } from "@/lib/constants";
import type { HoroscopeChartToggleProps, HoroscopeChartVariant } from "@/types";

const VARIANTS = ["south", "north"] as const satisfies readonly HoroscopeChartVariant[];

export function HoroscopeChartToggle({ value, onChange }: HoroscopeChartToggleProps) {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const labels: Record<HoroscopeChartVariant, string> = {
    south: H.chartSouthTab,
    north: H.chartNorthTab,
  };

  return (
    <div className={HOROSCOPE_LAYOUT.chartToggle}>
      {VARIANTS.map((v) => {
        const active = value === v;
        return (
          <Button
            key={v}
            type="button"
            variant="ghost"
            size="sm"
            className={cn(
              HOROSCOPE_LAYOUT.chartToggleBtn,
              active
                ? HOROSCOPE_LAYOUT.chartToggleBtnActive
                : HOROSCOPE_LAYOUT.chartToggleBtnIdle
            )}
            onClick={() => onChange(v)}
          >
            {labels[v]}
          </Button>
        );
      })}
    </div>
  );
}
