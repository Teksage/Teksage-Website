"use client";

import { useI18nConstants } from "@/hooks/useT";
import { ConsultationBookingDetailRow } from "@/components/consultation/ConsultationBookingDetailRow";
import { ConsultationBookingSectionDivider } from "@/components/consultation/ConsultationBookingSectionDivider";
import { AskAstrologerCheckoutFees } from "@/components/ask-astrologer/AskAstrologerCheckoutFees";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";
import { formatConsultationLanguageList } from "@/lib/consultation-display";
import type { AskAstrologerCheckoutContentProps } from "@/types/ui/ask-astrologer";

export function AskAstrologerCheckoutContent({
  userQuestion,
  preferredLanguages,
  pricing,
  currency,
  baseAmount,
  total,
  isINR,
}: AskAstrologerCheckoutContentProps) {
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const languagesLabel = formatConsultationLanguageList(preferredLanguages);

  return (
    <>
      <ConsultationBookingSectionDivider title={AA.checkoutQuestionSection} />
      <div className={CONSULTATION_BOOKING_LAYOUT.grayCard}>
        <div className={CONSULTATION_BOOKING_LAYOUT.detailRows}>
          <ConsultationBookingDetailRow
            label={AA.checkoutYourQuestion}
            value={userQuestion}
          />
          <ConsultationBookingDetailRow
            label={AA.checkoutLanguagesLabel}
            value={languagesLabel}
          />
          <ConsultationBookingDetailRow
            label={AA.checkoutTurnaroundLabel}
            value={AA.checkoutTurnaroundValue}
          />
        </div>
      </div>
      <ConsultationBookingSectionDivider title={AA.checkoutPaymentSection} />
      <AskAstrologerCheckoutFees
        pricing={pricing}
        currency={currency}
        baseAmount={baseAmount}
        total={total}
        isINR={isINR}
      />
    </>
  );
}
