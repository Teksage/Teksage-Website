"use client";

import {
  CONSULTATION_CHECKOUT_LAYOUT,
  CONSULTATION_CHECKOUT_SCREEN,
} from "@/lib/constants/consultation-checkout";
import type { ConsultationCheckoutPaymentPanelProps } from "@/types/ui/consultation";

function formatNameCopy(template: string, name: string): string {
  return template.replace("{name}", name);
}

export function ConsultationCheckoutPaymentPanel({
  astrologerName,
  currency,
  totals,
  couponCode,
  couponApplied,
  referralLocked,
  promoError,
  shareHoroscope,
  busy,
  error,
  promoAppliedLabel,
  promoInvalidLabel,
  referralDiscountLabel,
  onCouponChange,
  onApplyCoupon,
  onShareChange,
  onPay,
  formatFee,
}: ConsultationCheckoutPaymentPanelProps) {
  const CC = CONSULTATION_CHECKOUT_SCREEN;
  const L = CONSULTATION_CHECKOUT_LAYOUT;
  const hasDiscount = totals.discount > 0;
  const baseFee = totals.plan_price > 0 ? totals.plan_price : totals.discounted_price;
  const payLabel = CC.paySecurely.replace("{amount}", formatFee(totals.final_price, currency));

  return (
    <div className={L.rightCol}>
      <div className={L.payCard}>
        <h2 className={L.payCardTitle}>{CC.paymentSummaryTitle}</h2>

        <div className={L.promoRow}>
          <input
            type="text"
            value={couponCode}
            onChange={(e) => onCouponChange(e.target.value)}
            placeholder={CC.promoPlaceholder}
            disabled={referralLocked}
            className={L.promoInput}
          />
          <button
            type="button"
            disabled={busy || !couponCode.trim() || referralLocked}
            onClick={onApplyCoupon}
            className={L.promoBtn}
          >
            {couponApplied ? promoAppliedLabel : CC.applyBtn}
          </button>
        </div>
        {promoError ? <p className={L.promoError}>{promoError}</p> : null}

        <div className={L.feeRow}>
          <span>{CC.consultationFeeLabel}</span>
          <span className="font-semibold">{formatFee(baseFee, currency)}</span>
        </div>
        {hasDiscount ? (
          <div className={L.feeDiscountRow}>
            <span>{referralLocked ? referralDiscountLabel : "Discount"}</span>
            <span>-{formatFee(totals.discount, currency)}</span>
          </div>
        ) : null}
        {totals.cgst > 0 ? (
          <div className={L.feeRow}>
            <span>
              CGST {totals.cgst_percentage}%
            </span>
            <span>{formatFee(totals.cgst, currency)}</span>
          </div>
        ) : null}
        {totals.sgst > 0 ? (
          <div className={L.feeRow}>
            <span>
              SGST {totals.sgst_percentage}%
            </span>
            <span>{formatFee(totals.sgst, currency)}</span>
          </div>
        ) : null}
        <div className={L.feeDivider} />
        <div className={L.feeTotalRow}>
          <span>{CC.totalPayableLabel}</span>
          <span>{formatFee(totals.final_price, currency)}</span>
        </div>

        <label className={L.consentRow}>
          <input
            type="checkbox"
            checked={shareHoroscope}
            onChange={(e) => onShareChange(e.target.checked)}
            className={L.consentCheck}
          />
          <span className={L.consentText}>{CC.consentText}</span>
        </label>
        {error ? <p className={L.error}>{error}</p> : null}
        {!shareHoroscope && !error ? (
          <p className={L.consentHint}>{CC.consentHint}</p>
        ) : null}

        <button
          type="button"
          disabled={busy || !shareHoroscope}
          className={L.payBtn}
          onClick={onPay}
        >
          {busy ? CC.processingCta : payLabel}
        </button>
      </div>

      <div className={L.trustCard}>
        <div className={L.trustList}>
          {CC.trustPoints.map((point, index) => (
            <div key={index} className={L.trustRow}>
              <span className={L.trustIcon} aria-hidden>
                ✓
              </span>
              <span>{formatNameCopy(point, astrologerName)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
