"use client";

import { useEffect, useRef, useState } from "react";
import { HOROSCOPE_CHART_FRAME, HOROSCOPE_LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buildHoroscopeChartSrcDoc } from "@/lib/horoscope-chart-srcdoc";
import type { HoroscopeChartFrameProps } from "@/types";

/** Renders backend HTML/SVG chart in an isolated frame (mirrors Flutter `ChartWidget` + WebView). */
export function HoroscopeChartFrame({
  title,
  html,
  className,
  showTitle,
}: HoroscopeChartFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [frameHeight, setFrameHeight] = useState<number>(
    HOROSCOPE_CHART_FRAME.fallbackHeightPx
  );

  useEffect(() => {
    setFrameHeight(HOROSCOPE_CHART_FRAME.fallbackHeightPx);
  }, [html]);

  useEffect(() => {
    const el = iframeRef.current;
    if (el) {
      el.style.height = `${frameHeight}px`;
    }
  }, [frameHeight]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type !== HOROSCOPE_CHART_FRAME.resizeMessageType) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      const next = event.data.height;
      if (typeof next === "number" && next > 0) {
        setFrameHeight(next);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!html?.trim()) return null;
  const srcDoc = buildHoroscopeChartSrcDoc(html);

  return (
    <div className={cn("flex flex-col", className)}>
      {showTitle !== false && title?.trim() ? (
        <p className={HOROSCOPE_LAYOUT.chartTitle}>{title}</p>
      ) : null}
      <div className={HOROSCOPE_LAYOUT.chartShell}>
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
