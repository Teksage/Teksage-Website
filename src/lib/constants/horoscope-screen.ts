/** User-facing copy for Horoscope tab. */

export const HOROSCOPE_SCREEN = {
  headerTitle: "Horoscope",
  loginTitle: "Sign in to view your horoscope",
  loginDescription:
    "Your charts use the birth details saved on your profile.",
  loginCta: "Go to login",
  profileIncompleteTitle: "Complete your profile",
  profileIncompleteDescription:
    "Add date, time, and place of birth so we can build your charts.",
  profileCta: "Open profile",
  loadErrorTitle: "Could not load horoscope",
  tryAgainCta: "Try again",
  downloadPdfCta: "Download PDF",
  downloadBusyCta: "Downloading…",
  downloadError: "Download failed. Please try again.",
  fallbackName: "Your horoscope",
  birthTimeSeparator: " · ",
  birthLabel: "Birth",
  placeLabel: "Place",
  lagnaLabel: "Lagna",
  chartFallbackRasi: "Rashi chart",
  chartFallbackNavamsa: "Navamsa chart",
  profileNameLabel: "Name",
  profileDobLabel: "Date of Birth",
  profileTimeOfBirthLabel: "Time of Birth",
  profilePlaceLabel: "Place",
  profileRasiLabel: "Rasi",
  profileNakshatramLabel: "Nakshatram",
  profileLagnaLabel: "Lagna",
  chartSouthTab: "South Indian Chart",
  chartNorthTab: "North Indian Chart",
  northChartLines: ["NORTH", "INDIAN", "CHART"] as const,
  /** i18n key — mirrors Flutter `COMING SOON`.tr */
  comingSoonMarquee: "COMING SOON",
} as const;

const horoscopeCardBorder =
  "rounded-[20px] border-[3px] border-[color-mix(in_srgb,var(--color-brand-primary)_30%,transparent)] bg-white";

const panelWidth = "w-full max-w-md lg:max-w-xl";

/** Loaded horoscope shell — mirrors `horoscopePage.dart` spacing. */
export const HOROSCOPE_LAYOUT = {
  shellRoot: "relative",
  heroHeader:
    "relative z-10 bg-[var(--color-brand-panchang)] pb-6 pt-[min(5vh,60px)] text-white",
  heroBar: "relative mx-auto flex h-12 w-full items-center justify-center px-4",
  heroTitle:
    "text-center text-2xl font-bold leading-none tracking-tight",
  content:
    "relative z-10 mx-auto -mt-6 flex w-full max-w-md flex-col items-center gap-3 px-5 pt-0 text-[var(--color-brand-black)] lg:max-w-4xl lg:gap-6 lg:px-8 lg:pb-8",
  /** Mobile: stacked. Desktop: Rasi + Navamsa in one row. */
  chartStack:
    "flex w-full max-w-md flex-col items-center gap-3 lg:max-w-3xl lg:grid lg:grid-cols-2 lg:justify-items-center lg:gap-5 xl:max-w-4xl xl:gap-6",
  chartFrame: "w-full max-w-[17.5rem] sm:max-w-xs lg:max-w-[20rem]",
  chartShell:
    "w-full overflow-hidden rounded-[20px] border border-[color-mix(in_srgb,var(--color-brand-primary)_50%,transparent)] bg-white",
  chartIframe: "block w-full border-0 bg-transparent",
  chartTitle:
    "mb-2 text-center text-sm font-semibold uppercase tracking-wide text-[var(--color-brand-panchang)]",
  northComingSoonWrap: "w-full lg:col-span-2",
  /** Flutter `ComingSoonContainer` — watermark + centered marquee on mint (no white card). */
  northComingSoonStage:
    "relative flex w-full min-h-[min(52vw,20rem)] items-center justify-center py-8 sm:min-h-[18rem] sm:py-10 lg:min-h-[20rem] lg:py-12",
  northWatermarkBlock:
    "pointer-events-none flex flex-col items-center pt-8 text-center",
  northWatermark:
    "text-[clamp(2.75rem,18vw,4.6875rem)] font-extrabold leading-[0.75] text-[color-mix(in_srgb,var(--color-horoscope-north-watermark)_50%,transparent)]",
  comingSoonMarqueeShell:
    "absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-0",
  comingSoonMarqueeBar:
    "horoscope-coming-soon-marquee-fade relative h-[37px] w-full overflow-hidden bg-[var(--color-brand-primary)]",
  comingSoonMarqueeTrack: "horoscope-coming-soon-marquee flex w-max items-center",
  comingSoonMarqueeItem:
    "flex shrink-0 items-center gap-1.5 px-3 text-sm font-semibold leading-none text-white",
  profileCard: `${panelWidth} ${horoscopeCardBorder} px-4 py-1 shadow-sm`,
  downloadBtn: `${panelWidth} inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--color-brand-primary)] bg-white text-sm font-semibold text-[var(--color-brand-primary)] hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_8%,white)]`,
  downloadIcon: "size-4",
  profileRow:
    "flex items-start gap-3 border-dashed border-[var(--color-panchang-row-divider)] py-2.5 text-sm",
  profileRowLabel:
    "w-[7.25rem] shrink-0 font-semibold text-[var(--color-brand-panchang)] sm:w-32",
  profileRowValue:
    "min-w-0 flex-1 text-right font-medium leading-snug text-[var(--color-brand-black)]",
  chartToggle: `flex ${panelWidth} rounded-[28px] border border-[color-mix(in_srgb,var(--color-brand-primary)_50%,transparent)] bg-white p-1 shadow-sm`,
  chartToggleBtn:
    "min-h-11 flex-1 rounded-full px-2 text-center text-xs font-semibold leading-tight sm:text-sm",
  chartToggleBtnActive:
    "bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-primary)] hover:text-white",
  chartToggleBtnIdle: "text-black/50 hover:bg-transparent",
} as const;
