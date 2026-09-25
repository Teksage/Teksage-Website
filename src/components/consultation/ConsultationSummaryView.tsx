"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { ConsultationQueryDialog } from "@/components/consultation/ConsultationQueryDialog";
import { ConsultationSummaryDetailsCard } from "@/components/consultation/ConsultationSummaryDetailsCard";
import { ConsultationSummaryQueriesCard } from "@/components/consultation/ConsultationSummaryQueriesCard";
import { ConsultationSummaryReviewCard } from "@/components/consultation/ConsultationSummaryReviewCard";
import { ConsultationSummarySessionCard } from "@/components/consultation/ConsultationSummarySessionCard";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import {
  CONSULTATION_BOOKING_SCREEN,
  CONSULTATION_QUERY_LIMIT,
} from "@/lib/constants/consultation-booking";
import {
  CONSULTATION_SUMMARY_LAYOUT as L,
  CONSULTATION_SUMMARY_SCREEN,
} from "@/lib/constants/consultation-summary";
import { ROUTES } from "@/lib/constants";
import {
  formatConsultationBookingDate,
  formatConsultationBookingTimeRange,
  formatFeeSlash,
} from "@/lib/consultation-booking-format";
import {
  formatConsultationCategoryLabel,
  formatConsultationLanguageList,
} from "@/lib/consultation-display";
import { useConsultationSummary } from "@/hooks/useConsultationSummary";

export function ConsultationSummaryView() {
  const CB = useI18nConstants(CONSULTATION_BOOKING_SCREEN);
  const CS = useI18nConstants(CONSULTATION_SUMMARY_SCREEN);
  const { t } = useT();
  const router = useRouter();
  const {
    summary,
    questions,
    loading,
    showQuery,
    queryStartIndex,
    setShowQuery,
    loadQuestions,
    openAddQuery,
    submitReview,
    deleteReview,
    applyReviewLocal,
  } = useConsultationSummary();

  if (!summary) {
    return (
      <div className={L.page}>
        <LoadingOverlay open />
      </div>
    );
  }

  const isCompleted = summary.status === "completed";
  const canAddQuery = !isCompleted && questions.length < CONSULTATION_QUERY_LIMIT;
  const hasAnswers = questions.some((q) => Boolean(q.answer?.trim()));

  return (
    <>
      <div className={L.page}>
        <header className={L.pageHeader}>
          <div className={L.pageHeaderInner}>
            <button
              type="button"
              onClick={() => router.push(ROUTES.consultation)}
              className={L.backBtn}
              aria-label={t("Go back")}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={L.headerMain}>
              <h1 className={L.headerTitle}>{CB.title}</h1>
              <p className={L.headerSub}>
                {isCompleted ? CS.subtitleCompleted : CS.subtitle}
              </p>
            </div>
          </div>
        </header>

        <div className={L.scroll}>
          <div className={L.stack}>
            <ConsultationSummarySessionCard
              name={summary.astrologerName}
              picture={summary.astrologerPicture}
              isCompleted={isCompleted}
              eventLink={summary.eventLink}
              statusCompletedLabel={CS.statusCompleted}
              statusUpcomingLabel={CS.statusUpcoming}
              meetingLinkLabel={CB.meetingLink}
              meetingLinkPendingLabel={CB.meetingLinkPending}
            />
            <ConsultationSummaryDetailsCard
              title={CB.consultationSection}
              items={[
                {
                  label: CB.date,
                  value: formatConsultationBookingDate(summary.startDatetime),
                },
                {
                  label: CB.time,
                  value: formatConsultationBookingTimeRange(
                    summary.startDatetime,
                    summary.endDatetime
                  ),
                },
                {
                  label: CB.consultingOn,
                  value: summary.categories
                    .map(formatConsultationCategoryLabel)
                    .join(", "),
                },
                {
                  label: CB.language,
                  value: formatConsultationLanguageList(summary.languages),
                },
                {
                  label: CB.consultationFee,
                  value: formatFeeSlash(
                    summary.consultationFee,
                    summary.currency
                  ),
                },
              ]}
            />
            <ConsultationSummaryQueriesCard
              title={CB.queriesTitle}
              loading={loading}
              questions={questions}
              showAnswersBanner={
                isCompleted &&
                (Boolean(summary.queriesAnswered) || hasAnswers)
              }
              canAddQuery={canAddQuery}
              addQueryLabel={CB.addQueryCta}
              emptyLabel={CB.noQueries}
              loadingLabel={CS.queriesLoading}
              answerLabel={CS.answerLabel}
              onAddQuery={openAddQuery}
            />
            {isCompleted ? (
              <ConsultationSummaryReviewCard
                eventId={summary.eventId}
                rating={summary.rating}
                feedback={summary.feedback}
                reviewStatus={summary.reviewStatus}
                onSubmit={submitReview}
                onDelete={deleteReview}
                onSubmitted={applyReviewLocal}
              />
            ) : null}
          </div>
        </div>
      </div>

      <LoadingOverlay open={loading && questions.length === 0} />
      {showQuery ? (
        <ConsultationQueryDialog
          eventId={summary.eventId}
          initialIndex={queryStartIndex}
          onClose={() => setShowQuery(false)}
          onSaved={() => void loadQuestions(summary.eventId)}
        />
      ) : null}
    </>
  );
}
