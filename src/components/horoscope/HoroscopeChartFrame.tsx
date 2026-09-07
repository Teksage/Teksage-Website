"use client";

import { useEffect, useRef } from "react";
import { HOROSCOPE_LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buildHoroscopeChartSrcDoc } from "@/lib/horoscope-chart-srcdoc";
import type { HoroscopeChartFrameProps } from "@/types";

/** Renders backend HTML/SVG chart in an isolated square frame. */
export function HoroscopeChartFrame({
  title,
  html,
  className,
  showTitle,
}: HoroscopeChartFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const el = iframeRef.current;
    if (!el) return;
    el.style.height = "100%";
    el.style.width = "100%";
  }, [html]);

  if (!html?.trim()) return null;
  const srcDoc = buildHoroscopeChartSrcDoc(html);

  return (
    <div className={cn("flex w-full flex-col items-center", className)}>
      {showTitle !== false && title?.trim() ? (
        <p className={HOROSCOPE_LAYOUT.chartTitle}>{title}</p>
      ) : null}
      <div className={cn(HOROSCOPE_LAYOUT.chartShell, HOROSCOPE_LAYOUT.chartFrame)}>
        <iframe
          ref={iframeRef}
          title={title}
          className={HOROSCOPE_LAYOUT.chartIframe}
          sandbox="allow-scripts allow-same-origin"
          srcDoc={srcDoc}
        />
      </div>
    </div>
  );
}
