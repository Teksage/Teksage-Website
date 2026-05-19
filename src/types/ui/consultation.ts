import type { ReactNode } from "react";
import type {
  ConsultationAstrologer,
  ConsultationCouponResult,
  ConsultationSlot,
} from "@/types/consultation";

export interface ConsultationShellProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onBack?: () => void;
  className?: string;
}

export interface ConsultationLanguageFieldProps {
  title: string;
  /** Selected language id (API value). */
  value: string;
  options: readonly { id: string; label: string }[];
  enabled: boolean;
  error?: string | null;
  onChange: (languageId: string) => void;
}

export interface ConsultationCategoryChipsProps {
  selected: string[];
  onChange: (next: string[]) => void;
}

export interface ConsultationAstroCardProps {
  astrologer: ConsultationAstrologer;
  currency: "INR" | "USD";
  href: string;
  variant: "top" | "grid";
}

export interface ConsultationFilterChipsProps {
  categories: string[];
  languages: string[];
  onRemoveCategory: (category: string) => void;
  onRemoveLanguage: (language: string) => void;
}

export interface ConsultationAstrologerCardProps {
  astrologer: ConsultationAstrologer;
  currency: "INR" | "USD";
  href: string;
}

export interface ConsultationAuthGateProps {
  children: React.ReactNode;
  redirectPath: string;
}

export interface ConsultationSlotsShellProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onBack?: () => void;
}

export interface ConsultationSlotsCalendarProps {
  focusedMonth: Date;
  selectedDate: Date;
  today: Date;
  onFocusedMonthChange: (date: Date) => void;
  onSelectDate: (date: Date) => void;
}

export interface ConsultationSlotsAvailabilityProps {
  slots: ConsultationSlot[];
  loading: boolean;
  selected: ConsultationSlot | null;
  onSelect: (slot: ConsultationSlot) => void;
}

export interface ConsultationCheckoutPricingProps {
  astrologerName: string;
  totals: ConsultationCouponResult;
  currency: string;
}

export interface ConsultationCheckoutActionsProps {
  couponCode: string;
  shareHoroscope: boolean;
  busy: boolean;
  error: string | null;
  onCouponChange: (value: string) => void;
  onApplyCoupon: () => void;
  onShareChange: (checked: boolean) => void;
  onPay: () => void;
}
