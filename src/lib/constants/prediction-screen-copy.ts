/** Flutter `PlatformTextConfig` / screen copy for prediction + match making UI parity. */

export const WEEKLY_SCREEN = {
  title: "Weekly Predictions",
  greetingPrefix: "Good morning,",
  greetingSuffix: "Hope you're having a wonderful start to your day.",
  dayTabs: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const,
} as const;

export const YEARLY_LANDING_SCREEN = {
  title: "Yearly Prediction",
  description:
    "Description - Unlock personalized insights into your future, career, relationships, and more with AI-powered astrology.",
  generateCta: "Generate Yearly Prediction",
  generating: "Generating…",
  generateError: "Could not generate your yearly prediction. Please try again.",
} as const;

export const LIFE_LANDING_SCREEN = {
  title: "Life Predictions",
  description:
    "Unlock personalized insights into your future, career, relationships, and more with AI-powered astrology.",
  generateCta: "Generate Life Prediction",
  generating: "Generating…",
  generateError: "Could not generate your life prediction. Please try again.",
} as const;

export const LIFE_DETAIL_SCREEN = {
  intro:
    "It's a privilege to guide you through the insights that your chart offers, especially at this meaningful stage of your life.",
  consultCta: "Astrology Consultation",
  infoTooltip:
    "Insights reflect information you've provided in your profile.",
} as const;

export const MATCH_MAKING_FLUTTER = {
  pageTitle: "Marriage Match Making",
  subtitle: "Check astrological compatibility for a perfect match",
  boySection: "Boy Details",
  girlSection: "Girl Details",
  boyNamePlaceholder: "Enter boy's name",
  girlNamePlaceholder: "Enter girl's name",
  calculateCta: "Calculate Match",
} as const;

/** Flutter `customCardSwiper.dart` `getTitle` — display lines joined with newline in UI. */
export const LIFE_SECTION_TITLES: Record<string, string> = {
  General: "General\nCharacteristics",
  Career: "Career\nPredictions",
  Relationship: "Relationship\nPredictions",
  Wealth: "Wealth\nPredictions",
  Health: "Health\nPredictions",
  "Current time period": "Current\nTime Period",
};
