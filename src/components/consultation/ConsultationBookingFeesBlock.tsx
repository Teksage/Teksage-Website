"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { PromoCodeField } from "@/components/common/PromoCodeField";
import {
  CONSULTATION_BOOKING_ASSETS,
  CONSULTATION_BOOKING_LAYOUT,
  CONSULTATION_BOOKING_SCREEN,
} from "@/lib/constants/consultation-booking";
import { CONSULTATION_SCREEN } from "@/lib/constants";
import { COUPON_PROMO_COPY } from "@/lib/constants/coupon-promo";
import { formatFeeSlash } from "@/lib/consultation-booking-format";
import type { ConsultationBookingFeesBlockProps } from "@/types/ui/consultation";

export function ConsultationBookingFeesBlock({
  totals,
  currency,
  couponCode,
  couponApplied,
  referralLocked = false,
  promoError,
  busy,
  onCouponChange,
  onApplyCoupon,
}: ConsultationBookingFeesBlockProps) {
  const CB = useI18nConstants(CONSULTATION_BOOKING_SCREEN);
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const PROMO = useI18nConstants(COUPON_PROMO_COPY);
  const hasDiscount = totals.discount > 0;
  /** Original fee before discount — tax is on discounted amount. */
  const baseFee = totals.plan_price > 0 ? totals.plan_price : totals.discounted_price;

  return (
    <div className="space-y-3">
      <div className={CONSULTATION_BOOKING_LAYOUT.promoCard}>
        <PromoCodeField
          variant="consultation"
          value={couponCode}
          applied={couponApplied}
          error={promoError}
          busy={busy}
          disabled={referralLocked}
          placeholder={C.couponPlaceholder}
          applyLabel={C.applyCoupon}
          appliedLabel={PROMO.applied}
          onChange={onCouponChange}
          onApply={onApplyCoupon}
        />
      </div>
      <div className={CONSULTATION_BOOKING_LAYOUT.feeRow}>
        <span>{CB.consultationFee}</span>
        <span>{formatFeeSlash(baseFee, currency)}</span>
      </div>
      {hasDiscount ? (
        <div className={CONSULTATION_BOOKING_LAYOUT.feeDiscountRow}>
          <span>{referralLocked ? CB.referralDiscount : C.discount}</span>
          <span>-{formatFeeSlash(totals.discount, currency)}</span>
        </div>
      ) : null}
      {totals.cgst > 0 ? (
        <div className={CONSULTATION_BOOKING_LAYOUT.feeRow}>
          <span>{C.cgst}</span>
          <span>{formatFeeSlash(totals.cgst, currency)}</span>
        </div>
      ) : null}
      {totals.sgst > 0 ? (
        <div className={CONSULTATION_BOOKING_LAYOUT.feeRow}>
          <span>{C.sgst}</span>
          <span>{formatFeeSlash(totals.sgst, currency)}</span>
        </div>
      ) : null}
      <Image
        src={CONSULTATION_BOOKING_ASSETS.dashedLine}
        alt=""
        width={280}
        height={4}
        unoptimized
        className={CONSULTATION_BOOKING_LAYOUT.dashed}
        aria-hidden
      />
      <div className={CONSULTATION_BOOKING_LAYOUT.feeTotalRow}>
        <span>{CB.totalFee}</span>
        <span>{formatFeeSlash(totals.final_price, currency)}</span>
      </div>
    </div>
  );
}
