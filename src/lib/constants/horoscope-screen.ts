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
    "relative z-10 mx-auto flex w-full max-w-md flex-col gap-3 px-5 pt-0 text-[var(--color-brand-black)] lg:max-w-5xl lg:gap-6 lg:px-8 lg:pb-8",
  chartStack: "flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6",
  profileCard: `mx-auto w-full max-w-md ${horoscopeCardBorder} px-4 py-1 shadow-sm lg:max-w-none`,
  chartToggle:
    "mx-auto flex w-full max-w-md rounded-[28px] border border-[color-mix(in_srgb,var(--color-brand-primary)_50%,transparent)] bg-white p-1 shadow-sm lg:max-w-xl",
} as const;
