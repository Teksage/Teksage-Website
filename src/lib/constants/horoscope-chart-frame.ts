/** Horoscope chart iframe — size follows the South-Indian grid, not a tall empty card. */

export const HOROSCOPE_CHART_FRAME = {
  resizeMessageType: "teksage-horoscope-chart-size",
  frameWidthPx: 339,
  /** Square charts — height matches width until measured. */
  fallbackHeightPx: 339,
  srcDocPaddingPx: 8,
} as const;

/** Tailwind width cap matching `frameWidthPx`. */
export const HOROSCOPE_CHART_SHELL_WIDTH =
  "mx-auto w-full max-w-[21.1875rem]" as const;
