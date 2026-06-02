import type { SubscriptionPlan } from "@/types/settings";

/**
 * Mirrors Flutter `fetchPremiumPlans`:
 *   plans.where((plan) => plan.serviceType == 'premium')
 *        .where((plan) => plan.os == 'android')
 *        .sort by localPlanPrice
 *
 * No price- or tenure-based exclusions — whatever android premium rows
 * exist in the database is exactly what the web shows.
 */
export function selectDisplayPremiumPlans(
  catalog: SubscriptionPlan[]
): SubscriptionPlan[] {
  return catalog
    .filter(
      (p) =>
        p.planType.toLowerCase() === "premium" &&
        p.osType.toLowerCase() === "android"
    )
    .sort((a, b) => a.localPlanPrice - b.localPlanPrice);
}
