"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MarathonEventBanner } from "@/components/marathon/MarathonEventBanner";
import { MarathonListHero } from "@/components/marathon/MarathonListHero";
import { useI18nConstants, useT } from "@/hooks/useT";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { MARATHON_COPY, MARATHON_PAGE, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { ROUTES } from "@/lib/constants/routes";
import { fetchMyMarathonBookings, fetchPublicMarathons } from "@/lib/services/marathon";
import { useAuthStore } from "@/store/auth.store";
import type { MarathonBooking, MarathonEvent } from "@/types/marathon";

export function MarathonListView() {
  const copy = useI18nConstants(MARATHON_COPY);
  const { t } = useT();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [events, setEvents] = useState<MarathonEvent[]>([]);
  const [bookings, setBookings] = useState<MarathonBooking[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublicMarathons()
      .then((rows) => {
        const next = [...rows].sort(
          (left, right) => new Date(right.starts_at).getTime() - new Date(left.starts_at).getTime(),
        );
        setEvents(next);
      })
      .catch(() => setError(copy.empty));
  }, [copy.empty]);

  useEffect(() => {
    if (!isAuthenticated) {
      setBookings([]);
      return;
    }
    fetchMyMarathonBookings()
      .then(setBookings)
      .catch(() => setBookings([]));
  }, [isAuthenticated]);

  return (
    <div className={MARATHON_PAGE.page}>
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      <div className={MARATHON_PAGE.pageInner}>
        <button type="button" className={MARATHON_PORTAL_UI.back} onClick={() => router.push(ROUTES.home)}>
          <svg viewBox="0 0 24 24" className={MARATHON_PORTAL_UI.backIcon} fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t("Go back")}</span>
        </button>
        <div className={MARATHON_PAGE.column}>
          <MarathonListHero />
          {error ? <p className={MARATHON_PORTAL_UI.error}>{error}</p> : null}
          {events.length === 0 && !error ? <p className={MARATHON_PAGE.heroSub}>{copy.empty}</p> : null}
          {events.map((event) => {
            const mine = bookings.filter((row) => row.marathon_id === event.id);
            return (
              <MarathonEventBanner
                key={event.id}
                event={event}
                canOpen={!event.admin_ended || mine.length > 0}
                bookings={mine}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
