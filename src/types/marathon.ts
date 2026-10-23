import type { ReactNode } from "react";

export type MarathonSlot = {
  id: number;
  starts_at: string;
  ends_at: string;
  seat_count: number;
  seats_left: number;
  label: string;
};

export type MarathonSlotStripProps = {
  /** Slot ids the signed-in user already booked for this event. */
  bookedSlotIds?: number[];
  event: MarathonEvent;
  slotId: number | null;
  onSelect: (id: number) => void;
};

export type MarathonListViewProps = {
  focusSlug?: string;
};

export type MarathonListEmptyProps = {
  upcoming: boolean;
};

export type MarathonEventBannerProps = {
  event: MarathonEvent;
  linked?: boolean;
  canOpen?: boolean;
  bookings?: MarathonBooking[];
};

export type MarathonBookingHistoryProps = {
  rows: MarathonBooking[];
};

export type MarathonMineSectionProps = {
  marathonId: number;
  rows?: MarathonBooking[];
};

export type MarathonEvent = {
  id: number;
  name: string;
  public_slug?: string | null;
  description?: string | null;
  starts_at: string;
  ends_at: string;
  timezone: string;
  fee: string;
  usd_fee?: string | null;
  categories: string[];
  status: string;
  admin_ended?: boolean;
  booking_open: boolean;
  booking_closes_at: string;
  participant_count?: number;
  slots: MarathonSlot[];
};

export type MarathonRegisterTimerProps = {
  closesAt: string;
  className?: string;
  compact?: boolean;
};

export type MarathonEventsHeroProps = {
  title: string;
  subtitle: string;
  hint: string;
};

export type MarathonPortalCardProps = {
  startsAt: string;
  locale: string;
  /** Profile timezone from Current Location; omit for browser local. */
  timeZone?: string | null;
  title: string;
  lines: string[];
  categories?: string[];
  closesAt?: string | null;
  status?: string | null;
  onOpen?: () => void;
  children?: ReactNode;
};

export type MarathonAstrologerShellProps = {
  title: string;
  subtitle: string;
  backHref: string;
  children: ReactNode;
};

export type MarathonAstrologerCardProps = {
  startsAt: string;
  endsAt?: string | null;
  locale: string;
  timeZone?: string | null;
  category?: string;
  status: ReactNode;
  active: boolean;
  title: string;
  lines?: string[];
  summary?: string;
  onOpen?: () => void;
  children?: ReactNode;
};

export type MarathonAstrologerBookingsProps = {
  marathonId: number;
};

export type MarathonDraft = {
  id: number;
  name: string;
  starts_at: string;
  ends_at: string;
  timezone: string;
  booking_closes_at?: string | null;
  created_at?: string | null;
  categories: string[];
  confirmed: boolean;
  admin_ended?: boolean;
  participant_count?: number;
};

export type MarathonBooking = {
  id: number;
  marathon_id: number;
  slot_id: number;
  public_slug?: string | null;
  status: string;
  fee: string;
  currency: string;
  categories: string[];
  event_name: string;
  admin_ended?: boolean;
  timezone: string;
  starts_at: string;
  ends_at: string;
  astrologer_name: string | null;
  meeting_link: string | null;
  event_id: number | null;
  user_name: string;
  summary: string | null;
  customer_query?: string | null;
  preferred_language?: string | null;
  related_profile_id?: number | null;
  consult_for?: "self" | "other" | null;
  member_display_name?: string | null;
  relationship?: string | null;
};

export type MarathonBookPanelProps = {
  event: MarathonEvent;
  slotId: number;
};

export type MarathonCheckoutViewProps = {
  marathonId: number | string;
  slotId: number;
  /** Prefer slug for Expert Hours URLs; numeric id still works. */
  eventKey?: string | number;
};

export type MarathonCheckoutStep = 1 | 2 | 3;

export type MarathonCheckoutStepLabel = {
  title: string;
  caption: string;
};

export type MarathonCheckoutStepperProps = {
  step: MarathonCheckoutStep;
  labels: MarathonCheckoutStepLabel[];
  /** Only completed Step 2 is selectable from Step 3 (never Step 1 after login). */
  onSelectStep?: (step: MarathonCheckoutStep) => void;
};

export type MarathonCheckoutSignInProps = {
  onComplete: (step: MarathonCheckoutStep) => void;
};

export type MarathonCheckoutLoginOtpProps = {
  contact: string;
  tab: "email" | "mobile";
  countryCode: string;
  error: string;
  onConfirm: (code: string) => void;
};

export type MarathonBirthDraft = {
  first: string;
  last: string;
  dob: string;
  tob: string;
  birth: string;
  birthFull: string;
  current: string;
  currentFull: string;
};

export type RelatedProfile = {
  id: number;
  first_name: string;
  last_name: string;
  display_name: string;
  relationship: string;
  preferred_location: string;
  date_of_birth: string | null;
  time_of_birth: string | null;
  place_of_birth: string | null;
};

export type RelatedProfileInput = {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  time_of_birth: string;
  place_of_birth: string;
  preferred_location: string;
  relationship: string;
};

export type MarathonCheckoutProfileResult = {
  customerQuery: string;
  preferredLanguage: string;
  relatedProfileId: number | null;
  memberDisplayName: string | null;
  relationship: string | null;
  /** Birth line already entered on this step, shown again on payment review. */
  bornLine?: string;
};

export type MarathonCheckoutProfileProps = {
  onComplete: (result: MarathonCheckoutProfileResult) => void;
  /** Prefill when returning from Pay → Birth details. */
  initialQuery?: string;
  initialLanguage?: string;
  initialRelatedProfileId?: number | null;
  className?: string;
};

export type MarathonCheckoutBirthFieldsProps = {
  draft: MarathonBirthDraft;
  onChange: (next: MarathonBirthDraft) => void;
  className?: string;
};

export type MarathonCheckoutContactProps = {
  mode: "email" | "mobile";
  /** Others bookings need the registered-user wording. A new account uses Email / Phone Number. */
  clarifyOwner?: boolean;
  /** Already-verified account email or mobile. Shown locked so checkout does not ask again. */
  initialValue?: string;
  initialDial?: string;
  alreadyVerified?: boolean;
  onVerified: () => void;
};

export type MarathonFeeSummaryProps = {
  fee: string;
  currency: string;
  /** Receipt of money already collected. Checkout leaves this off and adds GST on the fee. */
  paid?: boolean;
};

export type MarathonCheckoutOrder = {
  key: string;
  id: string;
  amount: number;
  currency: string;
  slot_id: number;
  marathon_id: number;
};
