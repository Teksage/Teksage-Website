import {
  formatConsultationCategoryLabel,
  consultationAstrologerName,
} from "@/lib/consultation-display";
import {
  consultationFeeForAstrologer,
  type ConsultationCurrency,
} from "@/lib/consultation-currency";
import { initialConsultationPricing } from "@/lib/consultation-pricing";
import {
  PARTNER_CHECKOUT_CODE,
  partnerConsultPct,
} from "@/lib/partner-discount";
import { fetchAstrologerDetail } from "@/lib/services/consultation";
import { fetchPartnerMyDiscount } from "@/lib/services/partner-discount-api";
import { fetchProfile } from "@/lib/services/profile";
import type { ConsultationBookingDraft, ConsultationCouponResult } from "@/types/consultation";
import type { UserProfile } from "@/types";

export type ConsultationCheckoutLoadResult = {
  draft: ConsultationBookingDraft;
  profile: UserProfile;
  astrologerPicture: string | null;
  focusTopics: string[];
  pricing: ConsultationCouponResult;
  partnerCouponApplied: boolean;
};

export async function loadConsultationCheckoutData(
  draft: ConsultationBookingDraft,
  astrologerId: number,
  currency: ConsultationCurrency
): Promise<ConsultationCheckoutLoadResult> {
  const [detail, userProfile, liveDiscount] = await Promise.all([
    fetchAstrologerDetail(astrologerId),
    fetchProfile(),
    fetchPartnerMyDiscount().catch(() => null),
  ]);
  const fee = consultationFeeForAstrologer(detail.astrologer, currency);
  const partnerPct = partnerConsultPct(liveDiscount ?? userProfile.partnerDiscount);
  const pricing = initialConsultationPricing(fee, currency, partnerPct);

  return {
    draft: {
      ...draft,
      currency,
      fee,
      astrologerName:
        consultationAstrologerName(detail.astrologer.user) || draft.astrologerName || "",
      astrologerPicture: detail.astrologer.picture ?? draft.astrologerPicture,
    },
    profile: userProfile,
    astrologerPicture: detail.astrologer.picture ?? null,
    focusTopics: draft.categories.map((c) => formatConsultationCategoryLabel(c)).slice(0, 3),
    pricing,
    partnerCouponApplied: partnerPct > 0,
  };
}

export { PARTNER_CHECKOUT_CODE };
