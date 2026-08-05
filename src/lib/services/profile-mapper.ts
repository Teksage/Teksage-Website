import type { UserProfile } from "@/types";

/** Raw shape from `GET /api/auth/profile` success body (`profile.py`). */
export interface RawProfileResponse {
  user_id?: number | string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  mobile_number?: string | null;
  country_code?: string | null;
  is_mobile_verified?: boolean;
  is_email_verified?: boolean | null;
  date_of_birth?: string | null;
  time_of_birth?: string | null;
  birth_location?: string | null;
  preferred_location?: string | null;
  timezone?: string | null;
  chat_languages?: string | null;
  referral_source?: string | null;
  rashi?: string | null;
  nakshatra?: string | null;
  subscription?: {
    plan_status?: string | null;
    subscription_end_date?: string | null;
  } | null;
  plan_details?: Record<string, unknown> | null;
  user_type?: string | null;
  app_language?: string | null;
  is_profile_updated?: boolean | null;
  show_partner_referral_section?: boolean | null;
  partner_discount?: {
    has_discount?: boolean;
    consult_pct?: number;
    yearly_pct?: number;
    consult_status?: string;
    yearly_status?: string;
    expires_at?: string | null;
    days_left?: number;
    show_subscription_row?: boolean;
    show_consultation_row?: boolean;
  } | null;
}

export function mapRawProfileToUserProfile(
  raw: RawProfileResponse,
  options?: { isProfileUpdated?: boolean }
): UserProfile {
  const first = raw.first_name?.trim() ?? "";
  const last = raw.last_name?.trim() ?? "";
  const name =
    [first, last].filter(Boolean).join(" ") ||
    raw.email?.trim() ||
    raw.mobile_number?.trim() ||
    "User";

  let isPremium = false;
  const sub = raw.subscription;
  const hasPlanDetails =
    raw.plan_details != null && typeof raw.plan_details === "object";
  if (sub && typeof sub === "object") {
    const status = (sub.plan_status ?? "").toLowerCase().trim();
    if (status === "active") {
      isPremium = true;
    } else if (
      status !== "expired" &&
      status !== "upgraded" &&
      hasPlanDetails
    ) {
      if (sub.subscription_end_date) {
        const end = new Date(sub.subscription_end_date);
        end.setHours(23, 59, 59, 999);
        isPremium = end.getTime() >= Date.now();
      } else {
        isPremium = true;
      }
    }
  }

  const dob = raw.date_of_birth?.includes("T")
    ? raw.date_of_birth.split("T")[0]
    : raw.date_of_birth ?? undefined;

  let tob = raw.time_of_birth ?? undefined;
  if (tob?.includes("T")) {
    const p = tob.split("T")[1];
    tob = p ? p.slice(0, 5) : tob;
  } else if (tob && tob.length >= 8) {
    tob = tob.slice(0, 5);
  }

  return {
    id: String(raw.user_id ?? ""),
    name,
    firstName: first || undefined,
    lastName: last || undefined,
    email: raw.email ?? undefined,
    mobile: raw.mobile_number ?? undefined,
    countryCode: raw.country_code ?? undefined,
    isMobileVerified: Boolean(raw.is_mobile_verified),
    isEmailVerified:
      raw.is_email_verified != null ? Boolean(raw.is_email_verified) : undefined,
    dateOfBirth: dob,
    timeOfBirth: tob,
    placeOfBirth: raw.birth_location ?? undefined,
    preferredLocation: raw.preferred_location ?? undefined,
    timezone: raw.timezone?.trim() || undefined,
    chatLanguages: raw.chat_languages ?? undefined,
    referralSource: raw.referral_source ?? undefined,
    rashi: raw.rashi ?? undefined,
    nakshatra: raw.nakshatra ?? undefined,
    isPremium,
    isProfileUpdated:
      options?.isProfileUpdated ??
      (raw.is_profile_updated != null ? Boolean(raw.is_profile_updated) : true),
    userType: raw.user_type?.trim() || undefined,
    language: raw.app_language?.trim().toLowerCase() || undefined,
    showPartnerReferralSection: Boolean(
      raw.show_partner_referral_section === true
    ),
    partnerDiscount: raw.partner_discount
      ? {
          hasDiscount: Boolean(raw.partner_discount.has_discount),
          consultPct: Number(raw.partner_discount.consult_pct || 0),
          yearlyPct: Number(raw.partner_discount.yearly_pct || 0),
          consultStatus: raw.partner_discount.consult_status || "na",
          yearlyStatus: raw.partner_discount.yearly_status || "na",
          expiresAt: raw.partner_discount.expires_at || undefined,
          daysLeft: Number(raw.partner_discount.days_left || 0),
          showSubscriptionRow: Boolean(
            raw.partner_discount.show_subscription_row
          ),
          showConsultationRow: Boolean(
            raw.partner_discount.show_consultation_row
          ),
          code: raw.partner_discount.code || undefined,
          codeActive:
            raw.partner_discount.code_active === undefined
              ? true
              : Boolean(raw.partner_discount.code_active),
          message: raw.partner_discount.message || undefined,
        }
      : undefined,
  };
}

function splitFullName(name: string): { first_name: string; last_name: string } {
  const t = name.trim();
  const i = t.indexOf(" ");
  if (i === -1) return { first_name: t, last_name: "" };
  return { first_name: t.slice(0, i), last_name: t.slice(i + 1).trim() };
}

function normalizeTimeForApi(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  if (value.length === 5 && value.includes(":")) return `${value}:00`;
  return value;
}

/** Maps web `UserProfile` updates to `ProfileUpdateSchema` for `POST /api/auth/update-profile`. */
export function mapProfileUpdatesToApiBody(
  updates: Partial<UserProfile>
): Record<string, unknown> {
  const body: Record<string, unknown> = {};
  if (updates.firstName !== undefined) body.first_name = updates.firstName || null;
  if (updates.lastName !== undefined) body.last_name = updates.lastName || null;
  if (
    updates.name !== undefined &&
    updates.firstName === undefined &&
    updates.lastName === undefined
  ) {
    const { first_name, last_name } = splitFullName(updates.name);
    body.first_name = first_name;
    body.last_name = last_name;
  }
  if (updates.email !== undefined) body.email = updates.email || null;
  if (updates.mobile !== undefined) body.mobile_number = updates.mobile || null;
  if (updates.countryCode !== undefined) body.country_code = updates.countryCode || null;
  if (updates.dateOfBirth !== undefined) body.date_of_birth = updates.dateOfBirth || null;
  if (updates.timeOfBirth !== undefined) {
    body.time_of_birth = normalizeTimeForApi(updates.timeOfBirth);
  }
  if (updates.placeOfBirth !== undefined) body.birth_location = updates.placeOfBirth || null;
  if (updates.preferredLocation !== undefined) {
    body.preferred_location = updates.preferredLocation || null;
  }
  if (updates.chatLanguages !== undefined) body.chat_languages = updates.chatLanguages || null;
  if (updates.referralSource !== undefined) {
    body.referral_source = updates.referralSource || null;
  }
  return body;
}
