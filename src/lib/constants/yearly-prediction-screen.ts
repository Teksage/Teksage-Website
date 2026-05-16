/** Yearly prediction landing — Flutter `predictionLandingPage.dart` layout (% of viewport). */
export const YEARLY_LANDING_LAYOUT = {
  backTop: "6.41%",
  heroTop: "13.31%",
  titleTop: "47.42%",
  descriptionTop: "53.21%",
  buttonTop: "75%",
  decoWidth: "72.27vw",
  decoMaxWidth: "18.125rem",
  logoSize: "4.5rem",
  contentInsetX: "1.25rem",
} as const;

/** Yearly prediction — Flutter `yearlyPrediction.dart` + `planetCard.dart` copy. */

export const YEARLY_DETAIL_SCREEN = {
  title: "Yearly Prediction",
  planetaryTransits: "Planetary Transits",
  categorizedPredictions: "Categorized Predictions",
  remedies: "Remedies",
  regenerateCta: "Regenerate",
  regenerating: "Regenerating…",
  consultCta: "Astrology Consultation",
  infoTooltip:
    "Insights reflect information you've provided in your profile.",
  firstHalfPrefix: "First Half of",
  secondHalfPrefix: "Second Half of",
} as const;

export const YEARLY_PLANET_KEYS = [
  "jupiter",
  "saturn",
  "rahu",
  "ketu",
  "currentDasa",
] as const;

export type YearlyPlanetKey = (typeof YEARLY_PLANET_KEYS)[number];

export const YEARLY_PLANET_LABELS: Record<YearlyPlanetKey, string> = {
  jupiter: "Jupiter",
  saturn: "Saturn",
  rahu: "Rahu",
  ketu: "Ketu",
  currentDasa: "Current Dasa",
};

export const YEARLY_OVERVIEW_ENTRIES = [
  { key: "career", label: "Career Overview" },
  { key: "finance", label: "Finance Overview" },
  { key: "health", label: "Health Overview" },
  { key: "relationship", label: "Marriage/Relationship Overview" },
] as const;

export const YEARLY_REMEDY_ENTRIES = [
  { key: "chanting", label: "Chanting" },
  { key: "puja", label: "Puja" },
  { key: "charity", label: "Charity" },
] as const;

export const YEARLY_LAYOUT = {
  horizontalCardWidth: "min(86.67vw, 22rem)",
  horizontalTrackInset: "pl-5",
} as const;
