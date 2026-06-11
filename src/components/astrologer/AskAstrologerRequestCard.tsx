"use client";

import { useState } from "react";
import { AskAnswerVoiceInput } from "@/components/astrologer/AskAnswerVoiceInput";
import { VoiceAnswerPlayer } from "@/components/common/VoiceAnswerPlayer";
import { submitAskAnswer } from "@/lib/services/astrologer-ask-requests";
import { cn } from "@/lib/utils";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

const STATUS_COLOR: Record<string, string> = {
  assigned: "bg-purple-50 text-purple-700",
  answered: "bg-green-50 text-green-700",
};

export function AskAstrologerRequestCard({
  req,
  onAnswered,
}: {
  req: AskAstrologerRequest;
  onAnswered: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [voiceFile, setVoiceFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!answerText.trim() && !voiceFile) {
      setError("Provide an answer (text and/or voice).");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await submitAskAnswer(req.id, answerText || null, voiceFile);
      onAnswered();
    } catch {
      setError("Submit failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const statusColor = STATUS_COLOR[req.status] ?? "bg-neutral-100 text-black/60";

  return (
    <li className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-black/40">
              #{req.id}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                statusColor
              )}
            >
              {req.status}
            </span>
          </div>
          <p className="line-clamp-2 text-sm font-medium text-black/80">
            {req.user_question}
          </p>
        </div>
        {req.status === "assigned" ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="shrink-0 rounded-full border border-[var(--color-brand-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)]"
          >
            {expanded ? "Cancel" : "Answer"}
          </button>
        ) : null}
      </div>

      <div className="mt-3 space-y-0.5 rounded-xl bg-neutral-50 p-3 text-xs">
        {req.customer_name ? (
          <p><span className="text-black/40">Name:</span> {req.customer_name}</p>
        ) : null}
        {req.date_of_birth ? (
          <p><span className="text-black/40">DOB:</span> {req.date_of_birth}</p>
        ) : null}
        {req.time_of_birth ? (
          <p><span className="text-black/40">TOB:</span> {req.time_of_birth}</p>
        ) : null}
        {req.place_of_birth ? (
          <p><span className="text-black/40">POB:</span> {req.place_of_birth}</p>
        ) : null}
        {req.rashi ? (
          <p><span className="text-black/40">Rasi:</span> {req.rashi}</p>
        ) : null}
        {req.nakshatra ? (
          <p><span className="text-black/40">Nakshatra:</span> {req.nakshatra}</p>
        ) : null}
        {req.preferred_languages?.length ? (
          <p>
            <span className="text-black/40">Language:</span>{" "}
            {req.preferred_languages.join(", ")}
          </p>
        ) : null}
      </div>

      <div className="mt-3 rounded-xl bg-neutral-50 p-3 text-xs">
        <p className="mb-1 font-semibold text-black/40">AI Answer (for reference)</p>
        <p className="text-black/70">{req.ai_response}</p>
      </div>

      {req.status === "answered" && (req.answer_text || req.answer_voice_url) ? (
        <div className="mt-3 rounded-xl border border-green-200 bg-green-50 p-3 text-xs">
          <p className="mb-1 font-semibold text-green-700">Your Answer</p>
          {req.answer_text ? <p className="text-black/70">{req.answer_text}</p> : null}
          {req.answer_voice_url ? (
            <VoiceAnswerPlayer src={req.answer_voice_url} className="mt-2" />
          ) : null}
        </div>
      ) : null}

      {expanded && req.status === "assigned" ? (
        <div className="mt-4 space-y-3">
          <textarea
            value={answerText}
            onChange={(event) => setAnswerText(event.target.value)}
            placeholder="Type your answer here…"
            rows={4}
            className="w-full rounded-xl border border-black/20 px-3 py-2 text-sm focus:border-[var(--color-brand-primary)] focus:outline-none"
          />
          <AskAnswerVoiceInput
            voiceFile={voiceFile}
            onVoiceFileChange={setVoiceFile}
            disabled={submitting}
          />
          {error ? (
            <p className="text-xs text-[var(--color-brand-error)]">{error}</p>
          ) : null}
          <button
            type="button"
            onClick={() => void handleSubmit()}
            disabled={submitting}
            className="w-full rounded-2xl bg-[var(--color-brand-primary)] py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit Answer"}
          </button>
        </div>
      ) : null}
    </li>
  );
}
