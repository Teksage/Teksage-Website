"use client";

import Image from "next/image";
import {
  CONSULTATION_BOOKING_ASSETS,
  CONSULTATION_BOOKING_LAYOUT,
} from "@/lib/constants/consultation-booking";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
import { formatConsultationFee } from "@/lib/consultation-currency";
import type { AskAstrologerCheckoutFeesProps } from "@/types/ui/ask-astrologer";

/** Fee breakdown — matches `ConsultationBookingFeesBlock` layout (no outer card). */
export function AskAstrologerCheckoutFees({
  pricing,
  currency,
  baseAmount,
  total,
  isINR,
}: AskAstrologerCheckoutFeesProps) {
  return (
    <div className="space-y-3">
      <div className={CONSULTATION_BOOKING_LAYOUT.feeRow}>
        <span>{ASK_ASTROLOGER_SCREEN.checkoutFeeLabel}</span>
        <span>{formatConsultationFee(baseAmount, currency)}</span>
      </div>
      {isINR ? (
        <>
          <div className={CONSULTATION_BOOKING_LAYOUT.feeRow}>
            <span>
              {ASK_ASTROLOGER_SCREEN.checkoutCgstLabel} ({pricing.cgst_percentage}%)
            </span>
            <span>{formatConsultationFee(pricing.cgst, currency)}</span>
          </div>
          <div className={CONSULTATION_BOOKING_LAYOUT.feeRow}>
            <span>
              {ASK_ASTROLOGER_SCREEN.checkoutSgstLabel} ({pricing.sgst_percentage}%)
            </span>
            <span>{formatConsultationFee(pricing.sgst, currency)}</span>
          </div>
        </>
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
        <span>{ASK_ASTROLOGER_SCREEN.checkoutTotalLabel}</span>
        <span>{formatConsultationFee(total, currency)}</span>
      </div>
    </div>
  );
}
