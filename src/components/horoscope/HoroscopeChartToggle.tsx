import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HOROSCOPE_LAYOUT, HOROSCOPE_SCREEN } from "@/lib/constants";
import type { HoroscopeChartToggleProps, HoroscopeChartVariant } from "@/types";

const VARIANTS = ["south", "north"] as const satisfies readonly HoroscopeChartVariant[];

export function HoroscopeChartToggle({ value, onChange }: HoroscopeChartToggleProps) {
  const H = HOROSCOPE_SCREEN;
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
              "min-h-11 flex-1 rounded-full px-2 text-center text-xs font-semibold leading-tight sm:text-sm",
              active
                ? "bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary)] hover:text-white"
                : "text-black/50 hover:bg-transparent"
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
