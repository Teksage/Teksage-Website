"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import {
  ChartsIcon,
  DasaIcon,
  AshtavargaIcon,
  MoreDotsIcon,
} from "@/components/horoscope/full/FullHoroscopeIcons";
import type { ComponentType } from "react";

export type FullHoroscopeTab = "charts" | "dasa" | "ashtavarga" | "more";

const TABS: { id: FullHoroscopeTab; label: string; Icon: ComponentType<{ className?: string }> }[] = [
  { id: "charts",     label: HOROSCOPE_SCREEN.tabCharts,     Icon: ChartsIcon },
  { id: "dasa",       label: HOROSCOPE_SCREEN.tabDasa,       Icon: DasaIcon },
  { id: "ashtavarga", label: HOROSCOPE_SCREEN.tabAshtavarga, Icon: AshtavargaIcon },
  { id: "more",       label: HOROSCOPE_SCREEN.tabMore,       Icon: MoreDotsIcon },
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
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={cn(
              "flex min-h-10 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-1 py-1.5 text-center transition-colors",
              isActive
                ? "bg-[var(--color-brand-primary)] text-white"
                : "text-black/50 hover:bg-transparent"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="text-[10px] font-semibold leading-tight sm:text-xs">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
