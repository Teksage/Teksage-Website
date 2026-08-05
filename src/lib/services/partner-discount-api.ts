import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { PartnerDiscountState } from "@/types/partner-referral";

type PartnerDiscountApi = {
  has_discount?: boolean;
  consult_pct?: number;
  yearly_pct?: number;
  consult_status?: string;
  yearly_status?: string;
  expires_at?: string | null;
  days_left?: number;
  show_subscription_row?: boolean;
  show_consultation_row?: boolean;
  code?: string | null;
  code_active?: boolean;
  message?: string | null;
};

/** Live partner discount (respects admin active/inactive immediately). */
export async function fetchPartnerMyDiscount(): Promise<PartnerDiscountState | null> {
  const { data } = await http.get<PartnerDiscountApi>(
    API_ENDPOINTS.partnerMyDiscount
  );
  if (!data) return null;
  return {
    hasDiscount: Boolean(data.has_discount),
    consultPct: Number(data.consult_pct || 0),
    yearlyPct: Number(data.yearly_pct || 0),
    consultStatus: data.consult_status || "na",
    yearlyStatus: data.yearly_status || "na",
    expiresAt: data.expires_at || undefined,
    daysLeft: Number(data.days_left || 0),
    showSubscriptionRow: Boolean(data.show_subscription_row),
    showConsultationRow: Boolean(data.show_consultation_row),
    code: data.code || undefined,
    codeActive:
      data.code_active === undefined ? true : Boolean(data.code_active),
    message: data.message || undefined,
  };
}
