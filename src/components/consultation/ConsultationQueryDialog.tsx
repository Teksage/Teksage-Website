"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { useState } from "react";
import {
  CONSULTATION_BOOKING_ASSETS,
  CONSULTATION_BOOKING_SCREEN,
  CONSULTATION_QUERY_LIMIT,
} from "@/lib/constants/consultation-booking";
import { addConsultationQuestion } from "@/lib/services/consultation";
import { cn } from "@/lib/utils";
import { isAxiosError } from "axios";

type ConsultationQueryDialogProps = {
  eventId: number;
  initialIndex?: number;
  onClose: () => void;
  onSaved: () => void;
};

function emptyAnswers(): string[] {
  return Array.from({ length: CONSULTATION_QUERY_LIMIT }, () => "");
}

export function ConsultationQueryDialog({
  eventId,
  initialIndex = 0,
  onClose,
  onSaved,
}: ConsultationQueryDialogProps) {
  const CB = useI18nConstants(CONSULTATION_BOOKING_SCREEN);
  const [index, setIndex] = useState(initialIndex);
  const [answers, setAnswers] = useState(emptyAnswers);
  const [savedAnswers, setSavedAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const isLastStep = index >= CONSULTATION_QUERY_LIMIT - 1;
  const text = answers[index] ?? "";

  function updateText(value: string) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function goPrevious() {
    if (index <= 0) return;
    setError(null);
    setIndex(index - 1);
  }

  async function handleNextOrSubmit() {
    const question = text.trim();
    if (!question) {
      setError(CB.queryEmpty);
      return;
    }
    setError(null);

    if (savedAnswers[index] !== question) {
      setBusy(true);
      try {
        await addConsultationQuestion(eventId, question, index);
        setSavedAnswers((prev) => ({ ...prev, [index]: question }));
        onSaved();
      } catch (err) {
        const isServerError = isAxiosError(err) && err.response?.status === 500;
        if (isServerError) {
          setSavedAnswers((prev) => ({ ...prev, [index]: question }));
          onSaved();
          setError(CB.querySavedMailFailed);
        } else {
          setError(CB.queryEmpty);
          setBusy(false);
          return;
        }
      } finally {
        setBusy(false);
      }
    }

    if (isLastStep) {
      onClose();
      return;
    }
    setIndex(index + 1);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <button
        type="button"
        className="absolute inset-0 bg-black/10 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative z-10 w-full max-w-md pt-8">
        <div className="absolute left-1/2 top-0 z-20 flex size-[4.2rem] -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-white bg-[#DDE8A9] shadow-md">
          <Image
            src={CONSULTATION_BOOKING_ASSETS.queryIcon}
            alt=""
            width={36}
            height={36}
            unoptimized
            aria-hidden
          />
        </div>
        <div className="rounded-[18px] bg-white px-5 pb-5 pt-14">
          <h3 className="text-xl font-bold text-[var(--color-brand-black)]/80">
            {CB.queryDialogTitle}
          </h3>
          <textarea
            value={text}
            maxLength={250}
            rows={5}
            onChange={(e) => updateText(e.target.value)}
            placeholder={CB.queryPlaceholder}
            className="mt-3 w-full resize-none rounded-lg border border-[var(--color-consult-user-bg)] px-3 py-2.5 text-base outline-none"
          />
          {error ? <p className="mt-2 text-sm text-[var(--color-brand-error)]">{error}</p> : null}
          <p className="mt-4 text-center text-base font-medium">
            {index + 1}/{CONSULTATION_QUERY_LIMIT}
          </p>
          <p className="mt-2 text-center text-xs text-[var(--color-brand-black)]/60">
            {CB.queryMaxHint}
          </p>
          <div className="mt-4 flex gap-2.5">
            {index > 0 ? (
              <button
                type="button"
                disabled={busy}
                onClick={goPrevious}
                className={cn(
                  "flex-1 rounded-lg bg-[var(--color-consult-user-bg)] py-3 text-base font-semibold text-white",
                  busy && "opacity-50"
                )}
              >
                {CB.queryPrevious}
              </button>
            ) : null}
            <button
              type="button"
              disabled={busy}
              onClick={() => void handleNextOrSubmit()}
              className={cn(
                "flex-1 rounded-lg bg-[var(--color-consult-user-bg)] py-3 text-base font-semibold text-white",
                busy && "opacity-50"
              )}
            >
              {isLastStep ? CB.querySubmit : CB.queryNext}
            </button>
          </div>
          <p className="mt-4 text-center text-xs font-semibold text-[var(--color-brand-error)]">
            {CB.queryRequiredNote}
          </p>
        </div>
      </div>
    </div>
  );
}
