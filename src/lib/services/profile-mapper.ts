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
  date_of_birth?: string | null;
  time_of_birth?: string | null;
  birth_location?: string | null;
  preferred_location?: string | null;
  chat_languages?: string | null;
  rashi?: string | null;
  nakshatra?: string | null;
  subscription?: { plan_status?: string | null } | null;
}

export function mapRawProfileToUserProfile(raw: RawProfileResponse): UserProfile {
  const first = raw.first_name?.trim() ?? "";
  const last = raw.last_name?.trim() ?? "";
  const name =
    [first, last].filter(Boolean).join(" ") ||
    raw.email?.trim() ||
    raw.mobile_number?.trim() ||
    "User";

  let isPremium = false;
  const sub = raw.subscription;
  if (sub && typeof sub === "object") {
    isPremium = (sub.plan_status ?? "").toLowerCase().trim() === "active";
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
    dateOfBirth: dob,
    timeOfBirth: tob,
    placeOfBirth: raw.birth_location ?? undefined,
    preferredLocation: raw.preferred_location ?? undefined,
    chatLanguages: raw.chat_languages ?? undefined,
    rashi: raw.rashi ?? undefined,
    nakshatra: raw.nakshatra ?? undefined,
    isPremium,
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
  return body;
}
