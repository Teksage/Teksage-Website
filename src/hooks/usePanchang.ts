"use client";

import { useCallback, useEffect, useState } from "react";
import { DOWNLOAD_FILENAMES, PANCHANG_SCREEN } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import {
  fetchPanchang,
  fetchPanchangSharePdf,
} from "@/lib/services/panchang";
import type { PanchangPayload } from "@/types";

export function usePanchang() {
  const { user, isAuthenticated } = useAuthStore();
  const isPremium = Boolean(user?.isPremium);
  const mayFetch = isAuthenticated && isPremium;

  const [data, setData] = useState<PanchangPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!mayFetch) return;
    setIsLoading(true);
    setError(null);
    fetchPanchang()
      .then(setData)
      .catch((e: Error) => {
        setError(e.message || PANCHANG_SCREEN.loadErrorFallback);
      })
      .finally(() => setIsLoading(false));
  }, [mayFetch]);

  useEffect(() => {
    if (!mayFetch) {
      queueMicrotask(() => {
        setData(null);
        setError(null);
      });
      return;
    }
    queueMicrotask(() => {
      load();
    });
  }, [mayFetch, load]);

  async function sharePdf(): Promise<void> {
    if (!data?.panchangId) return;
    const blob = await fetchPanchangSharePdf(data.panchangId);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = DOWNLOAD_FILENAMES.panchangPdf;
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    user,
    isAuthenticated,
    isPremium,
    data,
    isLoading,
    error,
    reload: load,
    sharePdf,
  };
}
