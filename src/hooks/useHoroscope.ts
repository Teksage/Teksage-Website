"use client";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { DOWNLOAD_FILENAMES } from "@/lib/constants";
import { useAuthStore } from "@/store/auth.store";
import {
  fetchHoroscope,
  fetchHoroscopePdf,
} from "@/lib/services/horoscope";
import type { HoroscopePayload } from "@/types";

function horoscopeErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const d = err.response?.data as { detail?: string; data?: string } | undefined;
    if (d?.detail === "Profile not completed") {
      return "PROFILE_INCOMPLETE";
    }
    if (typeof d?.detail === "string") return d.detail;
    if (typeof d?.data === "string") return d.data;
  }
  if (err instanceof Error) return err.message;
  return "Failed to load horoscope.";
}

export function useHoroscope() {
  const { version: languageVersion } = useAppLanguage();
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
    const blob = await fetchHoroscopePdf();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = DOWNLOAD_FILENAMES.horoscopePdf;
    a.click();
    URL.revokeObjectURL(url);
  }

  return {
    isAuthenticated,
    data,
    isLoading,
    error,
    profileIncomplete: error === "PROFILE_INCOMPLETE",
    reload: load,
    downloadPdf,
  };
}
