import type { SubscriptionPlan } from "@/types/settings";

/** Mirrors Flutter `durationValue` + pluralized `durationUnit`. */
export function planDurationText(plan: SubscriptionPlan): string {
  const unit = plan.tenureCount;
  if (plan.tenureValue === 1) return `${plan.tenureValue} ${unit}`;
  if (/s$/i.test(unit.trim())) return `${plan.tenureValue} ${unit}`;
  return `${plan.tenureValue} ${unit}s`;
}

export function currentPlanTenureLine(
  tenureValue: number,
  tenureUnit: string,
  planWord: string
): string {
  const unit =
    tenureValue !== 1 && tenureUnit.toLowerCase() === "month"
      ? "months"
      : tenureUnit;
  return `${tenureValue} ${unit} ${planWord}`;
}
