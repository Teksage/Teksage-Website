"use client";

import { useCallback, useRef, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { PROFILE_DETAILS } from "@/lib/constants/profile-details";
import { fetchRashiNakshatra } from "@/lib/services/profile-rashi";

type UseProfileRashiNakshatraArgs = {
  enabled: boolean;
  dateOfBirth: string;
  timeOfBirth: string;
  birthLocation: string;
  onResolved: (rashi: string, nakshatra: string) => void;
};

export function useProfileRashiNakshatra({
  enabled,
  dateOfBirth,
  timeOfBirth,
  birthLocation,
  onResolved,
}: UseProfileRashiNakshatraArgs) {
  const PD = useI18nConstants(PROFILE_DETAILS);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onResolvedRef = useRef(onResolved);
  onResolvedRef.current = onResolved;

  const runFetch = useCallback(async () => {
    if (!enabled) return;
    const location = birthLocation.trim();
    if (!dateOfBirth || !timeOfBirth || !location) return;

    setBusy(true);
    setError(null);
    try {
      const result = await fetchRashiNakshatra({
        dateOfBirth,
        timeOfBirth,
        birthLocation: location,
      });
      onResolvedRef.current(result.rashi, result.nakshatra);
    } catch {
      setError(PD.rashiResolveError);
    } finally {
      setBusy(false);
    }
  }, [PD.rashiResolveError, enabled, dateOfBirth, timeOfBirth, birthLocation]);

  return { rashiBusy: busy, rashiError: error, refreshRashi: runFetch };
}
