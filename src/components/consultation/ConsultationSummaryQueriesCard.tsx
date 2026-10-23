"use client";

import { ConsultationAnswersReadyCallout } from "@/components/consultation/ConsultationAnswersReadyCallout";
import { CONSULTATION_SUMMARY_LAYOUT as L } from "@/lib/constants/consultation-summary";
import type { ConsultationSummaryQueriesCardProps } from "@/types/ui/consultation-summary";

export function ConsultationSummaryQueriesCard({
  title,
  loading,
  questions,
  showAnswersBanner,
  canAddQuery,
  addQueryLabel,
  emptyLabel,
  loadingLabel,
  answerLabel,
  onAddQuery,
}: ConsultationSummaryQueriesCardProps) {
  return (
    <section className={L.queriesCard}>
      <h2 className={L.sectionTitle}>{title}</h2>
      <div className={L.queriesBody}>
        {showAnswersBanner ? <ConsultationAnswersReadyCallout flushTop /> : null}

        {canAddQuery ? (
          <button type="button" className={L.addQueryBtn} onClick={onAddQuery}>
            {addQueryLabel}
          </button>
        ) : null}

        {loading ? (
          <p className={L.loadingText}>{loadingLabel}</p>
        ) : questions.length === 0 ? (
          <p className={L.empty}>{emptyLabel}</p>
        ) : (
          <ul className={L.queryList}>
            {questions.map((q) => (
              <li key={q.id} className={L.queryCard}>
                <p className={L.queryQuestion}>{q.question}</p>
                {q.answer?.trim() ? (
                  <>
                    <p className={L.queryAnswerLabel}>{answerLabel}</p>
                    <p className={L.queryAnswer}>{q.answer}</p>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
