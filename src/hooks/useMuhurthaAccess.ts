"use client";

import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { fetchProfile } from "@/lib/services/profile";

function profileComplete(user: ReturnType<typeof useAuthStore.getState>["user"]) {
  return Boolean(user?.nakshatra?.trim() && user?.rashi?.trim());
}

export function useMuhurthaAccess() {
  const { user, isAuthenticated } = useAuthStore();
  const isPremium = Boolean(user?.isPremium);
  const hasProfile = profileComplete(user);
  const [isHydratingProfile, setIsHydratingProfile] = useState(false);
  const hydratedForUserRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      hydratedForUserRef.current = null;
      queueMicrotask(() => setIsHydratingProfile(false));
      return;
    }

    if (hasProfile) {
      hydratedForUserRef.current = user.id;
      queueMicrotask(() => setIsHydratingProfile(false));
      return;
    }

    // Avoid flashing "Complete profile" before login-thin user is hydrated.
    if (hydratedForUserRef.current === user.id) return;

    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setIsHydratingProfile(true);
    });

    fetchProfile()
      .then((profile) => {
        if (cancelled) return;
        useAuthStore.getState().updateUser(profile);
        hydratedForUserRef.current = user.id;
      })
      .catch(() => {
        if (!cancelled) hydratedForUserRef.current = user.id;
      })
      .finally(() => {
        if (!cancelled) setIsHydratingProfile(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user?.id, hasProfile]);

  const maySearch = isAuthenticated && isPremium && hasProfile;

  return {
    user,
    isAuthenticated,
    isPremium,
    hasProfile,
    isHydratingProfile,
    maySearch,
  };
}
