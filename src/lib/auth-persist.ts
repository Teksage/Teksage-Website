import { LEGACY_AUTH_STORAGE_KEYS, STORAGE_KEYS } from "@/lib/constants";
import type { UserProfile } from "@/types";

type StoredProfileRole = {
  userType?: string;
  user_type?: string;
};

type PersistedAuthState = {
  user?: UserProfile | null;
  token?: string | null;
  isAuthenticated?: boolean;
};

type ZustandPersistPayload = {
  state?: PersistedAuthState;
};

/** Reads Zustand `persist` JSON from localStorage (`teksage-auth-store`). */
export function readPersistedAuthState(): PersistedAuthState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.authStore);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ZustandPersistPayload;
    return parsed.state ?? null;
  } catch {
    return null;
  }
}

export function normalizeStoredUser(user: UserProfile): UserProfile {
  const role =
    user.userType?.trim() ||
    (user as StoredProfileRole).user_type?.trim() ||
    undefined;
  return role && !user.userType ? { ...user, userType: role } : user;
}

/** One-time read of deprecated keys; removes them after consumption. */
export function consumeLegacyAuthSnapshot(): UserProfile | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(LEGACY_AUTH_STORAGE_KEYS.userProfile);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<UserProfile> & StoredProfileRole;
      const id =
        String(parsed.id ?? localStorage.getItem(LEGACY_AUTH_STORAGE_KEYS.userId) ?? "").trim();
      removeLegacyAuthKeys();
      if (!id) return null;
      return normalizeStoredUser({
        id,
        name: parsed.name?.trim() || "User",
        isPremium: Boolean(parsed.isPremium),
        email: parsed.email,
        mobile: parsed.mobile,
        countryCode: parsed.countryCode,
        userType: parsed.userType?.trim() || parsed.user_type?.trim() || undefined,
        firstName: parsed.firstName,
        lastName: parsed.lastName,
        preferredLocation: parsed.preferredLocation,
        timezone: parsed.timezone,
        chatLanguages: parsed.chatLanguages,
        language: parsed.language,
      });
    }
  } catch {
    removeLegacyAuthKeys();
    return null;
  }

  const legacyId = localStorage.getItem(LEGACY_AUTH_STORAGE_KEYS.userId)?.trim();
  removeLegacyAuthKeys();
  if (!legacyId) return null;
  return { id: legacyId, name: "User", isPremium: false };
}

export function removeLegacyAuthKeys(): void {
  if (typeof window === "undefined") return;
  Object.values(LEGACY_AUTH_STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
}
