"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useI18nConstants } from "@/hooks/useT";
import { DOWNLOAD_FILENAMES } from "@/lib/constants";
import {
  PREDICTION_PROFILE_INCOMPLETE,
  mapPredictionApiStringError,
} from "@/lib/prediction-request-error";
import { useAuthStore } from "@/store/auth.store";
import {
  fetchHoroscope,
  fetchHoroscopePdf,
} from "@/lib/services/horoscope";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import { HOROSCOPE_SCREEN } from "@/lib/constants/horoscope-screen";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import type { HoroscopePayload } from "@/types";

function horoscopeErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const d = err.response?.data as { detail?: string; data?: string } | undefined;
    if (typeof d?.detail === "string") {
      return mapPredictionApiStringError(d.detail);
    }
    if (typeof d?.data === "string") {
      return mapPredictionApiStringError(d.data);
    }
  }
  if (err instanceof Error) return mapPredictionApiStringError(err.message);
  return "Failed to load horoscope.";
}

export function useHoroscope() {
  const { version: languageVersion } = useAppLanguage();
  const H = useI18nConstants(HOROSCOPE_SCREEN);
  const { isAuthenticated } = useAuthStore();
  const [data, setData] = useState<HoroscopePayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError(null);
    fetchHoroscope()
      .then(setData)
      .catch((e: unknown) => {
        setError(horoscopeErrorMessage(e));
      })
      .finally(() => setIsLoading(false));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      queueMicrotask(() => {
        setData(null);
        setError(null);
      });
      return;
    }
    queueMicrotask(() => {
      load();
    });
  }, [isAuthenticated, load, languageVersion]);

  async function downloadPdf(): Promise<void> {
    try {
      const blob = await fetchHoroscopePdf();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = DOWNLOAD_FILENAMES.horoscopePdf;
      a.click();
      URL.revokeObjectURL(url);
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.downloadSuccess);
    } catch {
      showErrorAppSnackBar(H.downloadError);
    }
  }

  return {
    isAuthenticated,
    data,
    isLoading,
    error,
    profileIncomplete: error === PREDICTION_PROFILE_INCOMPLETE,
    reload: load,
    downloadPdf,
  };
}
