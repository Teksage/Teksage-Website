"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import {
  CONSULTATION_BOOKING_ASSETS,
  CONSULTATION_BOOKING_LAYOUT,
  CONSULTATION_BOOKING_SCREEN,
} from "@/lib/constants/consultation-booking";
import { CONSULTATION_SCREEN } from "@/lib/constants";
import { formatFeeSlash } from "@/lib/consultation-booking-format";
import type { ConsultationCouponResult } from "@/types/consultation";

type ConsultationBookingFeesBlockProps = {
  totals: ConsultationCouponResult;
  currency: string;
  couponCode: string;
  busy: boolean;
  onCouponChange: (value: string) => void;
  onApplyCoupon: () => void;
};

export function ConsultationBookingFeesBlock({
  totals,
  currency,
  couponCode,
  busy,
  onCouponChange,
  onApplyCoupon,
}: ConsultationBookingFeesBlockProps) {
  const CB = useI18nConstants(CONSULTATION_BOOKING_SCREEN);
  const C = useI18nConstants(CONSULTATION_SCREEN);
  return (
    <div className="space-y-3">
      <div className={CONSULTATION_BOOKING_LAYOUT.promoCard}>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => onCouponChange(e.target.value)}
            placeholder={C.couponPlaceholder}
            className="min-w-0 flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm"
          />
          <button
            type="button"
            disabled={busy}
            onClick={onApplyCoupon}
            className="shrink-0 rounded-xl border border-[var(--color-consult-user-bg)] px-4 py-2.5 text-sm font-semibold text-[var(--color-consult-user-bg)]"
          >
            {C.applyCoupon}
          </button>
        </div>
      </div>
      <div className={CONSULTATION_BOOKING_LAYOUT.feeRow}>
        <span>{CB.consultationFee}</span>
        <span>{formatFeeSlash(totals.discounted_price, currency)}</span>
      </div>
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
