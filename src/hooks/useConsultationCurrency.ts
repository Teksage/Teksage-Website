"use client";

import { useMemo } from "react";
import {
  consultationCurrencyForLocation,
  type ConsultationCurrency,
} from "@/lib/consultation-currency";
import { useAuthStore } from "@/store/auth.store";

export function useConsultationCurrency(): ConsultationCurrency {
  const preferredLocation = useAuthStore((s) => s.user?.preferredLocation);
  const placeOfBirth = useAuthStore((s) => s.user?.placeOfBirth);
  const countryCode = useAuthStore((s) => s.user?.countryCode);
  const profileTimezone = useAuthStore((s) => s.user?.timezone);

  return useMemo(() => {
    const loc = preferredLocation?.trim() || placeOfBirth?.trim();
    const browserTimezone =
      typeof window !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : undefined;
    return consultationCurrencyForLocation(loc, {
      countryCode,
      timezone: profileTimezone,
      browserTimezone,
    });
  }, [preferredLocation, placeOfBirth, countryCode, profileTimezone]);
}
