/** Astrologer portal types — mirrors Flutter `AstroConsultationEventModel`, `SlotModel`, `ConsultationEventModel`. */

export interface AstroEvent {
  id: number;
  status: "new" | "confirmed" | "completed" | string;
  customer_id: number;
  astrologer_id: number;
  start_datetime: string;
  end_datetime: string;
  booking_date: string;
  event_link: string | null;
  consultation_fee: number | null;
  currency: string | null;
  consultation_duration: number | null;
  languages: string[] | null;
  category: string[] | null;
  share_horoscope: boolean | null;
  feedback: string | null;
  rating: number | null;
  queries_answered: boolean | null;
  customer_first_name: string | null;
  customer_last_name: string | null;
  astrologer_first_name: string | null;
  astrologer_last_name: string | null;
  astrologer_picture: string | null;
}

export interface AstroEventDetail {
  id: number;
  status: string;
  start_datetime: string;
  end_datetime: string;
  consultation_duration: number | null;
  event_link: string | null;
  consultation_fee: number | null;
  currency: string | null;
  languages: string[] | null;
  category: string[] | null;
  share_horoscope: boolean | null;
  feedback: string | null;
  rating: number | null;
  queries_answered: boolean | null;
  customer: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    mobile_number: string | null;
  } | null;
  userHoroscope: AstroHoroscope | null;
  questions: AstroQuestion[];
}

export interface AstroHoroscope {
  sign?: string;
  nakshatra?: string;
  dob?: string;
  [key: string]: unknown;
}

export interface AstroQuestion {
  id: number;
  question: string;
  answer: string | null;
}

export interface AstroSlot {
  id?: number;
  start_datetime: string;
  end_datetime: string;
  astrologer_id: number;
  event_booked: boolean;
}

export interface SlotCreatePayload {
  slots: Array<{
    start_datetime: string;
    end_datetime: string;
    create?: boolean;
  }>;
}
