"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { fallbackHoroscopeCharts } from "@/lib/horoscope-fallback-charts";
import { fetchHoroscopeCharts } from "@/lib/services/horoscope";
import type { HoroscopeDivisionalChart, HoroscopePayload } from "@/types";

export function useHoroscopeCharts(data: HoroscopePayload | null) {
  const { version: languageVersion } = useAppLanguage();
  const [charts, setCharts] = useState<HoroscopeDivisionalChart[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(() => {
    if (!data) return;
    const fallback = fallbackHoroscopeCharts(data);
    setCharts(fallback);
    setIsLoading(true);
    fetchHoroscopeCharts()
      .then((payload) => {
        const next = (payload.charts ?? []).filter((c) => c.html?.trim());
        if (next.length > 0) setCharts(next);
      })
      .catch(() => {
        /* keep D1/D9 from the main horoscope payload */
      })
      .finally(() => setIsLoading(false));
  }, [data]);

  useEffect(() => {
    load();
  }, [load, languageVersion]);

  return { charts, isLoading, reload: load };
}
