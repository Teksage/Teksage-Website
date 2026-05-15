"use client";

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
  if (!html?.trim()) return null;
  const srcDoc = buildHoroscopeChartSrcDoc(html);
  return (
    <div className={cn("flex flex-col", className)}>
      {showTitle !== false && title?.trim() ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-panchang)]">
          {title}
        </p>
      ) : null}
      <iframe
        title={title}
        className="min-h-[var(--horoscope-chart-iframe-min-h)] w-full rounded-[20px] border border-[color-mix(in_srgb,var(--color-brand-primary)_50%,transparent)] bg-white"
        sandbox="allow-scripts allow-same-origin"
        srcDoc={srcDoc}
      />
    </div>
  );
}
