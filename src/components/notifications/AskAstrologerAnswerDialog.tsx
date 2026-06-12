"use client";

import { PageLoadingCenter } from "@/components/common/Loader";
import { VoiceAnswerPlayer } from "@/components/common/VoiceAnswerPlayer";
import { NOTIFICATIONS_UI } from "@/lib/constants/notifications-screen";
import { ASK_ANSWERED_AT_LABEL } from "@/lib/constants/datetime";
import {
  ASK_ASTROLOGER_SCREEN,
  ASK_ASTROLOGER_UI,
} from "@/lib/constants/chat-ask-astrologer";
import { formatDateTimeDMY } from "@/lib/format-datetime";
import type { AskAstrologerAnswerDialogProps } from "@/types/ui/notifications";

export function AskAstrologerAnswerDialog({
  open,
  userQuestion,
  answerText,
  answerVoiceUrl,
  answerVoiceDurationSec = null,
  answeredAt = null,
  loading = false,
  error = null,
  onClose,
}: AskAstrologerAnswerDialogProps) {
  const answeredAtLabel = formatDateTimeDMY(answeredAt);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-label="Close dialog"
      />
      <div className={ASK_ASTROLOGER_UI.dialogPanel}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-black/50 hover:bg-black/5 lg:right-4 lg:top-4"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className={NOTIFICATIONS_UI.dialogTitle}>
          {ASK_ASTROLOGER_SCREEN.askAnswerDialogTitle}
        </h2>

        {loading ? (
          <div className="py-8">
            <PageLoadingCenter />
          </div>
        ) : error ? (
          <p className="mt-4 text-sm text-[var(--color-brand-error)]">{error}</p>
        ) : (
          <div className="mt-4 space-y-4 lg:mt-5 lg:space-y-5">
            <div>
              <p className={ASK_ASTROLOGER_UI.sectionLabel}>
                {ASK_ASTROLOGER_SCREEN.askAnswerYourQuestion}
              </p>
              <p className="mt-1 text-sm text-black/80 lg:text-base">{userQuestion}</p>
            </div>

            {answerText ? (
              <div className={ASK_ASTROLOGER_UI.answerBlock}>
                <p className="whitespace-pre-wrap text-sm text-black/80 lg:text-base">
                  {answerText}
                </p>
              </div>
            ) : null}

            {answerVoiceUrl ? (
              <div>
                <p className={ASK_ASTROLOGER_UI.sectionLabel}>
                  {ASK_ASTROLOGER_SCREEN.askVoiceAnswerLabel}
                </p>
                <VoiceAnswerPlayer
                  src={answerVoiceUrl}
                  durationSec={answerVoiceDurationSec}
                  className="mt-2"
                />
              </div>
            ) : null}

            {!answerText && !answerVoiceUrl ? (
              <p className="text-sm text-black/60 lg:text-base">
                {ASK_ASTROLOGER_SCREEN.askAnswerEmpty}
              </p>
            ) : null}

            {answeredAtLabel ? (
              <p className="text-xs text-black/40 lg:text-sm">
                {ASK_ANSWERED_AT_LABEL} {answeredAtLabel}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
