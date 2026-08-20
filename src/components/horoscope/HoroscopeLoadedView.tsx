"use client";

import { useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { HoroscopeChartToggle } from "@/components/horoscope/HoroscopeChartToggle";
import { HoroscopeNorthPlaceholder } from "@/components/horoscope/HoroscopeNorthPlaceholder";
import { HoroscopeProfileCard } from "@/components/horoscope/HoroscopeProfileCard";
import { HoroscopeSouthCharts } from "@/components/horoscope/HoroscopeSouthCharts";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { Button } from "@/components/ui/button";
import {
  HOROSCOPE_ASSETS,
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
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.horoscopeMint} />
      <header className={L.heroHeader}>
        <div className={L.heroBar}>
          <h1 className={L.heroTitle}>{H.headerTitle}</h1>
        </div>
      </header>

      <div className={cn(L.content, PAGE_SHELL.contentBottomPad)}>
        <HoroscopeProfileCard data={data} />
        {onDownloadPdf ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isDownloading}
            onClick={handleDownload}
            className={L.downloadBtn}
          >
            <Image
              src={HOROSCOPE_ASSETS.download}
              alt=""
              width={16}
              height={16}
              unoptimized
              className={L.downloadIcon}
            />
            {isDownloading ? H.downloadBusyCta : H.downloadPdfCta}
          </Button>
        ) : null}
        <HoroscopeChartToggle value={chartVariant} onChange={onChartVariantChange} />
        {chartVariant === "south" ? (
          <HoroscopeSouthCharts data={data} />
        ) : (
          <div className={L.northComingSoonWrap}>
            <HoroscopeNorthPlaceholder />
          </div>
        )}
      </div>
    </div>
  );
}
