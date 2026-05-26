"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  ASTRO_PORTAL_COLORS,
  ASTRO_PORTAL_UI,
} from "@/lib/constants/astrologer-portal";
import { updateAstrologerQuestionAnswer } from "@/lib/services/astrologer-portal";
import type { AstroQuestion } from "@/types/astrologer-portal";
import type { AstrologerAnswerQuestionDialogProps } from "@/types";

const Q = ASTRO_PORTAL_UI.questions;

export function AstrologerAnswerQuestionDialog({
  open,
  questions,
  startIndex,
  onClose,
  onAnswerSaved,
}: AstrologerAnswerQuestionDialogProps) {
  const [localQuestions, setLocalQuestions] = useState<AstroQuestion[]>(questions);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (open && !wasOpenRef.current) {
      setLocalQuestions(questions);
      setCurrentIndex(startIndex);
      setText(questions[startIndex]?.answer ?? "");
      setError(null);
    }
    wasOpenRef.current = open;
  }, [open, questions, startIndex]);

  if (!open) return null;

  const current = localQuestions[currentIndex];
  if (!current) return null;

  async function persistAndAdvance() {
    const trimmed = text.trim();
    if (!trimmed) {
      setError(Q.answerEmpty);
      return;
    }
    setError(null);
    const q = localQuestions[currentIndex];
    const original = (q.answer ?? "").trim();
    let nextQuestions = localQuestions;

    if (original !== trimmed) {
      setBusy(true);
      try {
        const updated = await updateAstrologerQuestionAnswer(q.id, trimmed);
        nextQuestions = localQuestions.map((row) =>
          row.id === updated.id ? updated : row
        );
        setLocalQuestions(nextQuestions);
        onAnswerSaved(updated);
      } catch {
        setError(Q.answerSaveFail);
        setBusy(false);
        return;
      }
      setBusy(false);
    } else {
      nextQuestions = localQuestions.map((row, i) =>
        i === currentIndex ? { ...row, answer: trimmed } : row
      );
      setLocalQuestions(nextQuestions);
    }

    if (currentIndex < nextQuestions.length - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      setText(nextQuestions[next]?.answer ?? "");
      return;
    }
    onClose();
  }

  function goPrevious() {
    if (currentIndex <= 0 || busy) return;
    const updated = localQuestions.map((row, i) =>
      i === currentIndex ? { ...row, answer: text } : row
    );
    setLocalQuestions(updated);
    const prev = currentIndex - 1;
    setCurrentIndex(prev);
    setText(updated[prev]?.answer ?? "");
    setError(null);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <button
        type="button"
        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative z-10 w-full max-w-md rounded-[20px] bg-white p-5">
        <p className="text-base font-semibold text-gray-900">{current.question}</p>
        <textarea
          value={text}
          maxLength={Q.charLimit}
          rows={4}
          onChange={(e) => setText(e.target.value)}
          placeholder={Q.dialogPlaceholder}
          className="mt-3 w-full resize-none rounded-xl border px-3 py-2.5 text-base outline-none"
          style={{ borderColor: ASTRO_PORTAL_COLORS.brandGreen }}
        />
        {error ? (
          <p className="mt-2 text-sm text-[var(--color-brand-error)]">{error}</p>
        ) : null}
        <p className="mt-4 text-center text-base font-medium text-gray-900">
          {currentIndex + 1}/{localQuestions.length}
        </p>
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            disabled={busy || currentIndex === 0}
            onClick={goPrevious}
            className={cn(
              "flex-1 rounded-lg py-3 text-base font-semibold text-white",
              currentIndex === 0 && "opacity-40"
            )}
            style={{ backgroundColor: ASTRO_PORTAL_COLORS.brandGreen }}
          >
            {Q.previous}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void persistAndAdvance()}
            className={cn(
              "flex-1 rounded-lg py-3 text-base font-semibold text-white",
              busy && "opacity-50"
            )}
            style={{ backgroundColor: ASTRO_PORTAL_COLORS.brandGreen }}
          >
            {currentIndex >= localQuestions.length - 1 ? Q.done : Q.next}
          </button>
        </div>
      </div>
    </div>
  );
}
