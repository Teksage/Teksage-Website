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
 * Hydrates auth-store profile from GET /profile after login.
 * Login OTP only returns a thin user (no rashi/nakshatra/birth fields);
 * without this, Event Planner and similar gates falsely show "Complete profile".
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
        useAuthStore.getState().updateUser(profile);
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
