import { NOTIFICATION_DISPLAY_TITLES } from "@/lib/constants/notifications-screen";
import { ROUTES } from "@/lib/constants/routes";
import type { AppRoute } from "@/lib/constants/routes";

const T = NOTIFICATION_DISPLAY_TITLES;

export function notificationDisplayCopy(title: string, message: string): {
  title: string;
  message: string;
} {
  if (title === T.dailyWisdom) {
    return { title: T.dailyPrediction, message: T.dailyPredictionDesc };
  }
  if (title === T.weeklyInsights) {
    return { title: T.weeklyPrediction, message: T.weeklyPredictionDesc };
  }
  if (title === T.yearlyInsights) {
    return { title: T.yearlyPrediction, message: T.yearlyPredictionDesc };
  }
  return { title, message };
}

export function notificationPredictionRoute(title: string): AppRoute | null {
  if (title === T.dailyWisdom) return ROUTES.predictionsDaily;
  if (title === T.weeklyInsights) return ROUTES.predictionsWeekly;
  if (title === T.yearlyInsights) return ROUTES.predictionsYearly;
  return null;
}
