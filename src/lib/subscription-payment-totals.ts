import type { SubscriptionCouponResult, SubscriptionPlan } from "@/types/settings";

/** Mirrors backend `settings.CGST` / `settings.SGST` (9% each). */
const INR_CGST_PCT = 9;
const INR_SGST_PCT = 9;

export type PaymentTotals = {
  planCost: number;
  discount: number;
  cgst: number;
  sgst: number;
  cgstPct: number;
  sgstPct: number;
  total: number;
  couponId: string;
};

/** Ensure plan has tax lines — list API enriches; single-plan GET does not. */
function enrichSubscriptionPlan(
  plan: SubscriptionPlan,
  currency: "INR" | "USD"
): SubscriptionPlan {
  const base = currency === "INR" ? plan.localPlanPrice : plan.foreignPlanPrice;
  if (currency === "INR") {
    const cgstPct = plan.cgstPercentage > 0 ? plan.cgstPercentage : INR_CGST_PCT;
    const sgstPct = plan.sgstPercentage > 0 ? plan.sgstPercentage : INR_SGST_PCT;
    const cgst =
      plan.cgstAmount > 0 ? plan.cgstAmount : (base * cgstPct) / 100;
    const sgst =
      plan.sgstAmount > 0 ? plan.sgstAmount : (base * sgstPct) / 100;
    const total =
      plan.localTotalAmount > 0
        ? plan.localTotalAmount
        : base + cgst + sgst;
    return {
      ...plan,
      cgstPercentage: cgstPct,
      sgstPercentage: sgstPct,
      cgstAmount: cgst,
      sgstAmount: sgst,
      localTotalAmount: total,
    };
  }
  const total =
    plan.foreignTotalAmount > 0 ? plan.foreignTotalAmount : base;
  return { ...plan, foreignTotalAmount: total };
}

export function totalsFromPlan(
  plan: SubscriptionPlan,
  currency: "INR" | "USD"
): PaymentTotals {
  const enriched = enrichSubscriptionPlan(plan, currency);
  const planCost =
    currency === "INR" ? enriched.localPlanPrice : enriched.foreignPlanPrice;
  const total =
    currency === "INR"
      ? enriched.localTotalAmount
      : enriched.foreignTotalAmount;
  return {
    planCost,
    discount: 0,
    cgst: enriched.cgstAmount,
    sgst: enriched.sgstAmount,
    cgstPct: enriched.cgstPercentage,
    sgstPct: enriched.sgstPercentage,
    total,
    couponId: "",
  };
}

export function totalsFromCoupon(c: SubscriptionCouponResult): PaymentTotals {
  return {
    planCost: c.plan_price,
    discount: c.discount,
    cgst: c.cgst,
    sgst: c.sgst,
    cgstPct: c.cgst_percentage,
    sgstPct: c.sgst_percentage,
    total: c.final_price,
    couponId: c.coupon_id > 0 ? String(c.coupon_id) : "",
  };
}
