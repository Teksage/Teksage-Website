"use client";

import { useRouter } from "next/navigation";
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

  return (
    <>
      <ConsultationBookingSectionDivider title={ASK_ASTROLOGER_SCREEN.confirmationSection} />
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
        <h1 className={ASK_ASTROLOGER_UI.heading}>{ASK_ASTROLOGER_SCREEN.confirmationHeading}</h1>
        <p className={ASK_ASTROLOGER_UI.subtitle}>{ASK_ASTROLOGER_SCREEN.confirmationBody}</p>
      </div>
      <div className={cn(CONSULTATION_BOOKING_LAYOUT.grayCard, ASK_ASTROLOGER_UI.confirmationCard)}>
        <div className={CONSULTATION_BOOKING_LAYOUT.detailRows}>
          <ConsultationBookingDetailRow
            label={ASK_ASTROLOGER_SCREEN.confirmationStatusLabel}
            value={ASK_ASTROLOGER_SCREEN.confirmationStatusValue}
          />
          <ConsultationBookingDetailRow
            label={ASK_ASTROLOGER_SCREEN.checkoutTurnaroundLabel}
            value={ASK_ASTROLOGER_SCREEN.checkoutTurnaroundValue}
          />
        </div>
        <button
          type="button"
          onClick={() => router.push(`${ROUTES.notifications}?tab=consultation`)}
          className={ASK_ASTROLOGER_UI.confirmationTrackLink}
        >
          {ASK_ASTROLOGER_SCREEN.confirmationNotificationsLink}
        </button>
      </div>
    </>
  );
}
