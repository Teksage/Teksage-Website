"use client";

import { useI18nConstants } from "@/hooks/useT";
import { PromoCodeField } from "@/components/common/PromoCodeField";
import { COUPON_PROMO_COPY } from "@/lib/constants/coupon-promo";
import {
  SETTINGS_SUBSCRIPTION_PAYMENT,
  SUBSCRIPTION_PAYMENT_LAYOUT,
} from "@/lib/constants/settings-subscription-payment";
import type { SubscriptionPaymentFeesProps } from "@/types/ui/settings";
import { cn } from "@/lib/utils";

export function SubscriptionPaymentFees({
  totals,
  symbol,
  isInr,
  showPromo,
  promo,
  promoApplied,
  promoError,
  busy,
  referralLocked = false,
  onPromoChange,
  onApplyPromo,
}: SubscriptionPaymentFeesProps) {
  const P = useI18nConstants(SETTINGS_SUBSCRIPTION_PAYMENT);
  const promoCopy = useI18nConstants(COUPON_PROMO_COPY);

  return (
    <>
      <div className={SUBSCRIPTION_PAYMENT_LAYOUT.feeRow}>
        <span>{P.planCost}</span>
        <span>
          {symbol}
          {totals.planCost.toFixed(2)}
        </span>
      </div>
      {totals.discount > 0 ? (
        <div className={cn(SUBSCRIPTION_PAYMENT_LAYOUT.feeRow, "mt-5")}>
          <span>{referralLocked ? P.referralDiscount : P.discount}</span>
          <span>
            {symbol}
            {totals.discount.toFixed(2)}
          </span>
        </div>
      ) : null}
      {isInr ? (
        <>
          <div className={cn(SUBSCRIPTION_PAYMENT_LAYOUT.feeRow, "mt-5")}>
            <span>
              {P.cgstLabel} ({Math.round(totals.cgstPct)}%)
            </span>
            <span>
              {symbol}
              {totals.cgst.toFixed(2)}
            </span>
          </div>
          <div className={cn(SUBSCRIPTION_PAYMENT_LAYOUT.feeRow, "mt-5")}>
            <span>
              {P.sgstLabel} ({Math.round(totals.sgstPct)}%)
            </span>
            <span>
              {symbol}
              {totals.sgst.toFixed(2)}
            </span>
          </div>
        </>
      ) : null}
      {showPromo ? (
        <>
          <div className={SUBSCRIPTION_PAYMENT_LAYOUT.dashed} />
          <PromoCodeField
            variant="subscription"
            value={promo}
            applied={promoApplied}
            error={promoError}
            busy={busy}
            disabled={referralLocked}
            placeholder={P.promoPlaceholder}
            applyLabel={P.apply}
            appliedLabel={promoCopy.applied}
            savingsLabel={
              promoApplied
                ? referralLocked
                  ? promoCopy.referralSaved
                  : promoCopy.consultationSaved
                : undefined
            }
            savingsAmount={promoApplied ? totals.discount : null}
            currencySymbol={symbol}
            onChange={onPromoChange}
            onApply={onApplyPromo}
          />
        </>
      ) : null}
      <div className={SUBSCRIPTION_PAYMENT_LAYOUT.dashed} />
      <div className={SUBSCRIPTION_PAYMENT_LAYOUT.feeTotalRow}>
        <span className="text-base">{P.totalCost}</span>
        <span className={SUBSCRIPTION_PAYMENT_LAYOUT.feeTotalValue}>
          {symbol}
          {totals.total.toFixed(2)}
        </span>
      </div>
    </>
  );
}
