"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { MarathonEventBanner } from "@/components/marathon/MarathonEventBanner";
import { MarathonListHero } from "@/components/marathon/MarathonListHero";
import { useI18nConstants, useT } from "@/hooks/useT";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { CONSULTATION_HOME_LAYOUT } from "@/lib/constants/consultation-home";
import { MARATHON_COPY, MARATHON_PAGE, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { ROUTES } from "@/lib/constants/routes";
import { fetchMyMarathonBookings, fetchPublicMarathons } from "@/lib/services/marathon";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import type { MarathonBooking, MarathonEvent } from "@/types/marathon";

function isUpcoming(event: MarathonEvent, now: number): boolean {
  return new Date(event.ends_at).getTime() >= now && !event.admin_ended;
}

export function MarathonListView() {
  const copy = useI18nConstants(MARATHON_COPY);
  const { t } = useT();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [events, setEvents] = useState<MarathonEvent[]>([]);
  const [bookings, setBookings] = useState<MarathonBooking[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPublicMarathons()
      .then((rows) => {
        const next = [...rows].sort(
          (left, right) => new Date(right.starts_at).getTime() - new Date(left.starts_at).getTime()
        );
        setEvents(next);
      })
      .catch(() => setError(copy.empty))
      .finally(() => setLoading(false));
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

  const now = Date.now();
  const visible = useMemo(() => {
    const upcoming = events.filter((event) => isUpcoming(event, now));
    const past = events.filter((event) => !isUpcoming(event, now));
    return showUpcoming ? upcoming : past;
  }, [events, now, showUpcoming]);
  const pastCount = events.filter((event) => !isUpcoming(event, now)).length;

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
          <div className={CONSULTATION_HOME_LAYOUT.tabsWrap}>
            <div className={CONSULTATION_HOME_LAYOUT.tabsRow}>
              <button
                type="button"
                onClick={() => setShowUpcoming(true)}
                className={cn(
                  CONSULTATION_HOME_LAYOUT.tab,
                  showUpcoming
                    ? CONSULTATION_HOME_LAYOUT.tabActive
                    : CONSULTATION_HOME_LAYOUT.tabInactiveOutlined
                )}
              >
                {copy.upcomingTab}
              </button>
              <button
                type="button"
                onClick={() => setShowUpcoming(false)}
                className={cn(
                  CONSULTATION_HOME_LAYOUT.tab,
                  !showUpcoming
                    ? CONSULTATION_HOME_LAYOUT.tabActive
                    : CONSULTATION_HOME_LAYOUT.tabInactiveOutlined
                )}
              >
                {copy.pastTab}
                <span
                  className={cn(
                    CONSULTATION_HOME_LAYOUT.tabBadge,
                    !showUpcoming
                      ? CONSULTATION_HOME_LAYOUT.tabBadgeActive
                      : CONSULTATION_HOME_LAYOUT.tabBadgeOutlinedIdle
                  )}
                >
                  {pastCount}
                </span>
              </button>
            </div>
          </div>
          {error ? <p className={MARATHON_PORTAL_UI.error}>{error}</p> : null}
          {!loading && visible.length === 0 && !error ? (
            <p className={MARATHON_PAGE.heroSub}>{copy.empty}</p>
          ) : null}
          {visible.map((event) => {
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
      <LoadingOverlay open={loading} />
    </div>
  );
}
