"use client";

import { HoroscopeChartFrame } from "@/components/horoscope/HoroscopeChartFrame";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { DivisionalChart, FullHoroscopeSection } from "@/types";

interface Props {
  section: FullHoroscopeSection<DivisionalChart[]>;
  className?: string;
}

/** Renders all D1–D60 divisional charts in a 2-column grid. */
export function DivisionalChartsSection({ section, className }: Props) {
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

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2",
        className
      )}
    >
      {section.data.map((chart) => (
        <div key={chart.id} className="flex flex-col gap-1">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-panchang)]">
            {chart.label}
          </p>
          <HoroscopeChartFrame
            title={chart.label}
            html={chart.html}
            showTitle={false}
          />
        </div>
      ))}
    </div>
  );
}
