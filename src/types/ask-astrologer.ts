/** Ask Astrologer feature types — mirrors backend AskAstrologerRequest. */

export type AskAstrologerStatus =
  | "pending_payment"
  | "paid"
  | "assigned"
  | "answered"
  | "cancelled";

export interface AskAstrologerRequest {
  id: number;
  status: AskAstrologerStatus;
  user_question: string;
  ai_response: string;
  preferred_languages: string[];
  customer_name: string | null;
  date_of_birth: string | null;
  time_of_birth: string | null;
  place_of_birth: string | null;
  rashi: string | null;
  nakshatra: string | null;
  answer_text: string | null;
  answer_voice_url: string | null;
  answer_voice_duration_sec: number | null;
  answered_at: string | null;
  base_price: number | null;
  currency: string | null;
  paid_at: string | null;
  created_at: string | null;
  answered_by_astrologer_name?: string | null;
  answered_by_astrologer_profile_path?: string | null;
}

export interface AskAstrologerPricing {
  plan_id: number;
  local_plan_price: number;
  foreign_plan_price: number;
  cgst_percentage: number;
  sgst_percentage: number;
  cgst: number;
  sgst: number;
  inr_total: number;
  usd_total: number;
}

export interface AskAstrologerCreatePayload {
  user_question: string;
  ai_response: string;
  preferred_languages: string[];
  currency: string;
}

export interface AskAstrologerOrderResponse {
  request_id: number;
  razorpay_order_id: string;
  amount: number;
  currency: string;
  key: string;
}

export interface AskAstrologerVerifyPayload {
  request_id: number;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/** Stored in sessionStorage during the Ask Astrologer flow. */
export interface AskAstrologerFlowState {
  user_question: string;
  ai_response: string;
  preferred_languages?: string[];
}
