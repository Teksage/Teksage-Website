"use client";

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
  const languagesLabel = formatConsultationLanguageList(preferredLanguages);

  return (
    <>
      <ConsultationBookingSectionDivider title={ASK_ASTROLOGER_SCREEN.checkoutQuestionSection} />
      <div className={CONSULTATION_BOOKING_LAYOUT.grayCard}>
        <div className={CONSULTATION_BOOKING_LAYOUT.detailRows}>
          <ConsultationBookingDetailRow
            label={ASK_ASTROLOGER_SCREEN.checkoutYourQuestion}
            value={userQuestion}
          />
          <ConsultationBookingDetailRow
            label={ASK_ASTROLOGER_SCREEN.checkoutLanguagesLabel}
            value={languagesLabel}
          />
          <ConsultationBookingDetailRow
            label={ASK_ASTROLOGER_SCREEN.checkoutTurnaroundLabel}
            value={ASK_ASTROLOGER_SCREEN.checkoutTurnaroundValue}
          />
        </div>
      </div>
      <ConsultationBookingSectionDivider title={ASK_ASTROLOGER_SCREEN.checkoutPaymentSection} />
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
