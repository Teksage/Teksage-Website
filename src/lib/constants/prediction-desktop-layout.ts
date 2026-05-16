/** Desktop layout tokens for prediction + match-making (lg+ = 1024px). */

export const PREDICTION_DESKTOP_LAYOUT = {
  /** Readable column — mirrors `HOME_LAYOUT.maxWidth` upper range. */
  contentColumn: "mx-auto w-full max-w-lg lg:max-w-3xl xl:max-w-5xl",
  contentGutter: "px-4 sm:px-5 lg:px-8",
  wideColumn: "mx-auto w-full max-w-6xl px-4 lg:px-8",
  /** Centered form / hero card */
  narrowColumn: "mx-auto w-full max-w-md lg:max-w-xl",
  landingRoot:
    "relative w-full min-h-dvh overflow-hidden lg:flex lg:min-h-[min(100dvh,52rem)] lg:flex-col lg:items-center lg:justify-center lg:py-14",
  landingMobile: "relative h-dvh w-full lg:hidden",
  landingDesktop:
    "hidden w-full flex-col text-center lg:flex",
  /** Full-width stacked CTAs — Flutter yearly/life detail (vertical buttons). */
  stackedCtaColumn: "mx-auto flex w-full max-w-md flex-col gap-4",
  detailCtaButton:
    "inline-flex w-full items-center justify-center rounded-[1.25rem] bg-white px-6 py-3.5 text-center text-base font-semibold leading-snug sm:text-lg",
  /** Equal-width row — match-making desktop (shorter labels). */
  sideBySideCtaRow: "mx-auto flex w-full max-w-2xl flex-row gap-4",
  horizontalCardWidth: "w-[min(86.67vw,22rem)] shrink-0 lg:w-full lg:shrink",
} as const;
