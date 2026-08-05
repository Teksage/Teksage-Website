import type { ConsultationCouponResult } from "@/types/consultation";

/** Mirrors backend `settings.CGST` / `settings.SGST` (9% each). */
const INR_CGST_PCT = 9;
const INR_SGST_PCT = 9;

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function initialConsultationPricing(
  fee: number,
  currency: string,
  partnerPct = 0
): ConsultationCouponResult {
  const pct = Math.max(0, Number(partnerPct) || 0);
  const discount = pct > 0 ? round2(fee * (pct / 100)) : 0;
  const discounted = round2(Math.max(0, fee - discount));
  if (currency === "INR") {
    const cgst = round2((discounted * INR_CGST_PCT) / 100);
    const sgst = round2((discounted * INR_SGST_PCT) / 100);
    return {
      plan_price: fee,
      discount,
      discounted_price: discounted,
      cgst_percentage: INR_CGST_PCT,
      sgst_percentage: INR_SGST_PCT,
      cgst,
      sgst,
      final_price: round2(discounted + cgst + sgst),
    };
  }
  return {
    plan_price: fee,
    discount,
    discounted_price: discounted,
    cgst_percentage: 0,
    sgst_percentage: 0,
    cgst: 0,
    sgst: 0,
    final_price: discounted,
  };
}

/** Base consultation fee sent to `/events/book` — matches Flutter `fee.toInt()`. */
export function consultationBookPaymentAmount(
  totals: ConsultationCouponResult
): number {
  return Math.round(totals.discounted_price);
}
