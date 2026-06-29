"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ConsultationBookingDetailRow } from "@/components/consultation/ConsultationBookingDetailRow";
import { ConsultationBookingProfileHeader } from "@/components/consultation/ConsultationBookingProfileHeader";
import { ConsultationBookingSectionDivider } from "@/components/consultation/ConsultationBookingSectionDivider";
import { ConsultationCheckoutShell } from "@/components/consultation/ConsultationCheckoutShell";
import { ConsultationQueryDialog } from "@/components/consultation/ConsultationQueryDialog";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import {
  CONSULTATION_BOOKING_LAYOUT,
  CONSULTATION_BOOKING_SCREEN,
  CONSULTATION_QUERY_LIMIT,
} from "@/lib/constants/consultation-booking";
import { ROUTES } from "@/lib/constants";
import {
  formatConsultationBookingDate,
  formatConsultationBookingTimeRange,
  formatFeeSlash,
} from "@/lib/consultation-booking-format";
import { formatConsultationCategoryLabel, formatConsultationLanguageList } from "@/lib/consultation-display";
import { readConsultationSummary, writeConsultationSummary } from "@/lib/consultation-session";
import { fetchConsultationEvent, fetchConsultationQuestions } from "@/lib/services/consultation";
import type { ConsultationCompletedBooking, ConsultationQuestion } from "@/types/consultation";

export function ConsultationSummaryView() {
  const CB = useI18nConstants(CONSULTATION_BOOKING_SCREEN);
  const router = useRouter();
  const [summary, setSummary] = useState<ConsultationCompletedBooking | null>(null);
  const [questions, setQuestions] = useState<ConsultationQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuery, setShowQuery] = useState(false);
  const [queryStartIndex, setQueryStartIndex] = useState(0);

  const loadQuestions = useCallback(async (eventId: number) => {
    const list = await fetchConsultationQuestions(eventId);
    const sorted = [...list].sort((a, b) => (a.index ?? a.id) - (b.index ?? b.id));
    setQuestions(sorted);
    return sorted;
  }, []);

  useEffect(() => {
    const data = readConsultationSummary();
    if (!data) {
      router.replace(ROUTES.consultation);
      return;
    }
    setSummary(data);
    (async () => {
      const refreshed = await fetchConsultationEvent(data.eventId);
      if (refreshed) {
        const next = {
          ...data,
          eventLink: refreshed.event_link ?? data.eventLink,
          consultationFee: Number(
            refreshed.consultation_fee ?? data.consultationFee
          ),
          startDatetime: refreshed.start_datetime ?? data.startDatetime,
          endDatetime: refreshed.end_datetime ?? data.endDatetime,
          categories: refreshed.category ?? data.categories,
          languages: refreshed.languages ?? data.languages,
          currency: refreshed.currency ?? data.currency,
        };
        setSummary(next);
        writeConsultationSummary(next);
      }
      const list = await loadQuestions(data.eventId);
      setLoading(false);
      if (list.length < CONSULTATION_QUERY_LIMIT) {
        setQueryStartIndex(list.length);
        setShowQuery(true);
      }
    })();
  }, [loadQuestions, router]);

  if (!summary) {
    return (
      <>
        <ConsultationCheckoutShell title={CB.title} onBack={() => router.push(ROUTES.consultation)}>
          {null}
        </ConsultationCheckoutShell>
        <LoadingOverlay open />
      </>
    );
  }

  const categoriesLabel = summary.categories.map(formatConsultationCategoryLabel).join(", ");
  const languagesLabel = formatConsultationLanguageList(summary.languages);
  const canAddQuery = questions.length < CONSULTATION_QUERY_LIMIT;

  return (
    <>
      <ConsultationCheckoutShell
        title={CB.title}
        onBack={() => router.push(ROUTES.consultation)}
      >
        <ConsultationBookingProfileHeader
          name={summary.astrologerName}
          picture={summary.astrologerPicture}
        />
        {summary.eventLink ? (
          <a
            href={summary.eventLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${CONSULTATION_BOOKING_LAYOUT.meetingBtn} mx-auto mt-2 block w-fit`}
          >
            {CB.meetingLink}
          </a>
        ) : (
          <p className="mx-auto mt-2 w-fit text-sm text-[var(--color-brand-black)]/50">
            {CB.meetingLinkPending}
          </p>
        )}
        <ConsultationBookingSectionDivider title={CB.consultationSection} />
        <div className={CONSULTATION_BOOKING_LAYOUT.detailRows}>
          <ConsultationBookingDetailRow
            label={CB.date}
            value={formatConsultationBookingDate(summary.startDatetime)}
          />
          <ConsultationBookingDetailRow
            label={CB.time}
            value={formatConsultationBookingTimeRange(
              summary.startDatetime,
              summary.endDatetime
            )}
          />
          <ConsultationBookingDetailRow
            label={CB.consultingOn}
            value={categoriesLabel}
          />
          <ConsultationBookingDetailRow
            label={CB.language}
            value={languagesLabel}
          />
          <ConsultationBookingDetailRow
            label={CB.consultationFee}
            value={formatFeeSlash(summary.consultationFee, summary.currency)}
          />
        </div>
        <ConsultationBookingSectionDivider title={CB.queriesTitle} />
        {!loading ? (
          <>
            {canAddQuery ? (
              <button
                type="button"
                className={CONSULTATION_BOOKING_LAYOUT.addQueryBtn}
                onClick={() => {
                  setQueryStartIndex(questions.length);
                  setShowQuery(true);
                }}
              >
                {CB.addQueryCta}
              </button>
            ) : null}
            <ul className="mt-4 space-y-4">
              {questions.map((q) => (
                <li key={q.id} className={CONSULTATION_BOOKING_LAYOUT.queryCard}>
                  {q.question}
                </li>
              ))}
              {questions.length === 0 ? (
                <p className="text-center text-sm text-[var(--color-brand-black)]/50">
                  {CB.noQueries}
                </p>
              ) : null}
            </ul>
          </>
        ) : null}
      </ConsultationCheckoutShell>
      <LoadingOverlay open={loading} />
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
