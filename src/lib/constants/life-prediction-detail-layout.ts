/** Life prediction detail — full-bleed main pane (`LifePredictionLayout`). */
export const LIFE_DETAIL_LAYOUT = {
  pageRoot:
    "flex w-full min-w-0 flex-col pb-[var(--main-bottom-nav-clearance)] lg:pb-14",
  headerBar:
    "grid w-full grid-cols-[auto_1fr_auto] items-center px-4 pt-6 lg:px-8 lg:pt-8",
  content: "w-full min-w-0 px-4 pb-14 lg:px-8",
  introBlock: "w-full pt-2 text-center text-white",
  introTitle: "text-xl font-bold lg:text-2xl",
  introText: "mx-auto mt-3 max-w-2xl text-base leading-relaxed lg:text-lg",
  ctaColumn:
    "mx-auto mt-8 flex w-full max-w-md flex-col items-stretch gap-4 lg:mt-10",
} as const;
