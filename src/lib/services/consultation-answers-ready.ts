import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  ConsultationAnswersReadyPending,
  ConsultationCompletedBooking,
  ConsultationReviewStatus,
} from "@/types/consultation";

type PendingDto = {
  event?: {
    id: number;
    astrologer_id: number;
    astrologer_name?: string | null;
    astrologer_picture?: string | null;
    start_datetime?: string | null;
    end_datetime?: string | null;
    event_link?: string | null;
    category?: string[] | null;
    languages?: string[] | null;
    consultation_fee?: number | null;
    currency?: string | null;
    status?: string | null;
    queries_answered?: boolean | null;
    rating?: number | null;
    feedback?: string | null;
    review_status?: ConsultationReviewStatus | null;
  } | null;
};

function mapPending(
  raw: NonNullable<PendingDto["event"]>
): ConsultationAnswersReadyPending {
  return {
    id: raw.id,
    astrologerId: raw.astrologer_id,
    astrologerName: (raw.astrologer_name ?? "").trim() || "Astrologer",
    astrologerPicture: raw.astrologer_picture ?? null,
    startDatetime: raw.start_datetime ?? null,
    endDatetime: raw.end_datetime ?? null,
    eventLink: raw.event_link ?? null,
    categories: raw.category ?? [],
    languages: raw.languages ?? [],
    consultationFee: Number(raw.consultation_fee ?? 0),
    currency: raw.currency ?? "INR",
    status: raw.status ?? "completed",
    queriesAnswered: Boolean(raw.queries_answered),
    rating: raw.rating ?? null,
    feedback: raw.feedback ?? null,
    reviewStatus: raw.review_status ?? null,
  };
}

export function pendingToConsultationSummary(
  pending: ConsultationAnswersReadyPending
): ConsultationCompletedBooking {
  return {
    eventId: pending.id,
    eventLink: pending.eventLink,
    startDatetime: pending.startDatetime ?? new Date().toISOString(),
    endDatetime: pending.endDatetime ?? new Date().toISOString(),
    categories: pending.categories,
    languages: pending.languages,
    consultationFee: pending.consultationFee,
    currency: pending.currency,
    astrologerName: pending.astrologerName,
    astrologerPicture: pending.astrologerPicture,
    astrologerId: pending.astrologerId,
    status: pending.status,
    queriesAnswered: pending.queriesAnswered,
    rating: pending.rating ?? null,
    feedback: pending.feedback ?? null,
    reviewStatus: pending.reviewStatus ?? null,
  };
}

export async function fetchPendingConsultationAnswersPopup(): Promise<{
  event: ConsultationAnswersReadyPending | null;
}> {
  const { data } = await http.get<PendingDto>(
    API_ENDPOINTS.consultationPendingAnswersPopup
  );
  if (!data?.event?.id) return { event: null };
  return { event: mapPending(data.event) };
}

export async function acknowledgeConsultationAnswersReady(
  eventId: number
): Promise<{ status: string; event_id: number }> {
  const { data } = await http.post<{ status: string; event_id: number }>(
    `${API_ENDPOINTS.consultationAcknowledgeAnswersReady}/${eventId}/acknowledge-answers-ready`
  );
  return data;
}

export async function submitConsultationReview(
  eventId: number,
  body: { rating: number; feedback?: string }
): Promise<{
  rating?: number | null;
  feedback?: string | null;
  review_status?: ConsultationReviewStatus | null;
}> {
  const { data } = await http.put<{
    message?: string;
    event?: {
      rating?: number | null;
      feedback?: string | null;
      review_status?: ConsultationReviewStatus | null;
    };
    rating?: number | null;
    feedback?: string | null;
    review_status?: ConsultationReviewStatus | null;
  }>(`${API_ENDPOINTS.astroEvents}/${eventId}`, body);
  const event = data?.event;
  return {
    rating: event?.rating ?? data?.rating ?? body.rating,
    feedback: event?.feedback ?? data?.feedback ?? body.feedback ?? null,
    review_status: event?.review_status ?? data?.review_status ?? "pending",
  };
}

export async function deleteConsultationReview(eventId: number): Promise<void> {
  await http.put(`${API_ENDPOINTS.astroEvents}/${eventId}`, {
    clear_review: true,
  });
}
