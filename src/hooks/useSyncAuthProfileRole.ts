"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth.store";
import { fetchProfile } from "@/lib/services/profile";

/**
 * Hydrates auth user from profile API after login.
 * Needed for role (`user_type`) and INR/USD (preferred_location, country_code, timezone).
 * Login verify alone does not include preferred_location.
 */
export function useSyncAuthProfileRole(): void {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const userId = useAuthStore((s) => s.user?.id);
  const syncedForUserRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      syncedForUserRef.current = null;
      return;
    }
    if (syncedForUserRef.current === userId) return;

    let cancelled = false;
    fetchProfile()
      .then((profile) => {
        if (cancelled) return;
        syncedForUserRef.current = userId;
        useAuthStore.getState().updateUser(profile);
      })
      .catch(() => {
        /* non-blocking */
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, userId]);
}
