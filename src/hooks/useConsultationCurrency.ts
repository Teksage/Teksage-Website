"use client";

import { useMemo } from "react";
import {
  consultationCurrencyForLocation,
  type ConsultationCurrency,
} from "@/lib/consultation-currency";
import { useAuthStore } from "@/store/auth.store";

export function useConsultationCurrency(): ConsultationCurrency {
  const preferredLocation = useAuthStore((s) => s.user?.preferredLocation);
  const countryCode = useAuthStore((s) => s.user?.countryCode);
  const profileTimezone = useAuthStore((s) => s.user?.timezone);

  return useMemo(() => {
    const browserTimezone =
      typeof window !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : undefined;
    return consultationCurrencyForLocation(preferredLocation, {
      countryCode,
      timezone: profileTimezone,
      browserTimezone,
    });
  }, [preferredLocation, countryCode, profileTimezone]);
}
