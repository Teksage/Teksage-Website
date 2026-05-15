/**
 * Home dashboard spacing — mirrors expected mobile ref (16–20px gutters,
 * ~20–24px vertical rhythm, ~24px card corners).
 */
export const HOME_LAYOUT = {
  /** Mobile stays phone-width; desktop uses a readable content column. */
  maxWidth: "mx-auto w-full max-w-lg lg:max-w-5xl xl:max-w-6xl",
  /** `DesktopMainNav` width — backdrops align to the main pane on `lg+`. */
  desktopAsideWidth: "13.5rem",
  desktopBackdropInset: "lg:left-[13.5rem]",
  /** Panchang-style readable column (narrower than home dashboard). */
  panchangContentColumn: "mx-auto w-full max-w-md lg:max-w-3xl xl:max-w-4xl",
  /** Header, main scroll, bottom nav share the same horizontal inset. */
  gutterX: "px-4 sm:px-5 lg:px-8",
  /** Space between major sections below the header. */
  sectionStack: "space-y-5 sm:space-y-6 lg:space-y-8",
  mainTopPad: "pt-4 sm:pt-5 lg:pt-6",
  mainBottomPad: "pb-1 sm:pb-2 lg:pb-4",
  homeCardRadius: "rounded-3xl",
  /** Stadium / pill ends — floating bottom nav (`bottomNavigation.dart`, radius 40). */
  pillStrip: "rounded-full",
  bottomNavPadding: "px-2 py-2.5 sm:px-3 sm:py-3",
  bottomNavPillSurface: "bg-white",
  /** Horizontal inset for floating pill (Flutter `margin: EdgeInsets.symmetric(horizontal: 20)`). */
  floatingNavInsetX: "px-5",
  /** Bottom inset so pill floats above home indicator (Flutter bottom padding ~20). */
  floatingNavBottom: "pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]",
  /** Main scroll clearance: pill height + float margin + safe area. */
  bottomNavClearance:
    "pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] lg:pb-8",
  floatingNavShadow: "shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
  featureGridGap: "gap-3 lg:gap-4",
  /** Shared min-height for consultation + AI chat strips. */
  homeBannerStripMinH: "min-h-[6.25rem] sm:min-h-[6.5rem] lg:min-h-[7rem]",
  /** Title row ↔ prediction icons. */
  exploreSectionGap: "gap-5 sm:gap-6",
  /** Explore block ↔ match/daily row (stacked mobile, grid row on desktop). */
  exploreFeatureStackGap: "gap-5 sm:gap-6 lg:gap-8",
  /** Match making + daily cards — shared height rhythm. */
  featureCardHeight: "h-[11rem] lg:h-[12.5rem]",
} as const;
