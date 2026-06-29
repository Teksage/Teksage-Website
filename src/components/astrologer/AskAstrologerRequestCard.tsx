"use client";

import { useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { AskAnswerVoiceInput } from "@/components/astrologer/AskAnswerVoiceInput";
import { AskRequestCustomerSection } from "@/components/astrologer/AskRequestCustomerSection";
import { VoiceAnswerPlayer } from "@/components/common/VoiceAnswerPlayer";
import { submitAskAnswer } from "@/lib/services/astrologer-ask-requests";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import { showSuccessAppSnackBar } from "@/lib/app-snackbar";
import {
  ASK_ASTROLOGER_LAYOUT,
  ASK_ASTROLOGER_SCREEN,
  ASK_ASTROLOGER_UI,
} from "@/lib/constants/chat-ask-astrologer";
import { cn } from "@/lib/utils";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

function statusClass(status: string): string {
  if (status === "assigned") return ASK_ASTROLOGER_UI.portalStatusAssigned;
  if (status === "answered") return ASK_ASTROLOGER_UI.portalStatusAnswered;
  return "bg-neutral-100 text-black/60 ring-neutral-200";
}

export function AskAstrologerRequestCard({
  req,
  onAnswered,
}: {
  req: AskAstrologerRequest;
  onAnswered: () => void;
}) {
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const [expanded, setExpanded] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [voiceDurationSec, setVoiceDurationSec] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function getStatusLabel(status: string): string {
    if (status === "assigned") return AA.astrologerStatusAssigned;
    if (status === "answered") return AA.astrologerStatusAnswered;
    return status;
  }

  async function handleSubmit() {
    if (!answerText.trim() && !voiceFile) {
      setError(AA.astrologerAnswerRequired);
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await submitAskAnswer(req.id, answerText || null, voiceFile, voiceDurationSec);
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.answerSubmitted);
      onAnswered();
    } catch {
      setError(AA.astrologerSubmitFailed);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <li className={ASK_ASTROLOGER_UI.portalCard}>
      <div className={ASK_ASTROLOGER_UI.portalCardInner}>
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-3">
            <div className={ASK_ASTROLOGER_UI.portalMetaRow}>
              <span className={ASK_ASTROLOGER_UI.portalRequestId}>Request #{req.id}</span>
              <span
                className={cn(
                  ASK_ASTROLOGER_UI.portalStatusBadge,
                  statusClass(req.status)
                )}
              >
                {getStatusLabel(req.status)}
              </span>
            </div>
            <p className={ASK_ASTROLOGER_UI.portalQuestion}>{req.user_question}</p>
          </div>
          {req.status === "assigned" ? (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className={
                expanded
                  ? ASK_ASTROLOGER_UI.portalCancelBtn
                  : ASK_ASTROLOGER_UI.portalAnswerBtn
              }
            >
              {expanded
                ? AA.astrologerCancelBtn
                : AA.astrologerAnswerBtn}
            </button>
          ) : null}
        </header>

        <div className={ASK_ASTROLOGER_UI.portalSectionDivider} />

        <AskRequestCustomerSection req={req} />

        <div className={ASK_ASTROLOGER_UI.portalSectionDivider} />

        <section>
          <h3 className={ASK_ASTROLOGER_UI.portalSectionTitle}>
            {AA.astrologerAiReference}
          </h3>
          <p className={cn(ASK_ASTROLOGER_UI.portalBody, "mt-2")}>{req.ai_response}</p>
        </section>

        {req.status === "answered" && (req.answer_text || req.answer_voice_url) ? (
          <>
            <div className={ASK_ASTROLOGER_UI.portalSectionDivider} />
            <section className={ASK_ASTROLOGER_UI.portalAnswerPanel}>
              <h3 className={ASK_ASTROLOGER_UI.portalAnswerTitle}>
                {AA.astrologerYourAnswer}
              </h3>
              {req.answer_text ? (
                <p className={cn(ASK_ASTROLOGER_UI.portalBody, "mt-2")}>{req.answer_text}</p>
              ) : null}
              {req.answer_voice_url ? (
                <VoiceAnswerPlayer
                  src={req.answer_voice_url}
                  durationSec={req.answer_voice_duration_sec}
                  className="mt-3"
                />
              ) : null}
            </section>
          </>
        ) : null}

        {expanded && req.status === "assigned" ? (
          <>
            <div className={ASK_ASTROLOGER_UI.portalSectionDivider} />
            <section className={ASK_ASTROLOGER_UI.portalFormPanel}>
              <h3 className={ASK_ASTROLOGER_UI.portalSectionTitle}>
                {AA.astrologerYourAnswer}
              </h3>
              <p className={cn(ASK_ASTROLOGER_UI.portalBody, "mt-2")}>
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
                    rows={5}
                    className={cn(ASK_ASTROLOGER_UI.portalTextarea, "mt-2")}
                  />
                </div>
                {error ? (
                  <p className="text-sm text-[var(--color-brand-error)]">{error}</p>
                ) : null}
                <button
                  type="button"
                  onClick={() => void handleSubmit()}
                  disabled={submitting}
                  className={ASK_ASTROLOGER_LAYOUT.primaryBtn}
                >
                  {submitting
                    ? AA.astrologerSubmitting
                    : AA.astrologerSubmitAnswer}
                </button>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </li>
  );
}
