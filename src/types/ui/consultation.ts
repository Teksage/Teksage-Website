import type { ReactNode } from "react";
import type {
  ConsultationAstrologer,
  ConsultationCouponResult,
  ConsultationReviewEvent,
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
  compact?: boolean;
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

export interface ConsultationDetailReviewsProps {
  events: ConsultationReviewEvent[];
  totalReviewCount: number;
  averageRating?: number | null;
  seeAllUrl?: string | null;
  fallbackCategories?: string[];
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

export interface ConsultationBookingFeesBlockProps {
  totals: ConsultationCouponResult;
  currency: string;
  couponCode: string;
  couponApplied: boolean;
  /** Partner referral auto-applied — disable promo input; show savings under SGST. */
  referralLocked?: boolean;
  promoError: string | null;
  busy: boolean;
  onCouponChange: (value: string) => void;
  onApplyCoupon: () => void;
}
