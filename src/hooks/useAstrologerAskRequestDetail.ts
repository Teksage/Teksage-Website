"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchAstrologerAskRequestDetail } from "@/lib/services/astrologer-ask-requests";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

export function useAstrologerAskRequestDetail(requestId: string | number | null) {
  const [request, setRequest] = useState<AskAstrologerRequest | null>(null);
  const [loading, setLoading] = useState(Boolean(requestId));
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (requestId === null || requestId === undefined) return;
    const id = String(requestId).trim();
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAstrologerAskRequestDetail(id);
      setRequest(data);
    } catch (err) {
      setRequest(null);
      setError(err instanceof Error ? err.message : "Failed to load request");
    } finally {
      setLoading(false);
    }
  }, [requestId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { request, loading, error, reload: load };
}
