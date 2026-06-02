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
