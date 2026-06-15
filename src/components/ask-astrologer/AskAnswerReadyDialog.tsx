"use client";

import {
  ASK_ASTROLOGER_SCREEN,
  ASK_ASTROLOGER_UI,
} from "@/lib/constants/chat-ask-astrologer";
import type { AskAnswerReadyDialogProps } from "@/types/ui/ask-answer-ready";

export function AskAnswerReadyDialog({
  open,
  request,
  onViewAnswer,
  onLater,
}: AskAnswerReadyDialogProps) {
  if (!open || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onLater}
        aria-label="Dismiss"
      />
      <div
        className={ASK_ASTROLOGER_UI.answerReadyPopupPanel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="answer-ready-title"
      >
        <div className={ASK_ASTROLOGER_UI.answerReadyPopupIcon} aria-hidden>
          ✓
        </div>
        <h2 id="answer-ready-title" className={ASK_ASTROLOGER_UI.answerReadyPopupTitle}>
          {ASK_ASTROLOGER_SCREEN.answerReadyPopupTitle}
        </h2>
        <p className={ASK_ASTROLOGER_UI.answerReadyPopupBody}>
          {ASK_ASTROLOGER_SCREEN.answerReadyPopupBody}
        </p>
        <p className={ASK_ASTROLOGER_UI.answerReadyPopupHint}>
          {ASK_ASTROLOGER_SCREEN.answerReadyPopupHint}
        </p>
        <p className={ASK_ASTROLOGER_UI.answerReadyPopupQuestion}>{request.user_question}</p>
        <div className={ASK_ASTROLOGER_UI.answerReadyPopupActions}>
          <button
            type="button"
            onClick={onLater}
            className={ASK_ASTROLOGER_UI.answerReadyPopupSecondaryBtn}
          >
            {ASK_ASTROLOGER_SCREEN.answerReadyPopupLaterCta}
          </button>
          <button
            type="button"
            onClick={onViewAnswer}
            className={ASK_ASTROLOGER_UI.answerReadyPopupPrimaryBtn}
          >
            {ASK_ASTROLOGER_SCREEN.answerReadyPopupViewCta}
          </button>
        </div>
      </div>
    </div>
  );
}
