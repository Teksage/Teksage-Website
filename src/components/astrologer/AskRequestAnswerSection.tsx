"use client";

import { useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { AskAnswerVoiceInput } from "@/components/astrologer/AskAnswerVoiceInput";
import { VoiceAnswerPlayer } from "@/components/common/VoiceAnswerPlayer";
import { SettingsModalDialog } from "@/components/settings/SettingsModalDialog";
import { submitAskAnswer } from "@/lib/services/astrologer-ask-requests";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import { showSuccessAppSnackBar } from "@/lib/app-snackbar";
import {
  ASK_ASTROLOGER_SCREEN,
  ASK_ASTROLOGER_UI,
} from "@/lib/constants/chat-ask-astrologer";
import { cn } from "@/lib/utils";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

export function AskRequestAnswerSection({
  req,
  onAnswerSubmitted,
}: {
  req: AskAstrologerRequest;
  onAnswerSubmitted: () => void;
}) {
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const [answerText, setAnswerText] = useState("");
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [voiceDurationSec, setVoiceDurationSec] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmitClick() {
    if (!voiceFile) {
      setError(AA.astrologerAnswerRequired);
      return;
    }
    setError(null);
    setConfirmOpen(true);
  }

  async function handleConfirmSubmit() {
    if (!voiceFile) {
      setConfirmOpen(false);
      setError(AA.astrologerAnswerRequired);
      return;
    }
    setConfirmOpen(false);
    setSubmitting(true);
    setError(null);
    try {
      await submitAskAnswer(req.id, answerText || null, voiceFile, voiceDurationSec);
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.answerSubmitted);
      onAnswerSubmitted();
    } catch {
      setError(AA.astrologerSubmitFailed);
    } finally {
      setSubmitting(false);
    }
  }

  if (req.status === "answered") {
    return (
      <section className={ASK_ASTROLOGER_UI.portalAnswerPanel}>
        <h3 className={ASK_ASTROLOGER_UI.portalAnswerTitle}>
          {AA.astrologerYourAnswer}
        </h3>
        {req.answer_text ? (
          <p className={cn(ASK_ASTROLOGER_UI.portalBody, "mt-2")}>
            {req.answer_text}
          </p>
        ) : null}
        {req.answer_voice_url ? (
          <VoiceAnswerPlayer
            src={req.answer_voice_url}
            durationSec={req.answer_voice_duration_sec}
            className="mt-3"
          />
        ) : null}
      </section>
    );
  }

  return (
    <section className={ASK_ASTROLOGER_UI.portalFormPanel}>
      <h3 className={ASK_ASTROLOGER_UI.portalSectionTitle}>
        {AA.astrologerYourAnswer}
      </h3>
      <p className={cn(ASK_ASTROLOGER_UI.portalBody, "mt-1.5")}>
        {AA.astrologerVoiceAnswerHint}
      </p>

      <div className="mt-4 space-y-4">
        <div className={ASK_ASTROLOGER_UI.portalVoiceAnswerPrimary}>
          <p className={ASK_ASTROLOGER_UI.portalSectionTitle}>
            {AA.astrologerVoiceAnswerLead}
          </p>
          <div className="mt-3">
            <AskAnswerVoiceInput
              voiceFile={voiceFile}
              voiceDurationSec={voiceDurationSec}
              onVoiceFileChange={(file, durationSec) => {
                setVoiceFile(file);
                setVoiceDurationSec(durationSec ?? null);
                if (file) setError(null);
              }}
              disabled={submitting}
            />
          </div>
        </div>

        <div>
          <p className={ASK_ASTROLOGER_UI.portalSectionTitle}>
            {AA.astrologerTextAnswerOptional}
          </p>
          <textarea
            value={answerText}
            onChange={(event) => setAnswerText(event.target.value)}
            placeholder={AA.astrologerAnswerPlaceholder}
            rows={4}
            className={cn(ASK_ASTROLOGER_UI.portalTextarea, "mt-2")}
          />
        </div>

        {error ? (
          <p className="text-sm text-[var(--color-brand-error)]">{error}</p>
        ) : null}

        <button
          type="button"
          onClick={handleSubmitClick}
          disabled={submitting || !voiceFile}
          className={cn(
            ASK_ASTROLOGER_UI.portalAnswerBtn,
            "w-full py-3.5 text-center text-sm font-semibold sm:w-auto sm:px-8"
          )}
        >
          {submitting
            ? AA.astrologerSubmitting
            : AA.astrologerSubmitAnswer}
        </button>
      </div>

      <SettingsModalDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        message={AA.astrologerSubmitConfirmMessage}
        confirmLabel={AA.astrologerSubmitConfirmLabel}
        onConfirm={handleConfirmSubmit}
      />
    </section>
  );
}
