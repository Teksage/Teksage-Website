import { PREMIUM_PLAN_FEATURES } from "@/lib/constants/settings-ui";

/** Maps Flutter `planFeatures` labels → backend `services.id` (`services.utils.service_ids`). */
export const SUBSCRIPTION_PLAN_FEATURE_ROWS = [
  { label: PREMIUM_PLAN_FEATURES[0], serviceId: 1 },
  { label: PREMIUM_PLAN_FEATURES[1], serviceId: 2 },
  { label: PREMIUM_PLAN_FEATURES[2], serviceId: 10 },
  { label: PREMIUM_PLAN_FEATURES[3], serviceId: null, premiumBundle: true },
  { label: PREMIUM_PLAN_FEATURES[4], serviceId: null, premiumBundle: true },
  { label: PREMIUM_PLAN_FEATURES[5], serviceId: 9 },
  { label: PREMIUM_PLAN_FEATURES[6], serviceId: null, premiumBundle: true },
  { label: PREMIUM_PLAN_FEATURES[7], serviceId: null, premiumBundle: true },
  { label: PREMIUM_PLAN_FEATURES[8], serviceId: 3 },
  { label: PREMIUM_PLAN_FEATURES[9], serviceId: 6 },
  { label: PREMIUM_PLAN_FEATURES[10], serviceId: 7 },
] as const;

/** Flutter `subscriptionComponent.dart` / `subscription_home_page.dart` — Pro column. */
export const MOBILE_ANDROID_PRO_FEATURE_FLAGS = [
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
] as const;

/** Flutter `subscriptionComponent.dart` — Free column. */
export const MOBILE_ANDROID_FREE_FEATURE_FLAGS = [
  true,
  true,
  true,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
] as const;
