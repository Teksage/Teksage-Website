"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchMyAskRequests } from "@/lib/services/ask-astrologer";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

export function useAskAstrologer() {
  const [requests, setRequests] = useState<AskAstrologerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMyAskRequests();
      setRequests(data);
    } catch {
      setError("load_failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { requests, loading, error, refresh };
}
