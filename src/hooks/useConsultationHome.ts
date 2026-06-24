"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { isClientLoggedIn } from "@/lib/auth-session";
import { fetchUserConsultationEvents } from "@/lib/services/consultation-events";
import { useAuthStore } from "@/store/auth.store";
import type { ConsultationUserEvent } from "@/types/consultation";

export function useConsultationHome() {
  const { version: languageVersion } = useAppLanguage();
  const userId = useAuthStore((s) => s.user?.id);
  const isAuthenticated = isClientLoggedIn();

  const [events, setEvents] = useState<ConsultationUserEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isAuthenticated || !userId) {
      setEvents([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const rows = await fetchUserConsultationEvents(userId);
      setEvents(rows);
    } catch {
      setError("loadFailed");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    void load();
  }, [load, languageVersion]);

  const upcomingMeetings = useMemo(
    () => events.filter((e) => e.status === "confirmed"),
    [events]
  );

  const completedMeetings = useMemo(
    () => events.filter((e) => e.status === "completed"),
    [events]
  );

  return {
    loading,
    error,
    upcomingMeetings,
    completedMeetings,
    completedCount: completedMeetings.length,
    reload: load,
  };
}
