/** Desktop layout tokens for prediction + match-making (lg+ = 1024px). */

export const PREDICTION_DESKTOP_LAYOUT = {
  /** Readable column — mirrors `HOME_LAYOUT.maxWidth` upper range. */
  contentColumn: "mx-auto w-full max-w-lg lg:max-w-3xl xl:max-w-5xl",
  contentGutter: "px-4 sm:px-5 lg:px-8",
  wideColumn: "mx-auto w-full max-w-6xl px-4 lg:px-8",
  /** Centered form / hero card */
  narrowColumn: "mx-auto w-full max-w-md lg:max-w-xl",
  landingRoot:
    "relative flex w-full min-h-dvh min-w-0 flex-col overflow-hidden lg:min-h-0 lg:flex-1",
  landingMobile: "relative h-dvh w-full shrink-0 lg:hidden",
  landingDesktop:
    "relative hidden min-h-0 w-full min-w-0 flex-1 flex-col lg:flex",
  landingDesktopBackBar: "w-full shrink-0 px-4 pt-8 lg:px-8 lg:pt-10",
  landingDesktopContent:
    "flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-14 text-center lg:px-8 lg:pb-16",
  landingDesktopCopyMax: "max-w-lg",
  /** Full-width stacked CTAs — Flutter yearly/life detail (vertical buttons). */
  stackedCtaColumn: "mx-auto flex w-full max-w-md flex-col gap-4",
  detailCtaButton:
    "inline-flex w-full items-center justify-center rounded-[1.25rem] bg-white px-6 py-3.5 text-center text-base font-semibold leading-snug sm:text-lg",
  /** Equal-width row — match-making desktop (shorter labels). */
  sideBySideCtaRow: "mx-auto flex w-full max-w-2xl flex-row gap-4",
  horizontalCardWidth: "w-[min(86.67vw,22rem)] shrink-0 lg:w-full lg:shrink",
} as const;
