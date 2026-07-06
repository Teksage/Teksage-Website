/** User-facing copy for Horoscope tab. */

import { HOROSCOPE_CHART_SHELL_WIDTH } from "@/lib/constants/horoscope-chart-frame";

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

/** Loaded horoscope shell — mirrors `horoscopePage.dart` spacing. */
export const HOROSCOPE_LAYOUT = {
  shellRoot: "relative",
  heroHeader:
    "relative z-10 px-10 pb-2 pt-[min(5vh,40px)] text-center text-white lg:px-12 lg:pb-4 lg:pt-12",
  heroTitle: "text-xl font-bold leading-none tracking-tight lg:text-2xl",
  content:
    "relative z-10 mx-auto flex w-full max-w-md flex-col items-center gap-3 px-5 pt-0 text-[var(--color-brand-black)] lg:max-w-4xl lg:gap-6 lg:px-8 lg:pb-8",
  chartStack:
    "flex w-full max-w-md flex-col items-center gap-3 lg:max-w-3xl lg:grid lg:grid-cols-2 lg:justify-items-center lg:gap-5 xl:max-w-4xl xl:gap-6",
  chartFrame: HOROSCOPE_CHART_SHELL_WIDTH,
  chartShell: `${HOROSCOPE_CHART_SHELL_WIDTH} overflow-hidden rounded-[20px] border border-[color-mix(in_srgb,var(--color-brand-primary)_50%,transparent)] bg-white`,
  chartIframe: "block w-full border-0 bg-transparent",
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
  profileCard: `w-full max-w-md ${horoscopeCardBorder} px-4 py-1 shadow-sm lg:max-w-xl`,
  profileRow:
    "flex items-start gap-3 border-dashed border-[var(--color-panchang-row-divider)] py-2.5 text-sm",
  profileRowLabel:
    "w-[7.25rem] shrink-0 font-semibold text-[var(--color-brand-panchang)] sm:w-32",
  profileRowValue:
    "min-w-0 flex-1 text-right font-medium leading-snug text-[var(--color-brand-black)]",
  chartToggle:
    "flex w-full max-w-md rounded-[28px] border border-[color-mix(in_srgb,var(--color-brand-primary)_50%,transparent)] bg-white p-1 shadow-sm lg:max-w-xl",
} as const;
