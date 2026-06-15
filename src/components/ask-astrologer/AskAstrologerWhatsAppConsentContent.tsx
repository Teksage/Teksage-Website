"use client";

import { ConsultationBookingSectionDivider } from "@/components/consultation/ConsultationBookingSectionDivider";
import { WhatsAppUpdatesPhoneChoice } from "@/components/whatsapp-updates/WhatsAppUpdatesPhoneChoice";
import { WhatsAppUpdatesPhoneGate } from "@/components/whatsapp-updates/WhatsAppUpdatesPhoneGate";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import {
  ASK_ASTROLOGER_SCREEN,
  ASK_ASTROLOGER_UI,
} from "@/lib/constants/chat-ask-astrologer";
import { cn } from "@/lib/utils";
import type { AskAstrologerWhatsAppConsentContentProps } from "@/types/ui/ask-astrologer";

function WaConsentBenefit({ text }: { text: string }) {
  return (
    <li className={ASK_ASTROLOGER_UI.waConsentBenefitRow}>
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        className={ASK_ASTROLOGER_UI.waConsentBenefitIcon}
      >
        <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.12" />
        <path
          d="M5 8.2 6.8 10 11 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{text}</span>
    </li>
  );
}

export function AskAstrologerWhatsAppConsentContent({
  verified,
  phoneChoiceProps,
}: AskAstrologerWhatsAppConsentContentProps) {
  return (
    <>
      <ConsultationBookingSectionDivider title={ASK_ASTROLOGER_SCREEN.waConsentSection} />
      <div className={ASK_ASTROLOGER_UI.languageIntro}>
        <h1 className={ASK_ASTROLOGER_UI.heading}>{ASK_ASTROLOGER_SCREEN.waConsentHeading}</h1>
        <p className={ASK_ASTROLOGER_UI.subtitle}>{ASK_ASTROLOGER_SCREEN.waConsentSubtitle}</p>
      </div>
      <ul className={ASK_ASTROLOGER_UI.waConsentBenefits} aria-label="WhatsApp alert benefits">
        <WaConsentBenefit text={ASK_ASTROLOGER_SCREEN.waConsentBenefitAnswer} />
        <WaConsentBenefit text={ASK_ASTROLOGER_SCREEN.waConsentBenefitStatus} />
      </ul>
      {!verified ? (
        <div className={ASK_ASTROLOGER_UI.waConsentPhoneCard}>
          <WhatsAppUpdatesPhoneGate />
        </div>
      ) : (
        <div
          className={cn(
            CONSULTATION_BOOKING_LAYOUT.grayCard,
            ASK_ASTROLOGER_UI.waConsentPhoneCard
          )}
        >
          <WhatsAppUpdatesPhoneChoice {...phoneChoiceProps} variant="flow" />
        </div>
      )}
    </>
  );
}
