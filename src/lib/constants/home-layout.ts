/**
 * Home dashboard spacing — mirrors expected mobile ref (16–20px gutters,
 * ~20–24px vertical rhythm, ~24px card corners).
 */
export const HOME_LAYOUT = {
  /** Mobile stays phone-width; desktop uses a readable content column. */
  maxWidth: "mx-auto w-full max-w-lg lg:max-w-5xl xl:max-w-6xl",
  /** `DesktopMainNav` width — token in `globals.css` (`--desktop-sidebar-width`). */
  desktopAsideWidth: "desktop-sidebar-width",
  desktopBackdropInset: "lg:left-[length:var(--desktop-sidebar-width)]",
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
  /** Flutter bar inset — compact pill (`responsiveHeight(0.0863)` ≈ 56–72px). */
  bottomNavPadding: "px-3 py-2",
  bottomNavPillSurface: "bg-white",
  /** Horizontal inset for floating pill (Flutter `margin: EdgeInsets.symmetric(horizontal: 20)`). */
  floatingNavInsetX: "px-5",
  /** Transparent shell — page/tab background shows around the pill (Flutter `extendBody`). */
  floatingNavShell: "bg-transparent",
  /** Safe-area only — no extra gap that exposed gray body background. */
  /** Flutter `bottomPadding` 20px when no safe-area. */
  floatingNavBottom:
    "pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]",
  /** Main scroll clearance: pill height + safe area (matches `--main-bottom-nav-clearance`). */
  bottomNavClearance: "pb-[var(--main-bottom-nav-clearance)] lg:pb-8",
  /** Visible gap between last home strip (AI chat) and floating bottom nav. */
  chatBannerNavGap: "mb-5 sm:mb-6",
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
  /** Event Planner home strip — soft mint gradient (not consultation lime or chat dark). */
  eventPlannerBannerShell:
    "border-2 border-[color-mix(in_srgb,var(--color-brand-primary)_24%,transparent)] bg-[linear-gradient(135deg,var(--color-brand-horoscope-bg)_0%,color-mix(in_srgb,var(--color-brand-primary)_10%,white)_52%,color-mix(in_srgb,var(--color-home-screen-mint)_70%,white)_100%)] shadow-md",
} as const;
