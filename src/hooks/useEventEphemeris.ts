/** Fetch ephemeris for a consultation customer's birth place (astrologer). */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { fetchEventHoroscopeEphemeris } from "@/lib/services/event-full-horoscope";
import type { EphemerisMode, EphemerisPayload } from "@/types";

export function useEventEphemeris(
  eventId: string,
  year: number,
  month: number,
  mode: EphemerisMode
) {
  const [data, setData] = useState<EphemerisPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasData = useRef(false);

  const load = useCallback(async () => {
    if (hasData.current) setIsRefreshing(true);
    else setIsLoading(true);
    setError(null);
    try {
      const payload = await fetchEventHoroscopeEphemeris(eventId, {
        year,
        month,
        mode,
      });
      setData(payload);
      hasData.current = true;
    } catch {
      if (!hasData.current) setData(null);
      setError(HOROSCOPE_SCREEN.ephemerisError);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [eventId, year, month, mode]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, isLoading, isRefreshing, error, reload: load };
}
