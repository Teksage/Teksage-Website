"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useI18nConstants } from "@/hooks/useT";
import { MUHURTHA_SCREEN } from "@/lib/constants/muhurtha-screen";
import { toIsoDate } from "@/lib/panchang-calendar";
import { fetchMuhurtha } from "@/lib/services/muhurtha";
import { useAuthStore } from "@/store/auth.store";
import type { MuhurthaEventType, MuhurthaPayload } from "@/types/muhurtha";

function profileComplete(user: ReturnType<typeof useAuthStore.getState>["user"]) {
  return Boolean(user?.nakshatra?.trim() && user?.rashi?.trim());
}

export function useMuhurtha() {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const { version: languageVersion } = useAppLanguage();
  const { user, isAuthenticated } = useAuthStore();
  const isPremium = Boolean(user?.isPremium);
  const hasProfile = profileComplete(user);

  const [event, setEvent] = useState<MuhurthaEventType>("Travel");
  const [startDate, setStartDate] = useState(() => toIsoDate(new Date()));
  const [location, setLocation] = useState("");
  const [locationFull, setLocationFull] = useState("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [data, setData] = useState<MuhurthaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const preferred = user?.preferredLocation?.trim() ?? "";
    if (!preferred) return;
    setLocation((current) => (current.trim() ? current : preferred));
    setLocationFull((current) => (current.trim() ? current : preferred));
  }, [user?.preferredLocation]);

  const maySearch = isAuthenticated && isPremium && hasProfile;

  const onLocationChange = useCallback((selected: string, full: string) => {
    setLocation(selected);
    setLocationFull(full);
    setLocationError(null);
  }, []);

  const search = useCallback(() => {
    if (!maySearch) return;
    const scanLocation = (locationFull || location).trim();
    if (!scanLocation) {
      setLocationError(M.locationRequired);
      return;
    }
    setIsLoading(true);
    setError(null);
    setLocationError(null);
    fetchMuhurtha({ event, startDate, location: scanLocation })
      .then(setData)
      .catch((e: Error) => {
        setError(e.message || M.loadErrorFallback);
        setData(null);
      })
      .finally(() => setIsLoading(false));
  }, [M.loadErrorFallback, M.locationRequired, event, location, locationFull, maySearch, startDate]);

  const resetResults = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated,
    isPremium,
    hasProfile,
    event,
    setEvent,
    startDate,
    setStartDate,
    location,
    locationFull,
    locationError,
    onLocationChange,
    data,
    isLoading,
    error,
    search,
    resetResults,
    languageVersion,
  };
}
