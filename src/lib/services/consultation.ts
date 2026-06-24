import { resolveAstrologerPictureUrl } from "@/lib/consultation-media";
import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  ConsultationAstrologer,
  ConsultationAstrologerDetail,
  ConsultationCouponResult,
  ConsultationEventSummary,
  ConsultationQuestion,
  ConsultationRazorpayOrder,
  ConsultationSlot,
} from "@/types/consultation";

function asRecord(v: unknown): Record<string, unknown> | null {
  if (v != null && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return null;
}

function parseAstrologerListPayload(body: unknown): unknown[] {
  if (Array.isArray(body)) return body;
  const record = asRecord(body);
  if (!record) return [];
  const list = record.astrologers ?? record.data;
  return Array.isArray(list) ? list : [];
}

function parseAstrologer(raw: unknown): ConsultationAstrologer | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const nestedUser = asRecord(row.user);
  const userId = Number(row.user_id ?? nestedUser?.user_id);
  const astrologerId = Number(row.astrologer_id);
  if (!Number.isFinite(userId) && !Number.isFinite(astrologerId)) return null;
  return {
    astrologer_id: Number.isFinite(astrologerId) ? astrologerId : userId,
    user_id: Number.isFinite(userId) && userId > 0 ? userId : astrologerId,
    expertise: Array.isArray(row.expertise) ? (row.expertise as string[]) : [],
    languages: Array.isArray(row.languages) ? (row.languages as string[]) : [],
    experience: row.experience != null ? Number(row.experience) : undefined,
    local_consulting_fee:
      row.local_consulting_fee != null ? Number(row.local_consulting_fee) : undefined,
    foreign_consulting_fee:
      row.foreign_consulting_fee != null
        ? Number(row.foreign_consulting_fee)
        : undefined,
    customer_rating:
      row.customer_rating != null ? Number(row.customer_rating) : null,
    astrologer_profile_info:
      typeof row.astrologer_profile_info === "string"
        ? row.astrologer_profile_info
        : null,
    picture:
      typeof row.picture === "string"
        ? resolveAstrologerPictureUrl(row.picture)
        : null,
    match_percentage:
      row.match_percentage != null ? Number(row.match_percentage) : undefined,
    user: row.user as ConsultationAstrologer["user"],
  };
}

export async function fetchTopAstrologers(
  categories: string[],
  languages: string[]
): Promise<ConsultationAstrologer[]> {
  const { data } = await http.post<unknown>(API_ENDPOINTS.astrologerFilter, {
    category: categories,
    languages,
  });
  return parseAstrologerListPayload(data)
    .map(parseAstrologer)
    .filter((row): row is ConsultationAstrologer => row != null);
}

export async function fetchMoreAstrologers(
  excludeIds: number[]
): Promise<ConsultationAstrologer[]> {
  const query =
    excludeIds.length > 0
      ? `?astro_ids=${excludeIds.join(",")}`
      : "";
  const { data } = await http.get<unknown>(
    `${API_ENDPOINTS.astrologerFilter}${query}`
  );
  return parseAstrologerListPayload(data)
    .map(parseAstrologer)
    .filter((row): row is ConsultationAstrologer => row != null);
}

/** @param userId — astrologer account `user_id` (path param name in API is `astrologer_id`). */
export async function fetchAstrologerDetail(
  userId: number
): Promise<ConsultationAstrologerDetail> {
  const { data } = await http.get<{
    astrologer?: unknown;
    events?: unknown[];
  }>(`${API_ENDPOINTS.astrologerDetail}/${userId}?completed=true`);
  const astrologer = parseAstrologer(data?.astrologer);
  if (!astrologer) {
    throw new Error("Astrologer not found");
  }
  const events = (data?.events ?? []) as ConsultationAstrologerDetail["events"];
  return { astrologer, events };
}

/** @param userId — astrologer account `user_id`. */
export async function fetchAstrologerSlots(
  userId: number,
  date: string
): Promise<ConsultationSlot[]> {
  const { data } = await http.post<{ available_slots?: ConsultationSlot[] }>(
    API_ENDPOINTS.astrologerSlots,
    { astrologer_id: userId, date }
  );
  return data?.available_slots ?? [];
}

export async function bookConsultation(body: {
  start_datetime: string;
  end_datetime: string;
  share_horoscope: boolean;
  languages: string[];
  category: string[];
  astrologer_id: number;
  payment_amount: number;
  currency: string;
  coupon_id?: number | null;
}): Promise<ConsultationRazorpayOrder> {
  const { data } = await http.post<{ event?: ConsultationRazorpayOrder }>(
    API_ENDPOINTS.astrologerBook,
    body
  );
  if (!data?.event?.id) {
    throw new Error("Could not create booking");
  }
  return data.event;
}

export async function verifyConsultationPayment(body: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<{ status?: string; data?: ConsultationEventSummary }> {
  const { data } = await http.post<{ status?: string; data?: ConsultationEventSummary }>(
    API_ENDPOINTS.paymentVerify,
    body
  );
  return data ?? {};
}

export async function fetchConsultationEvent(
  eventId: number
): Promise<ConsultationEventSummary | null> {
  const { data } = await http.get<ConsultationEventSummary>(
    `${API_ENDPOINTS.astroEvents}/${eventId}`
  );
  return data?.id ? data : null;
}

export async function fetchConsultationQuestions(
  eventId: number
): Promise<ConsultationQuestion[]> {
  const { data } = await http.get<ConsultationQuestion[]>(
    `${API_ENDPOINTS.astroEvents}/${eventId}/questions`
  );
  return Array.isArray(data) ? data : [];
}

export async function addConsultationQuestion(
  eventId: number,
  question: string,
  index: number
): Promise<void> {
  await http.post(`${API_ENDPOINTS.astroEvents}/${eventId}/questions`, {
    question,
    index,
  });
}

export async function applyConsultationCoupon(body: {
  coupon_name: string;
  type: "consultation";
  currency: string;
  amount: number;
}): Promise<ConsultationCouponResult> {
  const { data } = await http.post<ConsultationCouponResult>(
    API_ENDPOINTS.paymentApplyCoupon,
    { ...body, plan_id: null }
  );
  return data;
}
