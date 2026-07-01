"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useI18nConstants } from "@/hooks/useT";
import { DOWNLOAD_FILENAMES, PANCHANG_SCREEN } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import { toIsoDate } from "@/lib/panchang-calendar";
import {
  fetchPanchang,
  fetchPanchangSharePdf,
} from "@/lib/services/panchang";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import type { PanchangPayload } from "@/types";

export function usePanchang() {
  const P = useI18nConstants(PANCHANG_SCREEN);
  const { version: languageVersion } = useAppLanguage();
  const { user, isAuthenticated } = useAuthStore();
  const isPremium = Boolean(user?.isPremium);
  const mayFetch = isAuthenticated && isPremium;

  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const selectedIso = useMemo(() => toIsoDate(selectedDate), [selectedDate]);

  const [data, setData] = useState<PanchangPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!mayFetch) return;
    setIsLoading(true);
    setError(null);
    fetchPanchang(selectedIso)
      .then(setData)
      .catch((e: Error) => {
        setError(e.message || P.loadErrorFallback);
      })
      .finally(() => setIsLoading(false));
  }, [P.loadErrorFallback, mayFetch, selectedIso]);

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
  }, [mayFetch, load, languageVersion]);

  async function sharePdf(): Promise<void> {
    if (!data?.panchangId) return;
    try {
      const blob = await fetchPanchangSharePdf(data.panchangId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = DOWNLOAD_FILENAMES.panchangPdf;
      a.click();
      URL.revokeObjectURL(url);
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.downloadSuccess);
    } catch {
      showErrorAppSnackBar(P.sharePdfError);
    }
  }

  return {
    user,
    isAuthenticated,
    isPremium,
    data,
    isLoading,
    error,
    selectedDate,
    setSelectedDate,
    reload: load,
    sharePdf,
  };
}
