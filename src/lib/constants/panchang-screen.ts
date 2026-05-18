/** User-facing copy for Panchang tab — keep strings out of TSX per project rules. */

export const PANCHANG_SCREEN = {
  headerTitle: "Panchang",
  personalizedTitle: "Personalized Panchang",
  loginTitle: "Sign in to view Panchang",
  loginDescription: "Use your email or mobile OTP on the login screen.",
  loginCta: "Go to login",
  premiumTitle: "Panchang is a premium feature",
  premiumDescription:
    "Subscribe to unlock daily Panchang, auspicious timings, and PDF sharing — same as the Teksage app.",
  subscriptionsCta: "View subscriptions",
  upgradeCta: "Upgrade Now",
  loadErrorTitle: "Could not load Panchang",
  loadErrorFallback: "Failed to load Panchang.",
  tryAgainCta: "Try again",
  todayLabel: "Today",
  downloadPdfCta: "Download PDF",
  sharePdfError: "Could not download Panchang PDF. Please try again.",
  detailSeparator: " · ",
  karnaTimeSeparator: " · ",
  dateRibbonPieceSeparator: " - ",
  segmentUptoWord: "upto",
  /** Between end time and `next` — line break matches Flutter card wrapping (`panchangPage.dart`). */
  segmentSecondaryLineBreak: "\n",
  segmentComma: ", ",
  /** Between first and second karna arm strings — line break between arms. */
  karnaArmGap: "\n",
  heroImageWidthPx: 1200,
  heroImageHeightPx: 1600,
  tharaChandraSeparator: " / ",
  infoButtonAria: "About Personalized Panchang",
  infoDialogTitle: "Personalized Panchang",
  infoDialogBody:
    "Daily timings and segments are computed for your location and subscription, matching the Teksage mobile app.",
  infoDialogCloseCta: "Close",
  balaPositiveAlt: "Positive",
  balaNegativeAlt: "Negative",
  mainCardLabels: {
    weekDay: "WeekDay",
    nakshatram: "Nakshatram",
    thithi: "Thithi",
    karna: "Karna",
    yoga: "Yoga",
  },
  rowLabels: {
    sunrise: "Sunrise",
    sunset: "Sunset",
    paksha: "Paksha",
    nakshatra: "Nakshatra",
    nakshatraUntil: "Nakshatra until",
    tithi: "Tithi",
    tithiUntil: "Tithi until",
    yoga: "Yoga",
    rahuKala: "Rahu Kalam",
    yamaKanda: "Yama Kanda",
    tharaChandra: "Thara & Chandra Bala",
    tharaBalaShort: "Thara Bala",
    chandraBalaShort: "Chandra Bala",
    karna1: "Karna (1)",
    karna2: "Karna (2)",
    auspicious: "Auspicious times",
    auspiciousTime: "Auspicious Time",
    amirthathiYoga: "Amirthathi Yoga",
  },
} as const;

/** Personalized Panchang layout — mirrors `panchangPage.dart` spacing. */
export const PANCHANG_LAYOUT = {
  fillLayer: "absolute inset-0",
  /** Mobile only — starfield PNG + gradient (`panchangPage.dart`). */
  mobileBackdrop: "absolute inset-0 lg:hidden",
  /** Desktop only — `COLORS.horoscopeLightBg` / `--color-brand-horoscope-bg` (#BAE8B5). */
  desktopBackdrop:
    "absolute inset-0 hidden bg-[var(--color-brand-horoscope-bg)] lg:block",
  heroGradient:
    "absolute inset-0 bg-gradient-to-b from-[var(--color-panchang-hero-top)] to-[var(--color-panchang-hero-bottom)]",
  imageCover: "object-cover object-center",
  imageSizes:
    "(max-width: 1023px) 100vw, calc(100vw - var(--desktop-sidebar-width))",
  heroHeader:
    "relative z-10 flex items-center justify-center px-10 pb-2 pt-[min(7.4vh,52px)] text-white lg:px-12 lg:pb-4 lg:pt-10 lg:text-[var(--color-brand-black)]",
  heroTitle:
    "text-center text-xl font-bold leading-none tracking-tight lg:text-2xl",
  infoButton:
    "absolute right-3 top-[min(7.4vh,52px)] rounded-full border border-white/25 text-white hover:bg-white/10 lg:right-8 lg:top-10 lg:border-[color-mix(in_srgb,var(--color-brand-panchang)_40%,transparent)] lg:text-[var(--color-brand-panchang)] lg:hover:bg-black/5",
  content: "relative z-10 pb-4 text-[var(--color-brand-black)] lg:pb-8",
  contentColumn:
    "mx-auto w-full max-w-md px-4 lg:max-w-3xl lg:px-8 xl:max-w-4xl",
  infoDialog:
    "max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 text-[var(--color-brand-black)] shadow-xl [&::backdrop]:bg-black/45",
  infoDialogTitle: "text-base font-semibold",
  infoDialogBody: "mt-2 text-sm text-neutral-600",
  infoDialogActions: "mt-4 flex justify-end",
  infoDialogClose: "rounded-full",
  /** Non‑premium gate — Flutter `emptyPanchangPage.dart` starfield + centered upsell. */
  premiumGateRoot:
    "relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden",
  premiumGateBackdrop: "pointer-events-none absolute inset-0",
  premiumGateDesktopMint:
    "absolute inset-0 hidden bg-[var(--color-brand-horoscope-bg)] lg:block",
  premiumGateGradient:
    "absolute inset-0 bg-gradient-to-b from-[var(--color-panchang-hero-top)]/95 to-[var(--color-panchang-hero-bottom)]/90",
  premiumGateScrim: "absolute inset-0 bg-black/25 lg:bg-black/10",
  premiumGateContent:
    "relative z-10 flex flex-1 items-center justify-center px-5 py-8 sm:px-8",
  premiumGateCard:
    "w-full max-w-md rounded-3xl border border-white/30 bg-white p-6 text-center shadow-2xl sm:p-8 lg:border-neutral-200/80 lg:shadow-xl",
  premiumGateIconWrap:
    "mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[var(--color-home-screen-mint)]",
  premiumGateTitle: "text-xl font-bold text-[var(--color-brand-black)] sm:text-2xl",
  premiumGateDescription: "mt-2 text-sm leading-relaxed text-neutral-600",
  premiumGateCtaWrap: "mt-6 flex justify-center",
  premiumGateCta: "min-w-[12rem] rounded-full px-8",
} as const;

const panchangCardBorder =
  "rounded-[20px] border-[3px] border-[color-mix(in_srgb,var(--color-brand-primary)_30%,transparent)] bg-white";

/** Panchang cards + section grid — mobile stack, desktop two-column upper block. */
export const PANCHANG_SECTIONS = {
  stack: "flex flex-col gap-2.5 pb-4 pt-1 lg:gap-6",
  upperGrid: "flex flex-col gap-2.5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6",
  columnStack: "flex flex-col gap-2.5 lg:gap-4",
  card: `mx-auto w-full max-w-md ${panchangCardBorder} px-4 py-1 lg:max-w-none`,
  pairRow: "mx-auto flex w-full max-w-md gap-2 lg:max-w-none",
  dateRibbon: "relative mx-auto w-full max-w-md px-5 lg:max-w-none lg:px-0",
} as const;
