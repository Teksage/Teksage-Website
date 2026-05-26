/** Astrologer portal API calls — mirrors Flutter `AstroUserEventService`, `SlotService`. */
import { slotRangeFromIso } from "@/lib/astrologer-slot-time";
import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  AstroEvent,
  AstroEventDetail,
  AstroHoroscope,
  AstroQuestion,
  AstroSlot,
} from "@/types/astrologer-portal";

interface SlotsApiResponse {
  available_slots?: Array<{
    start_datetime: string;
    end_datetime: string;
    event_booked?: boolean;
  }>;
}

interface EventsListApiResponse {
  data?: AstroEvent[];
}

function parseAstrologerId(id: string | number): number {
  const n = typeof id === "number" ? id : Number(id);
  if (!Number.isFinite(n)) throw new Error("Invalid astrologer id");
  return n;
}

function mapSlot(raw: {
  start_datetime: string;
  end_datetime: string;
  event_booked?: boolean;
}): AstroSlot {
  return {
    start_datetime: raw.start_datetime,
    end_datetime: raw.end_datetime,
    astrologer_id: 0,
    event_booked: Boolean(raw.event_booked),
  };
}

function mapEventDetail(raw: Record<string, unknown>): AstroEventDetail {
  const horoscopeRaw =
    raw.user_horoscope ?? raw.userHoroscope ?? raw.horoscope;
  const questionsRaw = Array.isArray(raw.questions) ? raw.questions : [];
  const customerRaw =
    raw.customer && typeof raw.customer === "object"
      ? (raw.customer as Record<string, unknown>)
      : null;

  return {
    id: Number(raw.id),
    status: String(raw.status ?? ""),
    start_datetime: String(raw.start_datetime ?? ""),
    end_datetime: String(raw.end_datetime ?? ""),
    consultation_duration:
      raw.consultation_duration != null
        ? Number(raw.consultation_duration)
        : null,
    event_link: raw.event_link != null ? String(raw.event_link) : null,
    consultation_fee:
      raw.consultation_fee != null ? Number(raw.consultation_fee) : null,
    currency: raw.currency != null ? String(raw.currency) : null,
    languages: Array.isArray(raw.languages)
      ? (raw.languages as string[])
      : null,
    category: Array.isArray(raw.category) ? (raw.category as string[]) : null,
    share_horoscope: Boolean(raw.share_horoscope),
    feedback: raw.feedback != null ? String(raw.feedback) : null,
    rating: raw.rating != null ? Number(raw.rating) : null,
    queries_answered:
      raw.queries_answered != null ? Boolean(raw.queries_answered) : null,
    customer: customerRaw
      ? {
          first_name:
            customerRaw.first_name != null
              ? String(customerRaw.first_name)
              : null,
          last_name:
            customerRaw.last_name != null
              ? String(customerRaw.last_name)
              : null,
          email:
            customerRaw.email != null ? String(customerRaw.email) : null,
          mobile_number:
            customerRaw.mobile_number != null
              ? String(customerRaw.mobile_number)
              : null,
        }
      : null,
    userHoroscope:
      horoscopeRaw && typeof horoscopeRaw === "object"
        ? (horoscopeRaw as AstroHoroscope)
        : null,
    questions: questionsRaw.map((q, index) => {
      const row = q as Record<string, unknown>;
      return {
        id: Number(row.id ?? index),
        question: String(row.question ?? ""),
        answer: row.answer != null ? String(row.answer) : null,
      } satisfies AstroQuestion;
    }),
  };
}

export async function fetchAstrologerEvents(
  astrologerId: string | number
): Promise<AstroEvent[]> {
  const res = await http.get<EventsListApiResponse>(API_ENDPOINTS.astroEvents, {
    params: { astrologer_id: parseAstrologerId(astrologerId) },
  });
  return res.data?.data ?? [];
}

export async function fetchAstrologerEventDetail(
  eventId: string | number
): Promise<AstroEventDetail> {
  const res = await http.get<Record<string, unknown>>(
    `${API_ENDPOINTS.astroEvents}/${eventId}`
  );
  return mapEventDetail(res.data);
}

function mapQuestion(raw: Record<string, unknown>): AstroQuestion {
  return {
    id: Number(raw.id),
    question: String(raw.question ?? ""),
    answer: raw.answer != null ? String(raw.answer) : null,
  };
}

/** `PUT /api/astrologer/questions/{question_id}` — mirrors Flutter `AstroUserQuestion.updateQuestionAnswer`. */
export async function updateAstrologerQuestionAnswer(
  questionId: number,
  answer: string
): Promise<AstroQuestion> {
  const res = await http.put<Record<string, unknown>>(
    `${API_ENDPOINTS.astrologerQuestions}/${questionId}`,
    { answer }
  );
  return mapQuestion(res.data);
}

export async function fetchAstrologerSlots(
  astrologerId: string | number,
  date: string
): Promise<AstroSlot[]> {
  const res = await http.post<SlotsApiResponse>(API_ENDPOINTS.astrologerSlots, {
    astrologer_id: parseAstrologerId(astrologerId),
    date,
  });
  const rows = res.data?.available_slots ?? [];
  return rows.map(mapSlot);
}

export async function createAstrologerSlots(
  slots: Array<{
    start_datetime: string;
    end_datetime: string;
    create?: boolean;
  }>
): Promise<string> {
  await http.post(API_ENDPOINTS.astrologerSlotsCreate, {
    slots: slots.map((s) => ({ ...s, create: s.create ?? true })),
  });
  return "success";
}

/** Build selected range keys from API slots (for availability hook). */
export function availableRangesFromSlots(slots: AstroSlot[]): Set<string> {
  return new Set(
    slots.filter((s) => !s.event_booked).map((s) => slotRangeFromIso(s.start_datetime, s.end_datetime))
  );
}

export function bookedRangesFromSlots(slots: AstroSlot[]): Set<string> {
  return new Set(
    slots.filter((s) => s.event_booked).map((s) => slotRangeFromIso(s.start_datetime, s.end_datetime))
  );
}
