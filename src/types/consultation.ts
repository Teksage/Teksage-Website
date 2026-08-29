/** Consultation booking — mirrors Flutter `AstrologerUserConsult` models + FastAPI astrologer routes. */

export interface ConsultationAstrologerUser {
  user_id: number;
  first_name?: string | null;
  last_name?: string | null;
  email?: string;
  preferred_location?: string | null;
}

export interface ConsultationAstrologer {
  astrologer_id: number;
  user_id: number;
  expertise: string[];
  languages: string[];
  experience?: number;
  local_consulting_fee?: number;
  foreign_consulting_fee?: number;
  customer_rating?: number | null;
  /** Optional list payload — total completed review events when API sends it. */
  review_count?: number | null;
  astrologer_profile_info?: string | null;
  picture?: string | null;
  match_percentage?: number;
  /** Public marketing profile URL/path (teksage.app) — same as ask-answer “View profile”. */
  profile_link?: string | null;
  user?: ConsultationAstrologerUser;
}

export interface ConsultationReviewEvent {
  rating?: number | null;
  customer_id?: number;
  first_name?: string | null;
  last_name?: string | null;
}

export interface ConsultationAstrologerDetail {
  astrologer: ConsultationAstrologer;
  events: ConsultationReviewEvent[];
}

export interface ConsultationSlot {
  start_datetime: string;
  end_datetime: string;
  event_booked: boolean;
}

/** Per-day availability for the slots date strip. */
export type ConsultationDaySlotStatus = "open" | "full" | "none" | "check_later";

export interface ConsultationDaySlotSummary {
  open: number;
  total: number;
  status: ConsultationDaySlotStatus;
}

export interface ConsultationRazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  key: string;
}

export interface ConsultationCouponResult {
  plan_price: number;
  discount: number;
  discounted_price: number;
  cgst_percentage: number;
  sgst_percentage: number;
  cgst: number;
  sgst: number;
  final_price: number;
  coupon_id?: number;
}

export interface ConsultationFilter {
  categories: string[];
  languages: string[];
}

export interface ConsultationBookingDraft extends ConsultationFilter {
  astrologerId: number;
  astrologerName: string;
  astrologerPicture?: string | null;
  fee: number;
  currency: string;
  slotStart: string;
  slotEnd: string;
}

export interface ConsultationEventSummary {
  id: number;
  start_datetime?: string;
  end_datetime?: string;
  event_link?: string | null;
  category?: string[];
  languages?: string[];
  consultation_fee?: number;
  currency?: string;
}

export interface ConsultationQuestion {
  id: number;
  question: string;
  answer?: string | null;
  index?: number;
}

export interface ConsultationCompletedBooking {
  eventId: number;
  eventLink?: string | null;
  startDatetime: string;
  endDatetime: string;
  categories: string[];
  languages: string[];
  consultationFee: number;
  currency: string;
  astrologerName: string;
  astrologerPicture?: string | null;
}

/** User consultation home — mirrors Flutter `AstroConsultationEventModel`. */
export interface ConsultationUserEvent {
  id: number;
  astrologerId: number;
  status: "confirmed" | "completed" | string;
  startDatetime: string;
  endDatetime: string;
  eventLink?: string | null;
  queriesAnswered?: boolean | null;
  astrologerFirstName?: string | null;
  astrologerLastName?: string | null;
  astrologerPicture?: string | null;
  categories: string[];
  languages: string[];
  consultationFee: number;
  currency: string;
  rating?: number | null;
}
