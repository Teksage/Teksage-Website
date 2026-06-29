"use client";

import { useI18nConstants } from "@/hooks/useT";
import { ConsultationLanguageField } from "@/components/consultation/ConsultationLanguageField";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import { CONSULTATION_LANGUAGES } from "@/lib/constants";
import { ASK_ASTROLOGER_SCREEN, ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";
import { cn } from "@/lib/utils";
import type { AskAstrologerLanguagesContentProps } from "@/types/ui/ask-astrologer";

export function AskAstrologerLanguagesContent({
  userQuestion,
  primary,
  firstError,
  onPrimaryChange,
}: AskAstrologerLanguagesContentProps) {
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);

  return (
    <>
      <div className={cn(CONSULTATION_BOOKING_LAYOUT.grayCard, ASK_ASTROLOGER_UI.languageQuestionCard)}>
        <p className={ASK_ASTROLOGER_UI.sectionLabel}>
          {AA.checkoutYourQuestion}
        </p>
        <p className={cn(ASK_ASTROLOGER_UI.languageQuestionText, "mt-2")}>{userQuestion}</p>
      </div>
      <div className={ASK_ASTROLOGER_UI.languageIntro}>
        <h1 className={ASK_ASTROLOGER_UI.heading}>
          {AA.languageHeading}
        </h1>
        <p className={ASK_ASTROLOGER_UI.subtitle}>
          {AA.languageSubtitle}
        </p>
      </div>
      <div className={cn(CONSULTATION_BOOKING_LAYOUT.grayCard, ASK_ASTROLOGER_UI.languageFields)}>
        <ConsultationLanguageField
          title={AA.languageFieldLabel}
          value={primary}
          options={CONSULTATION_LANGUAGES}
          enabled
          compact
          error={firstError}
          onChange={onPrimaryChange}
        />
      </div>
      <div className={ASK_ASTROLOGER_UI.languageNotesList}>
        <p className={ASK_ASTROLOGER_UI.languageNotesTitle}>
          {AA.languageNotesHeading}
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          {AA.languageNotes.map((note) => (
            <li key={note} className={ASK_ASTROLOGER_UI.languageNotesItem}>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
