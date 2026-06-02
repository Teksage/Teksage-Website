/** Weekly predictions — layout + scroll (`WeeklyPredictionLayout`). */
export const WEEKLY_PREDICTION_LAYOUT = {
  pageRoot:
    "flex min-h-0 w-full flex-1 flex-col bg-[var(--color-brand-bg)] pb-10 lg:pb-14",
  heroHeader:
    "relative w-full min-h-[347px] overflow-hidden bg-[linear-gradient(180deg,var(--color-weekly-hero-from)_28.54%,var(--color-weekly-hero-to)_100%)] lg:min-h-[280px]",
  heroInner: "relative z-10 w-full px-4 pt-10 sm:px-5 lg:px-8 lg:pt-8",
  cardGrid:
    "relative z-10 -mt-6 max-h-[calc(100dvh-300px)] space-y-5 overflow-y-auto px-4 pb-8 sm:px-5 lg:mt-4 lg:max-h-none lg:overflow-visible lg:px-8 lg:pb-10 lg:grid lg:grid-cols-2 lg:gap-6 xl:gap-8",
  consultStripSpan: "lg:col-span-2",
  /** Pin selected card this many px below the list viewport top. */
  scrollCardTopInsetPx: 8,
  /** Which card is “active” while the user scrolls manually. */
  scrollSpyTopThresholdPx: 32,
  /** Fallback card height when measuring scroll-sync before layout. */
  estimatedCardHeightPx: 220,
  /** Ignore scroll-sync while a day-tab scroll animation runs (ms). */
  programmaticScrollMs: 550,
  dayTabRow:
    "mx-auto mt-6 flex w-full max-w-md flex-wrap justify-center gap-2 pb-5 sm:max-w-lg sm:gap-2.5 md:max-w-xl lg:max-w-2xl lg:gap-3 xl:max-w-3xl",
  dayTabBase:
    "w-11 shrink-0 rounded-2xl px-1.5 py-2 text-center text-xs font-bold transition-colors sm:w-12 sm:text-sm md:w-14 lg:w-18 lg:px-2 lg:text-sm",
  dayTabSelected:
    "bg-[var(--color-brand-primary)] text-white shadow-[0_2px_8px_rgb(16_177_0_/0.35)]",
  dayTabIdle:
    "bg-white text-[var(--color-brand-black)] shadow-[0_2px_8px_rgb(0_0_0_/0.12)] ring-1 ring-black/10",
} as const;
