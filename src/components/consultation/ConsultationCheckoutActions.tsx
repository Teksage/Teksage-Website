"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  CONSULTATION_CHECKOUT_LAYOUT,
  CONSULTATION_CHECKOUT_SCREEN,
} from "@/lib/constants/consultation-checkout";
import { CONSULTATION_SCREEN } from "@/lib/constants";
import type { ConsultationCheckoutActionsProps } from "@/types/ui/consultation";

export function ConsultationCheckoutActions({
  couponCode,
  shareHoroscope,
  busy,
  error,
  onCouponChange,
  onApplyCoupon,
  onShareChange,
  onPay,
}: ConsultationCheckoutActionsProps) {
  const CC = useI18nConstants(CONSULTATION_CHECKOUT_SCREEN);
  const C = useI18nConstants(CONSULTATION_SCREEN);
  return (
    <>
      <div className={CONSULTATION_CHECKOUT_LAYOUT.couponRow}>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => onCouponChange(e.target.value)}
          placeholder={C.couponPlaceholder}
          className={CONSULTATION_CHECKOUT_LAYOUT.couponInput}
        />
        <button
          type="button"
          disabled={busy}
          onClick={onApplyCoupon}
          className={CONSULTATION_CHECKOUT_LAYOUT.couponBtn}
        >
          {C.applyCoupon}
        </button>
      </div>
      <label className={CONSULTATION_CHECKOUT_LAYOUT.horoscopeLabel}>
        <input
          type="checkbox"
          checked={shareHoroscope}
          onChange={(e) => onShareChange(e.target.checked)}
          className="mt-1"
        />
        <span>{C.shareHoroscope}</span>
      </label>
      {error ? <p className={CONSULTATION_CHECKOUT_LAYOUT.error}>{error}</p> : null}
      <button
        type="button"
        disabled={busy}
        className={CONSULTATION_CHECKOUT_LAYOUT.payBtn}
        onClick={onPay}
      >
        {busy ? CC.processingCta : C.payCta}
      </button>
    </>
  );
}
