"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useI18nConstants } from "@/hooks/useT";
import { useMuhurthaAccess } from "@/hooks/useMuhurthaAccess";
import { MUHURTHA_QUERY } from "@/lib/constants/muhurtha-query";
import { MUHURTHA_SCREEN } from "@/lib/constants/muhurtha-screen";
import { ROUTES } from "@/lib/constants/routes";
import { fetchMuhurtha } from "@/lib/services/muhurtha";
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
  const { version: languageVersion } = useAppLanguage();
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

    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setData(null);

    fetchMuhurtha({ event, startDate, location: location.trim() })
      .then((payload) => {
        if (!cancelled) setData(payload);
      })
      .catch((e: Error) => {
        if (!cancelled) {
          setError(e.message || M.loadErrorFallback);
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [M.loadErrorFallback, event, languageVersion, location, maySearch, retryToken, router, startDate]);

  const retry = () => setRetryToken((token) => token + 1);

  return { data, isLoading, error, event, startDate, location, retry };
}
