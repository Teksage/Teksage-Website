import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { selectDisplayPremiumPlans } from "@/lib/subscription-plans";
import type {
  RazorpayOrderPayload,
  SubscriptionCouponResult,
  SubscriptionPlan,
} from "@/types/settings";

function parsePlan(raw: Record<string, unknown>): SubscriptionPlan | null {
  const planId = Number(raw.plan_id);
  if (!Number.isFinite(planId)) return null;
  return {
    planId,
    planName: String(raw.plan_name ?? "Plan"),
    localPlanPrice: Number(raw.local_plan_price ?? 0),
    foreignPlanPrice: Number(raw.foreign_plan_price ?? 0),
    localTotalAmount: Number(raw.local_total_amount ?? 0),
    foreignTotalAmount: Number(raw.foreign_total_amount ?? 0),
    cgstAmount: Number(raw.cgst ?? 0),
    sgstAmount: Number(raw.sgst ?? 0),
    cgstPercentage: Number(raw.cgst_percentage ?? 0),
    sgstPercentage: Number(raw.sgst_percentage ?? 0),
    planType: String(raw.plan_type ?? ""),
    tenureValue: Number(raw.tenure_value ?? 0),
    tenureCount: String(raw.tenure_count ?? ""),
    osType: String(raw.os_type ?? ""),
  };
}

/** Uses public list API (tax-enriched). Single-plan GET is admin-only and omits GST. */
export async function fetchPremiumPlanById(
  planId: number
): Promise<SubscriptionPlan | null> {
  const plans = await fetchPremiumPlans();
  return plans.find((p) => p.planId === planId) ?? null;
}

function parseCatalogPlans(data: unknown): SubscriptionPlan[] {
  if (!Array.isArray(data)) return [];
  return data
    .map((row) => parsePlan(row as Record<string, unknown>))
    .filter((p): p is SubscriptionPlan => p != null);
}

export async function fetchPremiumPlans(): Promise<SubscriptionPlan[]> {
  const { data } = await http.get<Record<string, unknown>[]>(
    API_ENDPOINTS.serviceCatalogs
  );
  return selectDisplayPremiumPlans(parseCatalogPlans(data));
}

export async function applySubscriptionCoupon(body: {
  coupon_name: string;
  plan_id: number;
  currency: string;
  amount: number;
}): Promise<SubscriptionCouponResult> {
  const { data } = await http.post<SubscriptionCouponResult>(
    API_ENDPOINTS.paymentApplyCoupon,
    {
      coupon_name: body.coupon_name,
      plan_id: body.plan_id,
      currency: body.currency,
      type: "subscription",
      amount: body.amount,
    }
  );
  return data;
}

export async function initiateSubscriptionPayment(body: {
  planId: number;
  paymentAmount: number;
  currency: string;
  couponId?: string | null;
}): Promise<RazorpayOrderPayload> {
  const { data } = await http.post<{ data?: RazorpayOrderPayload }>(
    API_ENDPOINTS.paymentSubscribe,
    {
      plan_id: body.planId,
      payment_amount: body.paymentAmount,
      currency: body.currency,
      coupon_id: body.couponId ?? null,
    }
  );
  if (!data?.data?.id) throw new Error("Could not start subscription payment");
  return data.data;
}

export async function verifySubscriptionPayment(body: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<{ status?: string; message?: string }> {
  const { data } = await http.post<{ status?: string; message?: string }>(
    API_ENDPOINTS.paymentVerify,
    body
  );
  return data ?? {};
}
