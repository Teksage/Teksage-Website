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
  disabled = false,
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
  const locked = disabled || busy;

  let wrapClass: string = isSubscription
    ? applied
      ? L.subscriptionWrapApplied
      : L.subscriptionWrap
    : applied
      ? L.consultationWrapApplied
      : L.consultationWrap;

  if (!isSubscription && disabled) {
    wrapClass = L.consultationWrapDisabled;
  }

  const showSavings =
    variant === "consultation" &&
    !disabled &&
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
          onChange={(e) => {
            if (disabled) return;
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          disabled={locked}
          readOnly={disabled}
          className={isSubscription ? L.subscriptionInput : L.consultationInput}
        />
        <button
          type="button"
          disabled={locked || applied}
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
