/** Fetch ephemeris for an Ask Astrologer consultation customer's birth place. */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { fetchAskRequestHoroscopeEphemeris } from "@/lib/services/ask-request-full-horoscope";
import type { EphemerisMode, EphemerisPayload } from "@/types";

export function useAskRequestEphemeris(
  requestId: string,
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
      const payload = await fetchAskRequestHoroscopeEphemeris(requestId, {
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
  }, [requestId, year, month, mode]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, isLoading, isRefreshing, error, reload: load };
}
