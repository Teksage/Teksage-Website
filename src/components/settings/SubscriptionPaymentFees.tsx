"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  SETTINGS_SUBSCRIPTION_PAYMENT,
  SUBSCRIPTION_PAYMENT_LAYOUT,
} from "@/lib/constants/settings-subscription-payment";
import type { PaymentTotals } from "@/lib/subscription-payment-totals";
import { cn } from "@/lib/utils";

type SubscriptionPaymentFeesProps = {
  totals: PaymentTotals;
  symbol: string;
  isInr: boolean;
  promo: string;
  busy: boolean;
  onPromoChange: (value: string) => void;
  onApplyPromo: () => void;
};

export function SubscriptionPaymentFees({
  totals,
  symbol,
  isInr,
  promo,
  busy,
  onPromoChange,
  onApplyPromo,
}: SubscriptionPaymentFeesProps) {
  const P = useI18nConstants(SETTINGS_SUBSCRIPTION_PAYMENT);

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
          <span>{P.discount}</span>
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
      <div className={SUBSCRIPTION_PAYMENT_LAYOUT.dashed} />
      <div className={SUBSCRIPTION_PAYMENT_LAYOUT.promoWrap}>
        <input
          type="text"
          value={promo}
          onChange={(e) => onPromoChange(e.target.value)}
          placeholder={P.promoPlaceholder}
          className={SUBSCRIPTION_PAYMENT_LAYOUT.promoInput}
        />
        <button
          type="button"
          disabled={busy}
          onClick={onApplyPromo}
          className={SUBSCRIPTION_PAYMENT_LAYOUT.promoApply}
        >
          {P.apply}
        </button>
      </div>
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
