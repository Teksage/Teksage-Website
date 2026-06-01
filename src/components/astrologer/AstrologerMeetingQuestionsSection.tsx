"use client";

import { useEffect, useState } from "react";
import type { AstroQuestion } from "@/types/astrologer-portal";
import { AstrologerAnswerQuestionDialog } from "@/components/astrologer/AstrologerAnswerQuestionDialog";
import {
  astrologerCanAnswerQuestions,
  allQuestionsAnswered,
  formatQuestionAnswer,
} from "@/lib/astrologer-meeting-questions";
import {
  ASTRO_PORTAL_COLORS,
  ASTRO_PORTAL_UI,
} from "@/lib/constants/astrologer-portal";
import { deleteAstrologerQuestion } from "@/lib/services/astrologer-portal";
import type { AstrologerMeetingQuestionsSectionProps } from "@/types";

const Q = ASTRO_PORTAL_UI.questions;

export function AstrologerMeetingQuestionsSection({
  questions,
  startDatetime,
  consultationDuration,
  onQuestionsUpdated,
}: AstrologerMeetingQuestionsSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [displayQuestions, setDisplayQuestions] = useState<AstroQuestion[]>(questions);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    setDisplayQuestions(questions);
  }, [questions]);

  const hasAnswered = allQuestionsAnswered(displayQuestions);

  function handleAnswerSaved(updated: AstroQuestion) {
    setDisplayQuestions((prev) =>
      prev.map((q) => (q.id === updated.id ? updated : q))
    );
    void onQuestionsUpdated();
  }

  async function handleDelete(id: number) {
    if (deletingId !== null) return;
    setDeletingId(id);
    setInfoMessage(null);
    try {
      await deleteAstrologerQuestion(id);
      setDisplayQuestions((prev) => prev.filter((q) => q.id !== id));
      void onQuestionsUpdated();
    } catch {
      setInfoMessage(Q.deleteQuestionFail ?? "Failed to delete question.");
    } finally {
      setDeletingId(null);
    }
  }

  function openAnswer(index: number) {
    if (!astrologerCanAnswerQuestions(startDatetime, consultationDuration)) {
      setInfoMessage(Q.answerAfterMeeting);
      return;
    }
    setInfoMessage(null);
    setStartIndex(index);
    setDialogOpen(true);
  }

  return (
    <>
      <div className="space-y-2">
        <p className="text-center text-sm font-semibold text-white/80">
          {hasAnswered ? Q.headerDone : Q.headerPending}
        </p>
        {infoMessage ? (
          <p className="rounded-lg bg-white/90 px-3 py-2 text-center text-xs font-medium text-gray-800">
            {infoMessage}
          </p>
        ) : null}
        <div className="divide-y divide-dashed divide-black/30 rounded-xl border border-black/[0.12] bg-white">
          {displayQuestions.map((q, index) => {
            const answered = (q.answer?.trim().length ?? 0) > 0;
            return (
              <div key={q.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="flex-1 text-sm font-semibold text-gray-900">
                    {q.question}
                  </p>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {!answered ? (
                      <button
                        type="button"
                        onClick={() => openAnswer(index)}
                        className="rounded-full border px-2.5 py-1.5 text-xs font-semibold"
                        style={{
                          borderColor: ASTRO_PORTAL_COLORS.brandGreen,
                          color: ASTRO_PORTAL_COLORS.brandGreen,
                        }}
                      >
                        {Q.answerBtn}
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => void handleDelete(q.id)}
                      disabled={deletingId === q.id}
                      className="rounded-full border border-red-300 px-2.5 py-1.5 text-xs font-semibold text-red-500 transition-opacity hover:opacity-80 disabled:opacity-40"
                    >
                      {deletingId === q.id ? "…" : Q.deleteQuestion ?? "Delete"}
                    </button>
                  </div>
                </div>
                {answered ? (
                  <p className="mt-2 text-sm font-medium leading-snug text-gray-900/50">
                    {formatQuestionAnswer(q.answer ?? "")}
                  </p>
                ) : (
                  <p className="mt-2 text-xs italic text-gray-400">{Q.noAnswerYet}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AstrologerAnswerQuestionDialog
        open={dialogOpen}
        questions={displayQuestions}
        startIndex={startIndex}
        onClose={() => setDialogOpen(false)}
        onAnswerSaved={handleAnswerSaved}
      />
    </>
  );
}
