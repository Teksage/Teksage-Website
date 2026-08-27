"use client";

import { useRouter } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ConsultationCheckoutDetailsPanel } from "@/components/consultation/ConsultationCheckoutDetailsPanel";
import { ConsultationCheckoutPaymentPanel } from "@/components/consultation/ConsultationCheckoutPaymentPanel";
import { ConsultationCheckoutStepIndicator } from "@/components/consultation/ConsultationCheckoutStepIndicator";
import {
  consultationAstrologerPath,
  consultationSlotsPath,
} from "@/lib/constants/consultation-routes";
import { CONSULTATION_BOOKING_SCREEN } from "@/lib/constants/consultation-booking";
import {
  CONSULTATION_CHECKOUT_LAYOUT,
  CONSULTATION_CHECKOUT_SCREEN,
} from "@/lib/constants/consultation-checkout";
import { COUPON_PROMO_COPY } from "@/lib/constants/coupon-promo";
import {
  formatConsultationCheckoutFee,
  useConsultationCheckout,
} from "@/hooks/useConsultationCheckout";

type Props = { astrologerId: number };

export function ConsultationCheckoutView({ astrologerId }: Props) {
  const CB = useI18nConstants(CONSULTATION_BOOKING_SCREEN);
  const CC = CONSULTATION_CHECKOUT_SCREEN;
  const PROMO = useI18nConstants(COUPON_PROMO_COPY);
  const router = useRouter();
  const checkout = useConsultationCheckout(astrologerId);

  if (!checkout.draft || !checkout.pricing) {
    return (
      <div className={CONSULTATION_CHECKOUT_LAYOUT.page}>
        <LoadingOverlay open />
      </div>
    );
  }

  return (
    <>
      <div className={CONSULTATION_CHECKOUT_LAYOUT.page}>
        <header className={CONSULTATION_CHECKOUT_LAYOUT.pageHeader}>
          <div className={CONSULTATION_CHECKOUT_LAYOUT.pageHeaderInner}>
            <button
              type="button"
              onClick={() => router.back()}
              className={CONSULTATION_CHECKOUT_LAYOUT.backBtn}
              aria-label="Back"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={CONSULTATION_CHECKOUT_LAYOUT.headerMain}>
              <h1 className={CONSULTATION_CHECKOUT_LAYOUT.headerTitle}>{CC.title}</h1>
              <p className={CONSULTATION_CHECKOUT_LAYOUT.headerSub}>{CC.subtitle}</p>
            </div>
            <ConsultationCheckoutStepIndicator />
          </div>
        </header>

        <div className={CONSULTATION_CHECKOUT_LAYOUT.scroll}>
          <div className={CONSULTATION_CHECKOUT_LAYOUT.inner}>
            <ConsultationCheckoutDetailsPanel
              booking={checkout.draft}
              profile={checkout.profile}
              astrologerPicture={checkout.astrologerPicture}
              langLabel={checkout.langLabel}
              focusTopics={checkout.focusTopics}
              question={checkout.question}
              birthLabels={{
                dob: CB.dob,
                tob: CB.tob,
                pob: CB.pob,
                rasi: CB.rasi,
                nakshatram: CB.nakshatram,
              }}
              onToggleFocus={checkout.toggleFocus}
              onQuestionChange={checkout.setQuestion}
              onChangeAstrologer={() => router.push(consultationAstrologerPath(astrologerId))}
              onReschedule={() => router.push(consultationSlotsPath(astrologerId))}
            />
            <ConsultationCheckoutPaymentPanel
              astrologerName={checkout.draft.astrologerName}
              currency={checkout.currency}
              totals={checkout.pricing}
              couponCode={checkout.couponCode}
              couponApplied={checkout.couponApplied}
              referralLocked={checkout.referralLocked}
              promoError={checkout.promoError}
              shareHoroscope={checkout.shareHoroscope}
              busy={checkout.busy}
              error={checkout.error}
              promoAppliedLabel={PROMO.applied}
              promoInvalidLabel={PROMO.invalidPromo}
              referralDiscountLabel={CB.referralDiscount}
              onCouponChange={checkout.onCouponChange}
              onApplyCoupon={() => void checkout.onApplyCoupon()}
              onShareChange={checkout.setShareHoroscope}
              onPay={() => void checkout.onPay()}
              formatFee={formatConsultationCheckoutFee}
            />
          </div>
        </div>
      </div>
      <LoadingOverlay open={checkout.busy} />
    </>
  );
}
