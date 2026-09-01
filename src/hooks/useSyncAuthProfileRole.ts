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
  const preferredLocation = useAuthStore((s) => s.user?.preferredLocation);
  const placeOfBirth = useAuthStore((s) => s.user?.placeOfBirth);
  const countryCode = useAuthStore((s) => s.user?.countryCode);
  const nakshatra = useAuthStore((s) => s.user?.nakshatra);
  const rashi = useAuthStore((s) => s.user?.rashi);
  const profileHydrated = Boolean(
    nakshatra?.trim() &&
      rashi?.trim() &&
      (preferredLocation?.trim() || placeOfBirth?.trim() || countryCode?.trim())
  );
  const syncedForUserRef = useRef<string | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || !userId) {
      syncedForUserRef.current = null;
      return;
    }

    // Re-fetch when chart or currency fields are missing (e.g. fresh login).
    if (syncedForUserRef.current === userId && profileHydrated) return;
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
  }, [isAuthenticated, userId, profileHydrated]);
}
