"use client";

import { ConsultationBookingProfileHeader } from "@/components/consultation/ConsultationBookingProfileHeader";
import { ConsultationBookingSectionDivider } from "@/components/consultation/ConsultationBookingSectionDivider";
import { ConsultationLanguageField } from "@/components/consultation/ConsultationLanguageField";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import { PUBLIC_ASSETS } from "@/lib/constants/assets";
import { CONSULTATION_LANGUAGES } from "@/lib/constants";
import { ASK_ASTROLOGER_SCREEN, ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";
import { cn } from "@/lib/utils";
import type { AskAstrologerLanguagesContentProps } from "@/types/ui/ask-astrologer";

export function AskAstrologerLanguagesContent({
  primary,
  secondary,
  firstError,
  secondError,
  onPrimaryChange,
  onSecondaryChange,
}: AskAstrologerLanguagesContentProps) {
  return (
    <>
      <ConsultationBookingProfileHeader
        name={ASK_ASTROLOGER_SCREEN.serviceProfileName}
        picture={PUBLIC_ASSETS.appLogo}
        imageVariant="logo"
      />
      <ConsultationBookingSectionDivider title={ASK_ASTROLOGER_SCREEN.languageSection} />
      <div className={ASK_ASTROLOGER_UI.languageIntro}>
        <h1 className={ASK_ASTROLOGER_UI.heading}>
          {ASK_ASTROLOGER_SCREEN.languageHeading}
        </h1>
        <p className={ASK_ASTROLOGER_UI.subtitle}>
          {ASK_ASTROLOGER_SCREEN.languageSubtitle}
        </p>
      </div>
      <div className={cn(CONSULTATION_BOOKING_LAYOUT.grayCard, ASK_ASTROLOGER_UI.languageFields)}>
        <div className={ASK_ASTROLOGER_UI.languageCardGrid}>
          <ConsultationLanguageField
            title={ASK_ASTROLOGER_SCREEN.languageFirst}
            value={primary}
            options={CONSULTATION_LANGUAGES}
            enabled
            compact
            error={firstError}
            onChange={onPrimaryChange}
          />
          <ConsultationLanguageField
            title={ASK_ASTROLOGER_SCREEN.languageSecond}
            value={secondary}
            options={CONSULTATION_LANGUAGES.filter((l) => l.id !== primary)}
            enabled={Boolean(primary)}
            compact
            error={secondError}
            onChange={onSecondaryChange}
          />
        </div>
      </div>
    </>
  );
}
