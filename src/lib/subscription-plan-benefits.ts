import { SUBSCRIPTION_PLAN_FEATURE_ROWS } from "@/lib/constants/subscription-plan-features";
import type { SubscriptionPlan } from "@/types/settings";

export type SubscriptionPlanBenefitRow = {
  label: (typeof SUBSCRIPTION_PLAN_FEATURE_ROWS)[number]["label"];
  included: boolean;
};

/**
 * All 11 Flutter feature rows; checkmarks follow `plan_services` on the selected plan.
 * Rows without a service id use `premiumBundle` (chart, avatar, etc.) — included on any paid plan.
 */
export function benefitRowsForPlan(
  plan: SubscriptionPlan | null | undefined
): SubscriptionPlanBenefitRow[] {
  const ids = new Set(plan?.planServices ?? []);

  return SUBSCRIPTION_PLAN_FEATURE_ROWS.map((row) => {
    let included = false;
    if (row.serviceId != null) {
      included = ids.has(row.serviceId);
    } else if ("premiumBundle" in row && row.premiumBundle) {
      included = Boolean(plan);
    }
    return { label: row.label, included };
  });
}
