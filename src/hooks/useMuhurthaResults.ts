"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useI18nConstants, useT } from "@/hooks/useT";
import { useMuhurthaAccess } from "@/hooks/useMuhurthaAccess";
import { MUHURTHA_DATE } from "@/lib/constants/muhurtha-date";
import { MUHURTHA_QUERY } from "@/lib/constants/muhurtha-query";
import { MUHURTHA_SCREEN } from "@/lib/constants/muhurtha-screen";
import { ROUTES } from "@/lib/constants/routes";
import {
  eventPlannerCacheKey,
  readEventPlannerCache,
  writeEventPlannerCache,
} from "@/lib/event-planner-cache";
import { isMuhurthaStartDateAllowed } from "@/lib/muhurtha-date-range";
import { getStoredAppLanguageName } from "@/lib/settings-language-storage";
import { fetchMuhurtha } from "@/lib/services/muhurtha";
import { useAuthStore } from "@/store/auth.store";
import {
  MUHURTHA_EVENT_TYPES,
  type MuhurthaEventType,
  type MuhurthaPayload,
} from "@/types/muhurtha";

function isEventType(value: string | null): value is MuhurthaEventType {
  return Boolean(value && MUHURTHA_EVENT_TYPES.includes(value as MuhurthaEventType));
}

export function useMuhurthaResults() {
  const M = useI18nConstants(MUHURTHA_SCREEN);
  const { t } = useT();
  const { version: languageVersion } = useAppLanguage();
  const userId = useAuthStore((state) => state.user?.id ?? "guest");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { maySearch } = useMuhurthaAccess();

  const event = searchParams.get(MUHURTHA_QUERY.event);
  const startDate = searchParams.get(MUHURTHA_QUERY.startDate);
  const location = searchParams.get(MUHURTHA_QUERY.location);

  const [data, setData] = useState<MuhurthaPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    if (!maySearch) {
      setIsLoading(false);
      return;
    }
    if (!isEventType(event) || !startDate?.trim() || !location?.trim()) {
      router.replace(ROUTES.eventPlanner);
      return;
    }

    if (!isMuhurthaStartDateAllowed(startDate)) {
      setError(t(MUHURTHA_DATE.startDateOutOfRange));
      setData(null);
      setIsLoading(false);
      return;
    }

    const trimmedLocation = location.trim();
    const language = getStoredAppLanguageName();
    const cacheKey = eventPlannerCacheKey({
      userId,
      event,
      startDate,
      location: trimmedLocation,
      language,
    });

    let cancelled = false;
    setError(null);

    const cached = retryToken === 0 ? readEventPlannerCache(cacheKey) : null;
    if (cached) {
      setData(cached);
      setIsLoading(false);
      return () => {
        cancelled = true;
      };
    }

    setIsLoading(true);
    setData(null);

    fetchMuhurtha({ event, startDate, location: trimmedLocation })
      .then((payload) => {
        if (cancelled) return;
        writeEventPlannerCache(cacheKey, payload);
        setData(payload);
      })
      .catch((e: Error) => {
        if (!cancelled) {
          const raw = e.message || M.loadErrorFallback;
          setError(t(raw));
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [
    M.loadErrorFallback,
    event,
    languageVersion,
    location,
    maySearch,
    retryToken,
    router,
    startDate,
    t,
    userId,
  ]);

  const retry = () => setRetryToken((token) => token + 1);

  return { data, isLoading, error, event, startDate, location, retry };
}
