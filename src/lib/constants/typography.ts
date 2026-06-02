// Typography — mirrors Flutter AppFont / MyUtility font sizes.
// Size tokens are wired in `src/app/globals.css` `@theme` (keep values in sync).

export const FONT_FAMILY = {
  sans: "var(--font-urbanist)",
} as const;

/** Font size scale — also exposed as Tailwind `text-*` via `globals.css`. */
export const FONT_SIZE = {
  "3xs": "0.5rem", // 8px
  "2xs": "0.5625rem", // 9px
  micro: "0.625rem", // 10px
  nav: "0.6875rem", // 11px
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  "sm-plus": "0.8125rem", // 13px
  "body-sm": "0.9375rem", // 15px
  base: "1rem", // 16px
  md: "1.125rem", // 18px
  lg: "1.25rem", // 20px
  xl: "1.5rem", // 24px
  "2xl": "1.75rem", // 28px
  "page-title": "1.75rem", // consultation headings
  "card-title": "1.375rem", // 22px — yearly/life card titles
  "title-md": "1.1rem", // subscription fee row
  "title-lg": "1.35rem", // subscription product title
  "2xl-display": "2rem", // 32px — consult price, desktop landing
  display: "1.8rem", // prediction landing mobile
  "display-sm": "1.8125rem", // yearly/life landing title
  price: "1.5625rem", // 25px — plan cards
  "button-sm": "0.8rem", // shadcn compact button
  "3xl": "2rem", // 32px
  "4xl": "2.25rem", // 36px
} as const;

export const FONT_WEIGHT = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
} as const;

export const LINE_HEIGHT = {
  tight: "1.2",
  snug: "1.375",
  normal: "1.4",
  relaxed: "1.6",
  none: "1",
} as const;

/**
 * Shared typography class strings — import in constants and `.tsx` files.
 * Do not embed raw `text-[…]` or one-off rem sizes in components.
 */
export const TYPO = {
  size3xs: "text-3xs",
  size2xs: "text-2xs",
  sizeMicro: "text-micro",
  sizeNav: "text-nav",
  sizeXs: "text-xs",
  sizeSm: "text-sm",
  sizeSmPlus: "text-sm-plus",
  sizeBodySm: "text-body-sm",
  sizeBase: "text-base",
  sizeMd: "text-md",
  sizeLg: "text-lg",
  sizeXl: "text-xl",
  size2xl: "text-2xl",
  sizePageTitle: "text-page-title",
  sizeCardTitle: "text-card-title",
  sizeTitleMd: "text-title-md",
  sizeTitleLg: "text-title-lg",
  size2xlDisplay: "text-2xl-display",
  sizeDisplay: "text-display",
  sizeDisplaySm: "text-display-sm",
  sizePrice: "text-price",
  sizeButtonSm: "text-button-sm",

  weightRegular: "font-normal",
  weightMedium: "font-medium",
  weightSemibold: "font-semibold",
  weightBold: "font-bold",
  weightExtrabold: "font-extrabold",

  leadingNone: "leading-none",
  leadingTight: "leading-tight",
  leadingSnug: "leading-snug",
  leadingNormal: "leading-normal",
  leadingRelaxed: "leading-relaxed",

  navLabel: "text-nav font-semibold leading-tight sm:text-xs",
  /** Flutter `fontSize11` — fixed 11px on mobile (no `sm:text-xs` bump). */
  bottomNavLabel: "text-center text-[length:var(--text-nav)] text-nav font-semibold leading-none",
  badgeMicro: "text-micro font-semibold",
  badge2xs: "text-2xs font-semibold leading-tight",
  badge3xs: "text-3xs font-semibold leading-tight",
  caption: "text-xs font-semibold",
  captionMedium: "text-xs font-medium",
  body: "text-base font-medium",
  bodySemibold: "text-base font-semibold",
  bodyBold: "text-base font-bold",
  bodySm: "text-body-sm leading-relaxed",
  bodySmSemibold: "text-body-sm font-semibold leading-snug",
  label: "text-sm font-medium",
  labelSemibold: "text-sm font-semibold",
  hint: "text-nav font-medium",
  hintSm: "text-sm font-medium",
  error: "text-sm font-medium",
  errorSemibold: "text-sm font-semibold",
  h3: "text-lg font-semibold",
  h3Bold: "text-lg font-bold",
  h2: "text-xl font-bold leading-tight",
  h2Semibold: "text-xl font-semibold",
  h1: "text-2xl font-bold",
  h1Semibold: "text-2xl font-semibold",
  pageTitle: "text-page-title font-semibold leading-tight",
  cardTitle: "text-card-title font-bold leading-tight",
  displayLanding: "text-display font-bold",
  displayLandingSm: "text-display-sm font-bold leading-none",
  displayDesktop: "text-2xl-display font-bold leading-tight",
  price: "text-price font-semibold leading-none",
  priceFootnote: "text-micro leading-none",
  exploreTitle: "text-sm font-semibold sm:text-body-sm",
  exploreCircle: "text-xs font-semibold leading-snug sm:text-sm-plus",
  chatBubble: "text-body-sm leading-relaxed",
  bannerCta: "text-sm font-bold leading-snug sm:text-base",
  bannerFine: "text-nav font-semibold leading-tight sm:text-xs",
  consultBannerBody:
    "text-sm-plus font-bold leading-snug sm:text-base lg:text-base",
  consultBannerFine: "text-micro font-semibold leading-tight sm:text-nav",
  panchangHeroTime: "text-card-title font-semibold leading-none",
  subscriptionProduct: "text-title-lg font-semibold leading-none",
  subscriptionFee: "text-title-md font-semibold",
} as const;
