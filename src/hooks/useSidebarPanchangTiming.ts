"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import {
  filterAuspiciousSlots,
  formatSidebarAuspiciousTime,
} from "@/lib/sidebar-panchang-display";
import { fetchPanchang } from "@/lib/services/panchang";
import { useAuthStore } from "@/store/auth.store";
import type { PanchangDetail } from "@/types";

function profileSignature(user: ReturnType<typeof useAuthStore.getState>["user"]) {
  return [
    user?.dateOfBirth,
    user?.timeOfBirth,
    user?.placeOfBirth,
    user?.preferredLocation,
    user?.rashi,
    user?.nakshatra,
  ].join("|");
}

/**
 * Panchang timing rows for the home header strip.
 * Fetches for any logged-in user (backend `/panchang` is auth + horoscope, not premium-only).
 */
export function useSidebarPanchangTiming() {
  const { version: languageVersion } = useAppLanguage();
  const { user, isAuthenticated } = useAuthStore();
  const isPremium = Boolean(user?.isPremium);
  const signature = profileSignature(user);

  const [panchang, setPanchang] = useState<PanchangDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(() => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    fetchPanchang()
      .then((payload) => setPanchang(payload.panchang))
      .catch(() => setPanchang(null))
      .finally(() => setIsLoading(false));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      queueMicrotask(() => setPanchang(null));
      return;
    }
    queueMicrotask(() => load());
  }, [isAuthenticated, load, languageVersion, signature]);

  return {
    isAuthenticated,
    isPremium,
    isLoading: isAuthenticated && isLoading,
    rahuKala: panchang?.rahuKala?.trim() || undefined,
    yamaKanda: panchang?.yamaKanda?.trim() || undefined,
    auspiciousTime: formatSidebarAuspiciousTime(panchang?.auspiciousTime),
    auspiciousSlots: filterAuspiciousSlots(panchang?.auspiciousTime),
  };
}
