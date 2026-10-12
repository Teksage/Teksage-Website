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
  event: MarathonEvent;
  slotId: number | null;
  onSelect: (id: number) => void;
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
  title: string;
  lines: string[];
  categories?: string[];
  closesAt?: string | null;
  status?: string | null;
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
  user_name: string;
  summary: string | null;
};

export type MarathonBookPanelProps = {
  event: MarathonEvent;
  slotId: number;
};

export type MarathonCheckoutViewProps = {
  marathonId: number;
  slotId: number;
};

export type MarathonCheckoutStep = 1 | 2 | 3;

export type MarathonCheckoutStepLabel = {
  title: string;
  caption: string;
};

export type MarathonCheckoutStepperProps = {
  step: MarathonCheckoutStep;
  labels: MarathonCheckoutStepLabel[];
};

export type MarathonCheckoutSignInProps = {
  onComplete: (step: MarathonCheckoutStep) => void;
};

export type MarathonCheckoutProfileProps = {
  onComplete: () => void;
};

export type MarathonCheckoutContactProps = {
  mode: "email" | "mobile";
  onVerified: () => void;
};

export type MarathonCheckoutOrder = {
  key: string;
  id: string;
  amount: number;
  currency: string;
  slot_id: number;
  marathon_id: number;
};
