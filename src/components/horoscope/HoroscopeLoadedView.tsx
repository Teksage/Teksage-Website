"use client";

import { useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { HoroscopeChartFrame } from "@/components/horoscope/HoroscopeChartFrame";
import { HoroscopeChartToggle } from "@/components/horoscope/HoroscopeChartToggle";
import { HoroscopeNorthPlaceholder } from "@/components/horoscope/HoroscopeNorthPlaceholder";
import { HoroscopeProfileCard } from "@/components/horoscope/HoroscopeProfileCard";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { Button } from "@/components/ui/button";
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
  onDownloadPdf,
}: HoroscopeLoadedViewProps) {
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const L = HOROSCOPE_LAYOUT;
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    if (!onDownloadPdf || isDownloading) return;
    setIsDownloading(true);
    try {
      await onDownloadPdf();
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className={L.shellRoot}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.horoscopeSplit} />
      <header className={L.heroHeader}>
        <h1 className={L.heroTitle}>{H.headerTitle}</h1>
      </header>

      <div className={cn(L.content, PAGE_SHELL.contentBottomPad)}>
        <HoroscopeProfileCard data={data} />
        {onDownloadPdf && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isDownloading}
            onClick={handleDownload}
            className="w-full max-w-md rounded-full border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,transparent)] lg:max-w-xl"
          >
            {isDownloading ? "Downloading…" : H.downloadPdfCta}
          </Button>
        )}
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
