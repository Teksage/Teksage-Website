"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth.store";
import { fetchProfile } from "@/lib/services/profile";

/**
 * Syncs `user.userType` from profile API (`user_type` field).
 * Home/sidebar rely on role but profile page is not always visited after login.
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
        if (cancelled || !profile.userType?.trim()) return;
        syncedForUserRef.current = userId;
        useAuthStore.getState().updateUser({ userType: profile.userType });
      })
      .catch(() => {
        /* non-blocking */
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, userId]);
}
