"use client";

import { useRouter } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
import { ConsultationBookingDetailRow } from "@/components/consultation/ConsultationBookingDetailRow";
import { ConsultationBookingSectionDivider } from "@/components/consultation/ConsultationBookingSectionDivider";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import { ROUTES } from "@/lib/constants/routes";
import {
  ASK_ASTROLOGER_SCREEN,
  ASK_ASTROLOGER_UI,
} from "@/lib/constants/chat-ask-astrologer";
import { cn } from "@/lib/utils";

export function AskAstrologerConfirmationContent() {
  const router = useRouter();
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);

  return (
    <>
      <ConsultationBookingSectionDivider title={AA.confirmationSection} />
      <div className={ASK_ASTROLOGER_UI.confirmationIntro}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={ASK_ASTROLOGER_UI.confirmationCheck}
          aria-hidden
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <h1 className={ASK_ASTROLOGER_UI.heading}>{AA.confirmationHeading}</h1>
        <p className={ASK_ASTROLOGER_UI.subtitle}>{AA.confirmationBody}</p>
      </div>
      <div className={cn(CONSULTATION_BOOKING_LAYOUT.grayCard, ASK_ASTROLOGER_UI.confirmationCard)}>
        <div className={CONSULTATION_BOOKING_LAYOUT.detailRows}>
          <ConsultationBookingDetailRow
            label={AA.confirmationStatusLabel}
            value={AA.confirmationStatusValue}
          />
          <ConsultationBookingDetailRow
            label={AA.checkoutTurnaroundLabel}
            value={AA.checkoutTurnaroundValue}
          />
        </div>
        <button
          type="button"
          onClick={() => router.push(`${ROUTES.notifications}?tab=consultation`)}
          className={ASK_ASTROLOGER_UI.confirmationTrackLink}
        >
          {AA.confirmationNotificationsLink}
        </button>
      </div>
    </>
  );
}
