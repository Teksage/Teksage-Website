"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CONSULTATION_QUERY_LIMIT } from "@/lib/constants/consultation-booking";
import { ROUTES } from "@/lib/constants";
import {
  readConsultationSummary,
  writeConsultationSummary,
} from "@/lib/consultation-session";
import {
  fetchConsultationEvent,
  fetchConsultationQuestions,
} from "@/lib/services/consultation";
import { submitConsultationReview, deleteConsultationReview } from "@/lib/services/consultation-answers-ready";
import type {
  ConsultationCompletedBooking,
  ConsultationQuestion,
  ConsultationReviewStatus,
} from "@/types/consultation";

export function useConsultationSummary() {
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
        const next: ConsultationCompletedBooking = {
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
          status: refreshed.status ?? data.status,
          queriesAnswered:
            refreshed.queries_answered ?? data.queriesAnswered,
          astrologerId: refreshed.astrologer_id ?? data.astrologerId,
          rating: refreshed.rating ?? data.rating ?? null,
          feedback: refreshed.feedback ?? data.feedback ?? null,
          reviewStatus:
            refreshed.review_status ?? data.reviewStatus ?? null,
        };
        setSummary(next);
        writeConsultationSummary(next);
      }
      const list = await loadQuestions(data.eventId);
      setLoading(false);
      const isCompleted = (refreshed?.status ?? data.status) === "completed";
      if (!isCompleted && list.length < CONSULTATION_QUERY_LIMIT) {
        setQueryStartIndex(list.length);
        setShowQuery(true);
      }
    })();
  }, [loadQuestions, router]);

  const openAddQuery = useCallback(() => {
    setQueryStartIndex(questions.length);
    setShowQuery(true);
  }, [questions.length]);

  const submitReview = useCallback(
    async (body: { rating: number; feedback?: string }) => {
      if (!summary) return;
      const res = await submitConsultationReview(summary.eventId, body);
      const next: ConsultationCompletedBooking = {
        ...summary,
        rating: res.rating ?? body.rating,
        feedback: res.feedback ?? body.feedback ?? "",
        reviewStatus: (res.review_status ?? "pending") as ConsultationReviewStatus,
      };
      setSummary(next);
      writeConsultationSummary(next);
    },
    [summary]
  );

  const deleteReview = useCallback(async () => {
    if (!summary) return;
    await deleteConsultationReview(summary.eventId);
    const next: ConsultationCompletedBooking = {
      ...summary,
      rating: null,
      feedback: "",
      reviewStatus: null,
    };
    setSummary(next);
    writeConsultationSummary(next);
  }, [summary]);

  const applyReviewLocal = useCallback(
    (patch: {
      rating: number | null;
      feedback: string;
      reviewStatus: ConsultationReviewStatus | null;
    }) => {
      setSummary((prev) => {
        if (!prev) return prev;
        const next = {
          ...prev,
          rating: patch.rating,
          feedback: patch.feedback,
          reviewStatus: patch.reviewStatus,
        };
        writeConsultationSummary(next);
        return next;
      });
    },
    []
  );

  return {
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
  };
}
