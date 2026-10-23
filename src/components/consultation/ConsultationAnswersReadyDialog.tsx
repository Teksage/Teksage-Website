"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  CONSULTATION_ANSWERS_READY_POPUP,
  CONSULTATION_ANSWERS_READY_UI,
} from "@/lib/constants/consultation-answers-ready";
import type { ConsultationAnswersReadyDialogProps } from "@/types/ui/consultation-answers-ready";

export function ConsultationAnswersReadyDialog({
  open,
  event,
  onViewAnswers,
  onLater,
}: ConsultationAnswersReadyDialogProps) {
  const P = useI18nConstants(CONSULTATION_ANSWERS_READY_POPUP);
  if (!open || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onLater}
        aria-label="Dismiss"
      />
      <div
        className={CONSULTATION_ANSWERS_READY_UI.popupPanel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-answers-ready-title"
      >
        <div className={CONSULTATION_ANSWERS_READY_UI.popupIcon} aria-hidden>
          ✓
        </div>
        <h2
          id="consultation-answers-ready-title"
          className={CONSULTATION_ANSWERS_READY_UI.popupTitle}
        >
          {P.title}
        </h2>
        <p className={CONSULTATION_ANSWERS_READY_UI.popupBody}>{P.body}</p>
        <p className={CONSULTATION_ANSWERS_READY_UI.popupHint}>{P.hint}</p>
        <p className={CONSULTATION_ANSWERS_READY_UI.popupAstro}>
          {event.astrologerName}
        </p>
        <div className={CONSULTATION_ANSWERS_READY_UI.popupActions}>
          <button
            type="button"
            onClick={onLater}
            className={CONSULTATION_ANSWERS_READY_UI.popupSecondaryBtn}
          >
            {P.laterCta}
          </button>
          <button
            type="button"
            onClick={onViewAnswers}
            className={CONSULTATION_ANSWERS_READY_UI.popupPrimaryBtn}
          >
            {P.viewCta}
          </button>
        </div>
      </div>
    </div>
  );
}
