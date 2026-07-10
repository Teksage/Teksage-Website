// Brand color palette — mirrors Flutter colorConstant.dart
// Never use raw hex strings in components; import from here instead.

export const COLORS = {
  // Primary brand
  mainColor: "#10B100",
  iosMainColor: "#1081DD",

  // Base
  whiteColor: "#FFFFFF",
  blackColor: "#000000",

  // Semantic
  errorColor: "#E60000",
  bgColor: "#F1F1F1",
  notEditable: "#F6F6F6",
  lightGrey: "#ECECEC",

  // Home screen (design ref: mint behind dashboard + AI chat strip)
  homeScreenMint: "#C6E7B9",
  /** Greeting + “Explore Other Predictions” title (ref: black, not panchang green). */
  homeDashboardHeading: "#000000",
  /** Hairlines under greeting + flanking explore title — black @ ~26% on mint (ref: soft grey). */
  homeDashboardRule: "rgb(0 0 0 / 0.26)",
  consultationHeading: "#3A3B00",

  /** AI Voice chat — sparkle tile + CTA arrow (design ref, not primary CTA green). */
  aiChatIconGreen: "#2E8B1E",

  // Home banners
  homeBanner: "#A2C734",
  homeBanner2: "#100C0D",
  homeBannerFont: "#0E0D0C",
  homeBannerBorder: "#C8EF54",

  // Match making
  marriageColor: "#FF7075",

  // Weekly prediction
  weeklyPrediction: "#61CC95",
  weeklySubTitle: "#30569F",
  predictionPositive: "#30569F",

  // Yearly prediction gradients
  yearlyTopGradient: "#EF8B8B",
  yearlyBottomGradient: "#E8DA8C",
  yearlyPredictionButtonText: "#CA5B5B",

  // Life prediction gradients
  lifeTopGradient: "#9754F6",
  lifeBottomGradient: "#ABAEDB",
  lifePredictionButtonText: "#54469D",
  lifeContainer: "#D9CBF6",
  lifeTitleText: "#4933BD",

  // Panchang
  panchangHeading: "#229716",
  horoscopeLightBg: "#BAE8B5",
  /** North-chart placeholder (`comingSoon.dart` base #97D492). */
  horoscopeNorthWatermark: "#97D492",
  /** `blackColor.withOpacity(0.3)` row dividers (`panchangPage.dart` + `dashedLine.dart`). */
  panchangRowDivider: "rgb(0 0 0 / 0.3)",
  /** `blackColor.withOpacity(0.6)` for Bala / sunrise labels (`panchangPage.dart`). */
  panchangCardMutedText: "rgb(0 0 0 / 0.6)",

  // Match making accents
  matchGradient1: "#F78C8C",
  matchGradient2: "#FFE1D4",
  matchAccent1: "#FFB3C0",
  matchAccent2: "#FF8B84",
  matchLight: "#FFEBEB",
  matchDark: "#FC5D59",

  // Neutrals / chrome
  neutral1: "#C7C7C7",
  neutral2: "#D1D3D9",
  neutral3: "#D9D9D9",

  // Astro consultation greens
  astroGreen1: "#94C10D",
  astroGreen2: "#87B303",
  astroGreen3: "#7FA900",
  astroGreen4: "#85AD0A",

  // Panchang blues (used in panchang screens)
  panchangBg: "#0B121A",
  panchangBlue: "#7CA2B9",
  panchangDark: "#2C4252",

  // Tooltip / misc
  tooltipYellow: "#FEDF30",
  tooltipDark: "#1E1E1E",
  weeklyLoader: "#00B17F",

  // Daily prediction screen — `predictionContainer.dart` header strips
  dailyDesktopCareerHeader: "#E2EAFB",
  dailyDesktopRelationshipHeader: "#FFEAF8",
  dailyDesktopWealthHeader: "#FBEEE2",
  dailyDesktopHealthHeader: "#E6E2FB",
  dailyDesktopConsultBannerMid: "#7CB342",
  /** Flutter `balaContainer.dart` Chandra 8. */
  dailyChandrashtama: "#FF3232",
  dailyChandrashtamaBg: "#FFE0E0",

  /** Event Planner (Muhurtha) — status + rating chips */
  muhurthaSuitableBg: "#E8F8E6",
  muhurthaSuitableText: "#1B7A12",
  muhurthaSuitableRing: "#9AD492",
  muhurthaUnsuitableBg: "#FCE8E8",
  muhurthaUnsuitableText: "#B42318",
  muhurthaUnsuitableRing: "#F5B5B0",
  muhurthaRatingVeryGood: "#1B7A12",
  muhurthaRatingGood: "#D35400",
  muhurthaRatingAverage: "#C9920A",
  muhurthaStatusVeryGoodBg: "#E8F8E6",
  muhurthaStatusVeryGoodText: "#1B7A12",
  muhurthaStatusVeryGoodRing: "#9AD492",
  muhurthaStatusGoodBg: "#FFF0E0",
  muhurthaStatusGoodText: "#D35400",
  muhurthaStatusGoodRing: "#F5B07A",
  muhurthaStatusAverageBg: "#FFF8DC",
  muhurthaStatusAverageText: "#C9920A",
  muhurthaStatusAverageRing: "#F0D060",
  muhurthaCardTop: "#FFF6E0",
  muhurthaCardBottom: "#FFE4A8",
  muhurthaCardAccent: "#B8860B",
  muhurthaBannerTop: "#FFF9EB",
  muhurthaBannerMid: "#FFE9B8",
  muhurthaBannerBottom: "#F5D27A",
} as const;

export type ColorKey = keyof typeof COLORS;
