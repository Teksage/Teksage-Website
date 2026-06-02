import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { NotificationPrefs } from "@/types/settings";

export async function updateNotificationPrefs(
  prefs: NotificationPrefs
): Promise<void> {
  await http.post(API_ENDPOINTS.notifyUpdate, {
    daily_predictions: prefs.dailyPredictions,
    weekly_predictions: prefs.weeklyPredictions,
    yearly_predictions: prefs.yearlyPredictions,
    promotion_offers: prefs.promotionOffers,
    warnings: prefs.warnings,
  });
}
