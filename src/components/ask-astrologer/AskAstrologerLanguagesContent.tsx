"use client";

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
  return (
    <>
      <div className={cn(CONSULTATION_BOOKING_LAYOUT.grayCard, ASK_ASTROLOGER_UI.languageQuestionCard)}>
        <p className={ASK_ASTROLOGER_UI.sectionLabel}>
          {ASK_ASTROLOGER_SCREEN.checkoutYourQuestion}
        </p>
        <p className={cn(ASK_ASTROLOGER_UI.languageQuestionText, "mt-2")}>{userQuestion}</p>
      </div>
      <div className={ASK_ASTROLOGER_UI.languageIntro}>
        <h1 className={ASK_ASTROLOGER_UI.heading}>
          {ASK_ASTROLOGER_SCREEN.languageHeading}
        </h1>
        <p className={ASK_ASTROLOGER_UI.subtitle}>
          {ASK_ASTROLOGER_SCREEN.languageSubtitle}
        </p>
      </div>
      <div className={cn(CONSULTATION_BOOKING_LAYOUT.grayCard, ASK_ASTROLOGER_UI.languageFields)}>
        <ConsultationLanguageField
          title={ASK_ASTROLOGER_SCREEN.languageFieldLabel}
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
          {ASK_ASTROLOGER_SCREEN.languageNotesHeading}
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          {ASK_ASTROLOGER_SCREEN.languageNotes.map((note) => (
            <li key={note} className={ASK_ASTROLOGER_UI.languageNotesItem}>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
