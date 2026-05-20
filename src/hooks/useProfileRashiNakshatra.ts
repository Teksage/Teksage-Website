"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
      setError(PROFILE_DETAILS.rashiResolveError);
    } finally {
      setBusy(false);
    }
  }, [enabled, dateOfBirth, timeOfBirth, birthLocation]);

  const prevEnabled = useRef(false);
  useEffect(() => {
    if (enabled && !prevEnabled.current) {
      void runFetch();
    }
    prevEnabled.current = enabled;
  }, [enabled, runFetch]);

  useEffect(() => {
    if (!enabled) return;
    const timer = window.setTimeout(() => {
      void runFetch();
    }, 500);
    return () => window.clearTimeout(timer);
  }, [enabled, dateOfBirth, timeOfBirth, birthLocation, runFetch]);

  return { rashiBusy: busy, rashiError: error, refreshRashi: runFetch };
}
