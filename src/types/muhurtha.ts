/** Muhurtha API DTOs — mirrors backend `GET /api/prediction/muhurtha`. */

export const MUHURTHA_EVENT_TYPES = [
  "Job Interview",
  "Financial Investment",
  "Learning New Skill",
  "Vehicle Purchase",
  "Travel",
  "Business Decisions",
] as const;

export type MuhurthaEventType = (typeof MUHURTHA_EVENT_TYPES)[number];

export type MuhurthaReasonCode =
  | "nakshatra_not_suitable"
  | "weekday_excluded"
  | "thithi_excluded"
  | "yoga_excluded"
  | "thara_bala_excluded"
  | "chandra_bala_excluded"
  | "no_auspicious_window";

export interface MuhurthaReasonInfoProps {
  reasons: string[];
  ariaLabel: string;
  /** When set, shows this label instead of the info icon (e.g. "+2 more"). */
  triggerLabel?: string;
  triggerClassName?: string;
}

export interface MuhurthaDayResult {
  date: string;
  iso_date: string;
  is_suitable: boolean;
  reason_code?: MuhurthaReasonCode | null;
  reason_codes?: MuhurthaReasonCode[];
  rating?: string;
  window?: string;
  windows?: string[];
  weekday?: string;
  nakshatra?: string;
  thithi?: string;
  thithi_ends?: string;
  thara_bala?: number;
  chandra_bala?: number;
  amirthathi_yoga?: string;
  dayinfo?: string;
}

export interface MuhurthaResult {
  event: string;
  start_date: string;
  end_date: string;
  location: string;
  days: MuhurthaDayResult[];
  dates: MuhurthaDayResult[];
  summary_text?: string;
  message?: string;
}

export interface MuhurthaPayload {
  muhurthaId: number;
  result: MuhurthaResult;
}

export interface MuhurthaSearchParams {
  event: MuhurthaEventType;
  startDate: string;
  location: string;
}
