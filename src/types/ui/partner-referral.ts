import type { PartnerDiscountState } from "@/types/partner-referral";

export type PartnerReferralCodeSectionProps = {
  show: boolean;
  onApplied?: () => void;
};

export type PartnerDiscountHomeBannerProps = {
  discount: PartnerDiscountState | null | undefined;
  className?: string;
  /** `sidebar` = compact card in desktop left rail (all routes). */
  variant?: "home" | "sidebar";
};

export type HomeReferralTopBarPillProps = {
  discount: PartnerDiscountState | null | undefined;
  className?: string;
};
