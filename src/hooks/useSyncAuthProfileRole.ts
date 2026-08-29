"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth.store";
import { fetchProfile } from "@/lib/services/profile";

function hasBirthChartFields(
  user: ReturnType<typeof useAuthStore.getState>["user"]
) {
  return Boolean(user?.nakshatra?.trim() && user?.rashi?.trim());
}

/**
 * Hydrates auth user from profile API after login.
 * Needed for role (`user_type`) and INR/USD (preferred_location, country_code, timezone).
 * Login verify alone does not include preferred_location.
 */
export function useSyncAuthProfileRole(): void {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const userId = useAuthStore((s) => s.user?.id);
  const hasChart = useAuthStore((s) => hasBirthChartFields(s.user));
  const syncedForUserRef = useRef<string | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      syncedForUserRef.current = null;
      return;
    }

    // Re-fetch when chart fields are missing (e.g. fresh login / idle re-auth).
    if (syncedForUserRef.current === userId && hasChart) return;
    if (inFlightRef.current) return;

    let cancelled = false;
    inFlightRef.current = true;

    fetchProfile()
      .then((profile) => {
        if (cancelled) return;
        syncedForUserRef.current = userId;
        const token = useAuthStore.getState().token;
        if (token) {
          useAuthStore.getState().setAuth(profile, token);
        } else {
          useAuthStore.getState().updateUser(profile);
        }
      })
      .catch(() => {
        /* non-blocking — feature pages may fetch again */
      })
      .finally(() => {
        inFlightRef.current = false;
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, userId, hasChart]);
}
