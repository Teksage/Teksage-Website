/** Yearly prediction detail — full-bleed main pane (`YearlyPredictionLayout`). */
export const YEARLY_DETAIL_LAYOUT = {
  pageRoot:
    "flex w-full min-w-0 flex-col pb-[var(--main-bottom-nav-clearance)] lg:pb-14",
  headerBar:
    "grid w-full grid-cols-[auto_1fr_auto] items-center px-4 pt-6 lg:px-8 lg:pt-8",
  content: "w-full min-w-0 space-y-0 px-4 pb-14 lg:px-8",
  ctaColumn:
    "mx-auto mt-10 flex w-full max-w-md flex-col items-stretch gap-4",
} as const;
