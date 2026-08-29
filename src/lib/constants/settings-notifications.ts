import type { NotificationPrefs } from "@/types/settings";

export const NOTIFICATION_PREF_KEYS = [
  "dailyPredictions",
  "weeklyPredictions",
  "yearlyPredictions",
  "promotionOffers",
  "warnings",
] as const;

export type NotificationPrefKey = (typeof NOTIFICATION_PREF_KEYS)[number];

export const NOTIFICATION_PREF_LABELS: Record<NotificationPrefKey, string> = {
  dailyPredictions: "Daily Prediction",
  weeklyPredictions: "Weekly Predictions",
  yearlyPredictions: "Yearly Prediction",
  promotionOffers: "Promotions & Offers",
  warnings: "Warnings",
};

export const DEFAULT_NOTIFICATION_PREFS: NotificationPrefs = {
  dailyPredictions: true,
  weeklyPredictions: true,
  yearlyPredictions: true,
  promotionOffers: true,
  warnings: true,
};

export const SETTINGS_NOTIFICATIONS_COPY = {
  loadFailed: "Could not load notification preferences.",
  updateFailed: "Failed to update preferences. Try again.",
  premiumRequired: "Subscribe to manage prediction notifications.",
  viewSubscriptions: "View subscriptions",
} as const;
