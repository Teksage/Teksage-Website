import { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/store/auth.store";
import {
  fetchAstrologerEvents,
  fetchAstrologerEventDetail,
} from "@/lib/services/astrologer-portal";
import type { AstroEvent, AstroEventDetail } from "@/types/astrologer-portal";

export function useAstrologerEvents() {
  const user = useAuthStore((s) => s.user);
  const [events, setEvents] = useState<AstroEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAstrologerEvents(user.id);
      const sorted = [...data].sort(
        (a, b) =>
          new Date(a.start_datetime).getTime() -
          new Date(b.start_datetime).getTime()
      );
      setEvents(sorted);
    } catch {
      setError("Failed to load meetings.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const upcomingEvents = events.filter(
    (e) => e.status === "new" || e.status === "confirmed"
  );
  const completedEvents = events.filter((e) => e.status === "completed");

  return { events, upcomingEvents, completedEvents, loading, error, reload: load };
}

export function useAstrologerEventDetail(eventId: string | number | undefined) {
  const [event, setEvent] = useState<AstroEventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchAstrologerEventDetail(eventId)
      .then((d) => {
        if (!cancelled) setEvent(d);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load meeting details.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [eventId]);

  return { event, loading, error };
}
