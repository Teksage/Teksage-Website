export type PartnerDiscountState = {
  hasDiscount: boolean;
  consultPct: number;
  yearlyPct: number;
  consultStatus: string;
  yearlyStatus: string;
  expiresAt?: string;
  daysLeft: number;
  showSubscriptionRow: boolean;
  showConsultationRow: boolean;
  /** Current referral code string (updates if admin renames). */
  code?: string;
  /** False when admin set code/partner inactive — discount not usable. */
  codeActive?: boolean;
  message?: string;
};
