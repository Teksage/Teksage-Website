import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { ConsultationUserEvent } from "@/types/consultation";

interface EventsListApiBody {
  data?: Array<{
    id: number;
    astrologer_id: number;
    status: string;
    start_datetime: string;
    end_datetime: string;
    event_link?: string | null;
    queries_answered?: boolean | null;
    astrologer_first_name?: string | null;
    astrologer_last_name?: string | null;
    astrologer_picture?: string | null;
    category?: string[] | null;
    languages?: string[] | null;
    consultation_fee?: number | null;
    currency?: string | null;
    rating?: number | null;
  }>;
}

function parseUserId(id: string | number): number {
  const n = typeof id === "number" ? id : Number(id);
  if (!Number.isFinite(n)) throw new Error("Invalid user id");
  return n;
}

function mapEvent(raw: NonNullable<EventsListApiBody["data"]>[number]): ConsultationUserEvent {
  return {
    id: raw.id,
    astrologerId: raw.astrologer_id,
    status: raw.status,
    startDatetime: raw.start_datetime,
    endDatetime: raw.end_datetime,
    eventLink: raw.event_link ?? null,
    queriesAnswered: raw.queries_answered ?? null,
    astrologerFirstName: raw.astrologer_first_name ?? null,
    astrologerLastName: raw.astrologer_last_name ?? null,
    astrologerPicture: raw.astrologer_picture ?? null,
    categories: raw.category ?? [],
    languages: raw.languages ?? [],
    consultationFee: raw.consultation_fee ?? 0,
    currency: raw.currency ?? "INR",
    rating: raw.rating ?? null,
  };
}

/** Flutter `fetchAstroUserEvents` — confirmed + completed customer events. */
export async function fetchUserConsultationEvents(
  userId: string | number
): Promise<ConsultationUserEvent[]> {
  const { data: body } = await http.get<EventsListApiBody>(API_ENDPOINTS.astroEvents, {
    params: { customer_id: parseUserId(userId) },
  });

  return (body?.data ?? [])
    .filter((e) => e.status === "confirmed" || e.status === "completed")
    .map(mapEvent)
    .sort((a, b) => a.startDatetime.localeCompare(b.startDatetime));
}
