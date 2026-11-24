export const YEARLY_2027_PROMO = {
  headerChip: "2027 Predictions",
  newBadge: "NEW",
  bannerEyebrow: "Yearly Prediction",
  bannerTitle: "Your 2027 Yearly Prediction is ready",
  bannerSubtitle:
    "Planetary transits, category scores, and remedies — personalized from your chart.",
  sheetHeroBadge: "✦ NEW • 2027",
  sheetTitle: "Your 2027 Yearly Journey Awaits",
  sheetSubtitle: "A quick look at your year ahead:",
  career: "Career",
  relationship: "Relationships",
  relationshipShort: "Love",
  finance: "Finance",
  health: "Health",
  viewFull: "View full 2027 prediction",
  upgradeCta: "Unlock your full Yearly Prediction",
  notNow: "Not now",
  maybeLater: "Maybe later",
  generating: "Preparing your 2027 scores…",
  closeAria: "Close",
  quickAccess: "Quick Access",
  yourScores: "Your 2027 scores",
} as const;

/** Local mirror of DB `yearly_2027_promo_dismissed_on` (ISO date). */
export const YEARLY_2027_PROMO_STORAGE_KEY = "yearly_2027_promo_dismissed_on" as const;
/** Legacy key — migrated once into the new key. */
export const YEARLY_2027_PROMO_STORAGE_KEY_LEGACY = "yearly_2027_promo_hidden_on" as const;

export const YEARLY_2027_SCORE_ORDER = [
  "career",
  "relationship",
  "finance",
  "health",
] as const;
