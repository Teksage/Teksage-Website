/** Fetch Astrosoft-style Daily/Monthly ephemeris for birth place. */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HOROSCOPE_SCREEN } from "@/lib/constants";
import { fetchHoroscopeEphemeris } from "@/lib/services/ephemeris";
import type { EphemerisMode, EphemerisPayload } from "@/types";

export function useEphemeris(year: number, month: number, mode: EphemerisMode) {
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
      const payload = await fetchHoroscopeEphemeris({ year, month, mode });
      setData(payload);
      hasData.current = true;
    } catch {
      if (!hasData.current) setData(null);
      setError(HOROSCOPE_SCREEN.ephemerisError);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [year, month, mode]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, isLoading, isRefreshing, error, reload: load };
}
