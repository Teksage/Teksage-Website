import { SUBSCRIPTION_AUTO_PAY_PLAN_ID } from "@/lib/constants/settings-subscriptions";

export function isAutoPayEligiblePlan(
  planId: number,
  currency: "INR" | "USD"
): boolean {
  return planId === SUBSCRIPTION_AUTO_PAY_PLAN_ID && currency === "INR";
}

export function isActiveAutoPaySubscription(
  subscription: {
    isAutoPay?: boolean;
    autoPayStatus?: string | null;
  } | null | undefined
): boolean {
  if (!subscription?.isAutoPay) return false;
  return (subscription.autoPayStatus ?? "").toLowerCase() === "active";
}

/** Flutter `paymentSummary.dart` — no promo on monthly plan or auto-renew checkout. */
export function isSubscriptionCouponAllowed(
  planId: number,
  autoPayEnabled: boolean
): boolean {
  return planId !== SUBSCRIPTION_AUTO_PAY_PLAN_ID && !autoPayEnabled;
}
