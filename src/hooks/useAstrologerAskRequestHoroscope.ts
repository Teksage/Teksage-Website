"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAskRequestHoroscopeDetail } from "@/lib/services/ask-request-full-horoscope";
import type { AskRequestHoroscopeDetailResponse } from "@/types/astrologer-portal";

export function useAstrologerAskRequestHoroscope(requestId: string | null) {
  const [data, setData] = useState<AskRequestHoroscopeDetailResponse | null>(null);
  const [loading, setLoading] = useState(Boolean(requestId));
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!requestId?.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAskRequestHoroscopeDetail(requestId.trim());
      setData(res);
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : "Failed to load horoscope");
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
}
