/** Weekly predictions list scroll — mirrors Flutter `_onDayTap` / `ListView` offsets. */
export const WEEKLY_PREDICTION_LAYOUT = {
  /** Pin selected card this many px below the list viewport top. */
  scrollCardTopInsetPx: 8,
  /** Which card is “active” while the user scrolls manually. */
  scrollSpyTopThresholdPx: 32,
  /** Fallback card height when measuring scroll-sync before layout. */
  estimatedCardHeightPx: 220,
  /** Ignore scroll-sync while a day-tab scroll animation runs (ms). */
  programmaticScrollMs: 550,
} as const;
