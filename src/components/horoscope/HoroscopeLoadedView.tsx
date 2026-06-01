"use client";

import { useI18nConstants } from "@/hooks/useT";
import { HoroscopeChartFrame } from "@/components/horoscope/HoroscopeChartFrame";
import { HoroscopeChartToggle } from "@/components/horoscope/HoroscopeChartToggle";
import { HoroscopeNorthPlaceholder } from "@/components/horoscope/HoroscopeNorthPlaceholder";
import { HoroscopeProfileCard } from "@/components/horoscope/HoroscopeProfileCard";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import {
  HOROSCOPE_LAYOUT,
  HOROSCOPE_SCREEN,
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { HoroscopeLoadedViewProps } from "@/types";

/** Authenticated horoscope — mirrors Flutter `horoscopePage.dart`. */
export function HoroscopeLoadedView({
  data,
  chartVariant,
  onChartVariantChange,
}: HoroscopeLoadedViewProps) {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const L = HOROSCOPE_LAYOUT;

  return (
    <div className={L.shellRoot}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.horoscopeSplit} />
      <header className={L.heroHeader}>
        <h1 className={L.heroTitle}>{H.headerTitle}</h1>
      </header>

      <div className={cn(L.content, PAGE_SHELL.contentBottomPad)}>
        <HoroscopeProfileCard data={data} />
        <HoroscopeChartToggle value={chartVariant} onChange={onChartVariantChange} />
        <div className={L.chartStack}>
          {chartVariant === "south" ? (
            <>
              <HoroscopeChartFrame
                title={data.rasi_chart_label ?? H.chartFallbackRasi}
                html={data.rashi_chart ?? ""}
                showTitle={false}
                className={L.chartFrame}
              />
              <HoroscopeChartFrame
                title={data.navamsa_chart_label ?? H.chartFallbackNavamsa}
                html={data.navamsa_chart ?? ""}
                showTitle={false}
                className={L.chartFrame}
              />
            </>
          ) : (
            <div className={L.northComingSoonWrap}>
              <HoroscopeNorthPlaceholder />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
