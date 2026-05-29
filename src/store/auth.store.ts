import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfile } from "@/types";

const ZUSTAND_AUTH_STORAGE_KEY = "teksage-auth-store";

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
          const next = { ...state.user };
          (Object.keys(updates) as (keyof UserProfile)[]).forEach((key) => {
            const value = updates[key];
            if (value !== undefined) {
              (next as Record<string, unknown>)[key as string] = value;
            }
          });
          return { user: next };
        }),
    }),
    {
      name: ZUSTAND_AUTH_STORAGE_KEY,
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
