import { STORAGE_KEYS } from "@/lib/constants";
import { clearAuthCookie } from "@/lib/auth-cookie";
import { isClientLoggedIn } from "@/lib/auth-session";
import { useAuthStore } from "@/store/auth.store";
import type { UserProfile } from "@/types";

type StoredProfileRole = {
  userType?: string;
  user_type?: string;
};

function parseStoredUser(raw: string): UserProfile | null {
  const parsed = JSON.parse(raw) as Partial<UserProfile> & StoredProfileRole;
  const id = String(parsed.id ?? localStorage.getItem(STORAGE_KEYS.userId) ?? "").trim();
  if (!id) return null;

  return {
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
    chatLanguages: parsed.chatLanguages,
    language: parsed.language,
  };
}

/** Keep Zustand in sync with `teksage_auth_token` (source of truth for session). */
export function syncAuthStoreFromSession(): void {
  if (typeof window === "undefined") return;

  const token = localStorage.getItem(STORAGE_KEYS.authToken)?.trim();
  const state = useAuthStore.getState();

  if (!token) {
    if (state.isAuthenticated) state.clearAuth();
    clearAuthCookie();
    return;
  }

  if (state.isAuthenticated && state.token === token) {
    restoreUserTypeIfMissing();
    return;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.userProfile);
    if (raw) {
      const user = parseStoredUser(raw);
      if (user) {
        state.setAuth(user, token);
        restoreUserTypeIfMissing();
        return;
      }
    }
  } catch {
    /* ignore corrupt snapshot */
  }

  const userId = localStorage.getItem(STORAGE_KEYS.userId)?.trim();
  if (userId) {
    state.setAuth({ id: userId, name: "User", isPremium: false }, token);
  }
}

/** Login stores `userType`; profile API omits it — restore from login snapshot if cleared. */
export function restoreUserTypeIfMissing(): void {
  if (typeof window === "undefined" || !isClientLoggedIn()) return;

  const user = useAuthStore.getState().user;
  if (!user || user.userType?.trim()) return;

  try {
    const raw = localStorage.getItem(STORAGE_KEYS.userProfile);
    if (!raw) return;
    const parsed = JSON.parse(raw) as StoredProfileRole;
    const role = parsed.userType?.trim() || parsed.user_type?.trim();
    if (role) useAuthStore.getState().updateUser({ userType: role });
  } catch {
    /* ignore corrupt snapshot */
  }
}
