import { AxiosError } from "axios";
import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { DEFAULT_NOTIFICATION_PREFS } from "@/lib/constants/settings-notifications";
import type {
  NotificationPrefs,
  PlanDetailsSnapshot,
  ProfileSettingsPayload,
  UserSubscriptionSnapshot,
} from "@/types/settings";

type RawNotify = {
  daily_predictions?: boolean;
  weekly_predictions?: boolean;
  yearly_predictions?: boolean;
  promotion_offers?: boolean;
  warnings?: boolean;
};

type RawProfileBundle = {
  user_notify?: RawNotify | null;
  subscription?: Record<string, unknown> | null;
  plan_details?: Record<string, unknown> | null;
};

function mapNotify(raw?: RawNotify | null): NotificationPrefs | null {
  if (!raw) return null;
  return {
    dailyPredictions: Boolean(raw.daily_predictions ?? DEFAULT_NOTIFICATION_PREFS.dailyPredictions),
    weeklyPredictions: Boolean(raw.weekly_predictions ?? DEFAULT_NOTIFICATION_PREFS.weeklyPredictions),
    yearlyPredictions: Boolean(raw.yearly_predictions ?? DEFAULT_NOTIFICATION_PREFS.yearlyPredictions),
    promotionOffers: Boolean(raw.promotion_offers ?? DEFAULT_NOTIFICATION_PREFS.promotionOffers),
    warnings: Boolean(raw.warnings ?? DEFAULT_NOTIFICATION_PREFS.warnings),
  };
}

function mapSubscription(raw?: Record<string, unknown> | null): UserSubscriptionSnapshot | null {
  if (!raw) return null;
  return {
    planStatus: String(raw.plan_status ?? raw.planStatus ?? ""),
    subscriptionStartDate:
      typeof raw.subscription_start_date === "string"
        ? raw.subscription_start_date
        : undefined,
    subscriptionEndDate:
      typeof raw.subscription_end_date === "string"
        ? raw.subscription_end_date
        : undefined,
    planId: raw.plan_id != null ? Number(raw.plan_id) : undefined,
  };
}

function mapPlanDetails(raw?: Record<string, unknown> | null): PlanDetailsSnapshot | null {
  if (!raw) return null;
  return {
    planName: typeof raw.plan_name === "string" ? raw.plan_name : undefined,
    tenureValue: raw.tenure_value != null ? Number(raw.tenure_value) : undefined,
    tenureCount: typeof raw.tenure_count === "string" ? raw.tenure_count : undefined,
    localPlanPrice:
      raw.local_plan_price != null ? Number(raw.local_plan_price) : undefined,
    foreignPlanPrice:
      raw.foreign_plan_price != null ? Number(raw.foreign_plan_price) : undefined,
  };
}

function bundleFromRaw(raw: RawProfileBundle): ProfileSettingsPayload {
  const subscription = mapSubscription(raw.subscription);
  const isPremium =
    (subscription?.planStatus ?? "").toLowerCase().trim() === "active";
  return {
    notificationPrefs: mapNotify(raw.user_notify),
    subscription,
    planDetails: mapPlanDetails(raw.plan_details),
    isPremium,
  };
}

export async function fetchProfileSettings(): Promise<ProfileSettingsPayload> {
  try {
    const { data } = await http.get<RawProfileBundle>(API_ENDPOINTS.profile);
    return bundleFromRaw(data);
  } catch (err) {
    const ax = err as AxiosError<{ profile_data?: RawProfileBundle }>;
    if (ax.response?.status === 400 && ax.response.data?.profile_data) {
      return bundleFromRaw(ax.response.data.profile_data);
    }
    throw err;
  }
}
