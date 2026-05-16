/** User-facing copy for prediction detail routes — keep strings out of TSX. */

export const PREDICTION_DETAIL_SCREEN = {
  loginTitle: "Sign in to view predictions",
  loginDescription: "Log in with email or mobile OTP to see your personalized predictions.",
  loginCta: "Go to login",
  loadErrorTitle: "Could not load prediction",
  tryAgainCta: "Try again",
  emptyTitle: "No prediction yet",
  emptyDescription:
    "We could not find a prediction for you yet. Try again later or regenerate from the app if available.",
  quoteLabel: "Today’s note",
  balaRow: "Thara / Chandra",
  downloadPdfCta: "Download PDF",
  sharePdfError: "Could not download PDF. Please try again.",
  weeklyPositive: "Favorable day",
  weeklyNotPositive: "Mixed day",
  sectionCareer: "Career",
  sectionRelationship: "Relationship",
  sectionWealth: "Wealth",
  sectionHealth: "Health",
  /** Flutter daily prediction header pill — 6:00 AM cutoff matches `formatHomeDashboardDate`. */
  dailyScheduledPill: "Your daily predictions was scheduled for 6 AM",
  /** Flutter `PlatformTextConfig.infoText` (iOS wording). */
  dailyInfoTooltip:
    "Insights reflect information you've provided in your profile.",
  /** Flutter `dailyPrediction.dart` when `chandra_bala` is 8. */
  chandrashtamaLabel: "Chandrashtama",
} as const;
