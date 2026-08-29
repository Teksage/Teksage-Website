import type { PartnerDiscountState } from "@/types/partner-referral";
import { PARTNER_REFERRAL_UI } from "@/lib/constants/partner-referral";

/** Backend yearly plan that receives partner yearly %. */
export const PARTNER_YEARLY_PLAN_ID = 3 as const;

/** Active consultation partner % for checkout auto-apply. */
export function partnerConsultPct(
  discount?: PartnerDiscountState | null
): number {
  if (discount?.codeActive === false) return 0;
  if (!discount?.showConsultationRow) return 0;
  return Math.max(0, Number(discount.consultPct) || 0);
}

/** Active yearly (plan 3) partner % for checkout auto-apply. */
export function partnerYearlyPct(
  discount?: PartnerDiscountState | null,
  planId?: number
): number {
  if (planId !== PARTNER_YEARLY_PLAN_ID) return 0;
  if (discount?.codeActive === false) return 0;
  if (!discount?.showSubscriptionRow) return 0;
  return Math.max(0, Number(discount.yearlyPct) || 0);
}

export const PARTNER_CHECKOUT_CODE = PARTNER_REFERRAL_UI.checkoutCodeLabel;
