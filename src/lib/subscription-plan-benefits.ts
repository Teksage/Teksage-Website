import {
  MOBILE_ANDROID_FREE_FEATURE_FLAGS,
  MOBILE_ANDROID_PRO_FEATURE_FLAGS,
  SUBSCRIPTION_PLAN_FEATURE_ROWS,
} from "@/lib/constants/subscription-plan-features";
import type { SubscriptionPlan } from "@/types/settings";

export type SubscriptionPlanBenefitRow = {
  label: (typeof SUBSCRIPTION_PLAN_FEATURE_ROWS)[number]["label"];
  included: boolean;
};

export type SubscriptionPlanCompareRow = {
  label: (typeof SUBSCRIPTION_PLAN_FEATURE_ROWS)[number]["label"];
  proIncluded: boolean;
  freeIncluded: boolean;
};

/**
 * Flutter upgrade / plan picker — `proFeatures` (all checked for any premium plan).
 * Does not use `plan_services`; mobile UI is static.
 */
export function benefitRowsForPlan(
  plan: SubscriptionPlan | null | undefined
): SubscriptionPlanBenefitRow[] {
  if (!plan) return [];

  return SUBSCRIPTION_PLAN_FEATURE_ROWS.map((row, index) => ({
    label: row.label,
    included: MOBILE_ANDROID_PRO_FEATURE_FLAGS[index] ?? false,
  }));
}

/** Flutter `subscriptionComponent.dart` — Pro vs Free compare table. */
export function compareBenefitRows(): SubscriptionPlanCompareRow[] {
  return SUBSCRIPTION_PLAN_FEATURE_ROWS.map((row, index) => ({
    label: row.label,
    proIncluded: MOBILE_ANDROID_PRO_FEATURE_FLAGS[index] ?? false,
    freeIncluded: MOBILE_ANDROID_FREE_FEATURE_FLAGS[index] ?? false,
  }));
}
