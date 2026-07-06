/** Horoscope chart iframe — mirrors Flutter `ChartWidget` (339×305). */

export const HOROSCOPE_CHART_FRAME = {
  resizeMessageType: "teksage-horoscope-chart-size",
  /** Flutter `horoscopeChart.dart` fixed WebView width. */
  frameWidthPx: 339,
  /** Flutter `horoscopeChart.dart` fixed WebView height. */
  frameHeightPx: 305,
  fallbackHeightPx: 305,
  srcDocPaddingPx: 5,
} as const;

/** Tailwind width cap matching `frameWidthPx`. */
export const HOROSCOPE_CHART_SHELL_WIDTH =
  "mx-auto w-full max-w-[21.1875rem]" as const;
