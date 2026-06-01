/** Yearly detail cards — shared with `YearlyPlanetCard` / overview / remedies. */
export const YEARLY_CARD_UI = {
  surface: "relative shrink-0 overflow-hidden rounded-[1.125rem]",
  surfaceMint: "bg-[var(--color-yearly-card-bg)]",
  surfaceWhite: "bg-white",
  deco: "pointer-events-none absolute right-0 top-0 w-[50%] object-contain",
  body: "relative px-5 py-8 lg:px-6 lg:py-8",
  headerRow: "flex items-start justify-between gap-4",
  title: "min-w-0 flex-1 text-card-title font-bold leading-tight text-[var(--color-brand-black)]",
  icon: "size-10 shrink-0 lg:size-11",
  bodyText: "mt-3 text-left text-base leading-relaxed text-black/85",
  bodyTextSpaced: "mt-6 text-left text-base leading-relaxed text-black/85",
  introBlock: "w-full pt-2 text-center text-white",
  introTitle: "text-xl font-bold lg:text-2xl",
  generalPanel:
    "mt-4 rounded-[1.125rem] bg-[var(--color-yearly-card-bg)] px-5 py-6 lg:px-8 lg:py-7",
  generalText:
    "text-left text-base leading-relaxed text-black/85 lg:text-[1.0625rem] lg:leading-8",
  track:
    "flex gap-3 overflow-x-auto pb-1 pl-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:pl-0 xl:grid-cols-3 xl:gap-8",
} as const;
