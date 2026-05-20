"use client";

import { CONSULTATION_CHECKOUT_LAYOUT } from "@/lib/constants/consultation-checkout";
import { CONSULTATION_SCREEN } from "@/lib/constants";
import { formatConsultationFee } from "@/lib/consultation-currency";
import type { ConsultationCheckoutPricingProps } from "@/types/ui/consultation";

export function ConsultationCheckoutPricing({
  astrologerName,
  totals,
  currency,
}: ConsultationCheckoutPricingProps) {
  return (
    <>
      <p className={CONSULTATION_CHECKOUT_LAYOUT.astrologerName}>{astrologerName}</p>
      <dl className={CONSULTATION_CHECKOUT_LAYOUT.pricingCard}>
        <div className={CONSULTATION_CHECKOUT_LAYOUT.pricingRow}>
          <dt>{CONSULTATION_SCREEN.consultationFee}</dt>
          <dd>{formatConsultationFee(totals.discounted_price, currency)}</dd>
        </div>
        {totals.discount > 0 ? (
          <div
            className={`${CONSULTATION_CHECKOUT_LAYOUT.pricingRow} text-[var(--color-brand-primary)]`}
          >
            <dt>{CONSULTATION_SCREEN.discount}</dt>
            <dd>-{formatConsultationFee(totals.discount, currency)}</dd>
          </div>
        ) : null}
        {totals.cgst > 0 ? (
          <div className={CONSULTATION_CHECKOUT_LAYOUT.pricingRow}>
            <dt>{CONSULTATION_SCREEN.cgst}</dt>
            <dd>{formatConsultationFee(totals.cgst, currency)}</dd>
          </div>
        ) : null}
        {totals.sgst > 0 ? (
          <div className={CONSULTATION_CHECKOUT_LAYOUT.pricingRow}>
            <dt>{CONSULTATION_SCREEN.sgst}</dt>
            <dd>{formatConsultationFee(totals.sgst, currency)}</dd>
          </div>
        ) : null}
        <div className={CONSULTATION_CHECKOUT_LAYOUT.pricingTotal}>
          <dt>{CONSULTATION_SCREEN.total}</dt>
          <dd>{formatConsultationFee(totals.final_price, currency)}</dd>
        </div>
      </dl>
    </>
  );
}
