"use client";

import { cn } from "@/lib/utils";
import { HOROSCOPE_SCREEN, HOROSCOPE_LAYOUT } from "@/lib/constants";
import { useI18nConstants } from "@/hooks/useT";
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

export type { FullHoroscopeTab };

export function FullHoroscopeTabs({ active, onChange, className }: FullHoroscopeTabsProps) {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const tabs = [
    { id: "charts", label: H.tabCharts, Icon: ChartsIcon },
    { id: "dasa", label: H.tabDasa, Icon: DasaIcon },
    { id: "ashtavarga", label: H.tabAshtavarga, Icon: AshtavargaIcon },
    { id: "planets", label: H.tabPlanets, Icon: PlanetsIcon },
    { id: "bhava", label: H.tabBhava, Icon: BhavaIcon },
    { id: "shadbala", label: H.tabShadbala, Icon: ShadbalaIcon },
    { id: "lagna", label: H.tabLagna, Icon: SpecialLagnaIcon },
    { id: "ephemeris", label: H.tabEphemeris, Icon: EphemerisIcon },
  ] as const;
  return (
    <div role="tablist" className={cn(HOROSCOPE_LAYOUT.mainTabList, className)}>
      {tabs.map(({ id, label, Icon }) => {
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
