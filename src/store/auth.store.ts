import { STORAGE_KEYS } from "@/lib/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "@/types";

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserProfile, token: string) => void;
  clearAuth: () => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true }),

      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),

      updateUser: (updates) =>
        set((state) => {
          if (!state.user) return { user: null };
          const next: UserProfile = { ...state.user };
          for (const [key, value] of Object.entries(updates)) {
            // Keep explicit `false` (e.g. showPartnerReferralSection).
            if (value !== undefined) {
              (next as Record<string, unknown>)[key] = value;
            }
          }
          return { user: next };
        }),
    }),
    {
      name: STORAGE_KEYS.authStore,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
