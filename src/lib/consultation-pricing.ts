import type { ConsultationCouponResult } from "@/types/consultation";

/** Mirrors backend `settings.CGST` / `settings.SGST` (9% each). */
const INR_CGST_PCT = 9;
const INR_SGST_PCT = 9;

export function initialConsultationPricing(
  fee: number,
  currency: string
): ConsultationCouponResult {
  if (currency === "INR") {
    const cgst = (fee * INR_CGST_PCT) / 100;
    const sgst = (fee * INR_SGST_PCT) / 100;
    return {
      plan_price: fee,
      discount: 0,
      discounted_price: fee,
      cgst_percentage: INR_CGST_PCT,
      sgst_percentage: INR_SGST_PCT,
      cgst,
      sgst,
      final_price: fee + cgst + sgst,
    };
  }
  return {
    plan_price: fee,
    discount: 0,
    discounted_price: fee,
    cgst_percentage: 0,
    sgst_percentage: 0,
    cgst: 0,
    sgst: 0,
    final_price: fee,
  };
}

/** Base consultation fee sent to `/events/book` — matches Flutter `fee.toInt()`. */
export function consultationBookPaymentAmount(
  totals: ConsultationCouponResult
): number {
  return Math.round(totals.discounted_price);
}