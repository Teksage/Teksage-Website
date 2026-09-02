"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";

export type FullHoroscopeTab = "charts" | "dasa" | "ashtavarga" | "more";

const TABS: { id: FullHoroscopeTab; label: string }[] = [
  { id: "charts", label: HOROSCOPE_SCREEN.tabCharts },
  { id: "dasa", label: HOROSCOPE_SCREEN.tabDasa },
  { id: "ashtavarga", label: HOROSCOPE_SCREEN.tabAshtavarga },
  { id: "more", label: HOROSCOPE_SCREEN.tabMore },
];

interface Props {
  active: FullHoroscopeTab;
  onChange: (tab: FullHoroscopeTab) => void;
  className?: string;
}

export function FullHoroscopeTabs({ active, onChange, className }: Props) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex w-full rounded-[28px] border border-[color-mix(in_srgb,var(--color-brand-primary)_50%,transparent)] bg-white p-1 shadow-sm",
        className
      )}
    >
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          role="tab"
          type="button"
          aria-selected={active === id}
          onClick={() => onChange(id)}
          className={cn(
            "min-h-10 flex-1 rounded-full px-2 text-center text-xs font-semibold leading-tight transition-colors sm:text-sm",
            active === id
              ? "bg-[var(--color-brand-primary)] text-white"
              : "text-black/50 hover:bg-transparent"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
