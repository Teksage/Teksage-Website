"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN, HOROSCOPE_LAYOUT } from "@/lib/constants";
import {
  ChartsIcon,
  DasaIcon,
  AshtavargaIcon,
  PlanetsIcon,
  BhavaIcon,
  ShadbalaIcon,
  SpecialLagnaIcon,
  EphemerisIcon,
} from "@/components/horoscope/full/FullHoroscopeIcons";
import type { FullHoroscopeTab, FullHoroscopeTabsProps } from "@/types";
import type { ComponentType } from "react";

export type { FullHoroscopeTab };

const TABS: { id: FullHoroscopeTab; label: string; Icon: ComponentType<{ className?: string }> }[] = [
  { id: "charts", label: HOROSCOPE_SCREEN.tabCharts, Icon: ChartsIcon },
  { id: "dasa", label: HOROSCOPE_SCREEN.tabDasa, Icon: DasaIcon },
  { id: "ashtavarga", label: HOROSCOPE_SCREEN.tabAshtavarga, Icon: AshtavargaIcon },
  { id: "planets", label: HOROSCOPE_SCREEN.tabPlanets, Icon: PlanetsIcon },
  { id: "bhava", label: HOROSCOPE_SCREEN.tabBhava, Icon: BhavaIcon },
  { id: "shadbala", label: HOROSCOPE_SCREEN.tabShadbala, Icon: ShadbalaIcon },
  { id: "lagna", label: HOROSCOPE_SCREEN.tabLagna, Icon: SpecialLagnaIcon },
  { id: "ephemeris", label: HOROSCOPE_SCREEN.tabEphemeris, Icon: EphemerisIcon },
];

export function FullHoroscopeTabs({ active, onChange, className }: FullHoroscopeTabsProps) {
  return (
    <div role="tablist" className={cn(HOROSCOPE_LAYOUT.mainTabList, className)}>
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
              HOROSCOPE_LAYOUT.mainTab,
              isActive
                ? HOROSCOPE_LAYOUT.mainTabActive
                : HOROSCOPE_LAYOUT.mainTabIdle
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className={HOROSCOPE_LAYOUT.mainTabLabel}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
