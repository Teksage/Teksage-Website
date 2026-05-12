/**
 * Home dashboard spacing — mirrors expected mobile ref (16–20px gutters,
 * ~20–24px vertical rhythm, ~24px card corners).
 */
export const HOME_LAYOUT = {
  maxWidth: "mx-auto w-full max-w-lg",
  /** Header, main scroll, bottom nav share the same horizontal inset. */
  gutterX: "px-4 sm:px-5",
  /** Space between major sections below the header. */
  sectionStack: "space-y-5 sm:space-y-6",
  mainTopPad: "pt-4 sm:pt-5",
  mainBottomPad: "pb-1 sm:pb-2",
  homeCardRadius: "rounded-3xl",
  /** Stadium / pill ends — bottom nav (design ref). */
  pillStrip: "rounded-full",
  bottomNavPadding: "px-2 py-2.5 sm:px-3 sm:py-3",
  featureGridGap: "gap-3",
  /** Title row ↔ prediction icons. */
  exploreSectionGap: "gap-5 sm:gap-6",
} as const;
