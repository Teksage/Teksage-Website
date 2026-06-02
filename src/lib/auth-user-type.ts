import { clearAuthCookie } from "@/lib/auth-cookie";
import {
  consumeLegacyAuthSnapshot,
  normalizeStoredUser,
  readPersistedAuthState,
  removeLegacyAuthKeys,
} from "@/lib/auth-persist";
import { isClientLoggedIn } from "@/lib/auth-session";
import { STORAGE_KEYS } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";

/** Keep Zustand in sync with `teksage_auth_token` (source of truth for session). */
export function syncAuthStoreFromSession(): void {
  if (typeof window === "undefined") return;

  const token = localStorage.getItem(STORAGE_KEYS.authToken)?.trim();
  const state = useAuthStore.getState();

  if (!token) {
    if (state.isAuthenticated) state.clearAuth();
    clearAuthCookie();
    removeLegacyAuthKeys();
    return;
  }

  if (state.isAuthenticated && state.token === token && state.user?.id) {
    restoreUserTypeIfMissing();
    removeLegacyAuthKeys();
    return;
  }

  const persisted = readPersistedAuthState();
  if (persisted?.user?.id) {
    state.setAuth(normalizeStoredUser(persisted.user), token);
    restoreUserTypeIfMissing();
    removeLegacyAuthKeys();
    return;
  }

  const legacyUser = consumeLegacyAuthSnapshot();
  if (legacyUser) {
    state.setAuth(legacyUser, token);
    restoreUserTypeIfMissing();
    return;
  }
}

/** Login stores `userType`; profile API omits it — restore from persist snapshot if cleared. */
export function restoreUserTypeIfMissing(): void {
  if (typeof window === "undefined" || !isClientLoggedIn()) return;

  const user = useAuthStore.getState().user;
  if (!user || user.userType?.trim()) return;

  const role = readPersistedAuthState()?.user?.userType?.trim();
  if (role) useAuthStore.getState().updateUser({ userType: role });
}
