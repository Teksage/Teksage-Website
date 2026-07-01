"use client";

import {
  COUPON_PROMO_LAYOUT,
} from "@/lib/constants/coupon-promo";
import type { PromoCodeFieldProps } from "@/types/ui/coupon-promo";

export function PromoCodeField({
  variant,
  value,
  applied,
  error,
  busy,
  placeholder,
  applyLabel,
  appliedLabel,
  savingsLabel,
  savingsAmount,
  currencySymbol = "",
  onChange,
  onApply,
}: PromoCodeFieldProps) {
  const L = COUPON_PROMO_LAYOUT;
  const isSubscription = variant === "subscription";
  const wrapClass = isSubscription
    ? applied
      ? L.subscriptionWrapApplied
      : L.subscriptionWrap
    : applied
      ? L.consultationWrapApplied
      : L.consultationWrap;

  const showSavings =
    variant === "consultation" &&
    applied &&
    savingsAmount != null &&
    savingsAmount > 0 &&
    savingsLabel;

  return (
    <div>
      <div className={wrapClass}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={isSubscription ? L.subscriptionInput : L.consultationInput}
        />
        <button
          type="button"
          disabled={busy || applied}
          onClick={onApply}
          className={isSubscription ? L.subscriptionApply : L.consultationApply}
        >
          {applied ? appliedLabel : applyLabel}
        </button>
      </div>
      {showSavings ? (
        <div className={L.savedRow}>
          <span>{savingsLabel}</span>
          <span>
            {currencySymbol}
            {savingsAmount.toFixed(2)}/-
          </span>
        </div>
      ) : null}
      {!applied && error ? <p className={L.error}>{error}</p> : null}
    </div>
  );
}
