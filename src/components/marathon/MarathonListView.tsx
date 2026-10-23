"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { MarathonEventFact, MarathonFlowPager } from "@/components/marathon/MarathonEventFact";
import { MarathonListEmpty } from "@/components/marathon/MarathonListEmpty";
import { MarathonMineSection } from "@/components/marathon/MarathonMineSection";
import { useI18nConstants } from "@/hooks/useT";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { MARATHON_COPY, MARATHON_PAGE, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { MARATHON_FLOW_COPY, MARATHON_LIST_PAGE_SIZE } from "@/lib/constants/marathon-flow-copy";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { marathonCheckoutPath } from "@/lib/constants/routes";
import { marathonBookedSlotIds } from "@/lib/marathon-display";
import { fetchMyMarathonBookings, fetchPublicMarathons } from "@/lib/services/marathon";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import type { MarathonBooking, MarathonEvent, MarathonListViewProps } from "@/types/marathon";

function isUpcoming(event: MarathonEvent, now: number): boolean {
  return new Date(event.ends_at).getTime() >= now && !event.admin_ended;
}

function matchesFocus(event: MarathonEvent, focusSlug: string): boolean {
  return event.public_slug === focusSlug || String(event.id) === focusSlug;
}

function withFocusFirst(rows: MarathonEvent[], focusSlug?: string): MarathonEvent[] {
  if (!focusSlug) return rows;
  const pinned = rows.filter((event) => matchesFocus(event, focusSlug));
  if (pinned.length === 0) return rows;
  const rest = rows.filter((event) => !matchesFocus(event, focusSlug));
  return [...pinned, ...rest];
}

function openSlotId(event: MarathonEvent, rows: MarathonBooking[]): number | null {
  const taken = new Set(marathonBookedSlotIds(event, rows));
  const slot = event.slots.find(
    (item) => Number(item.seats_left) > 0 && event.booking_open && !event.admin_ended && !taken.has(Number(item.id))
  );
  return slot ? Number(slot.id) : null;
}

export function MarathonListView({ focusSlug }: MarathonListViewProps = {}) {
  const copy = useI18nConstants(MARATHON_COPY);
  const flow = useI18nConstants(MARATHON_FLOW_COPY);
  const ui = MARATHON_FLOW_UI;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [events, setEvents] = useState<MarathonEvent[]>([]);
  const [bookings, setBookings] = useState<MarathonBooking[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [index, setIndex] = useState(0);
  const focusedTabSet = useRef(false);

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

  useEffect(() => {
    setIndex(0);
  }, [showUpcoming]);

  useEffect(() => {
    if (focusedTabSet.current || !focusSlug || events.length === 0) return;
    const match = events.find((event) => matchesFocus(event, focusSlug));
    if (!match) return;
    focusedTabSet.current = true;
    setShowUpcoming(isUpcoming(match, Date.now()));
  }, [events, focusSlug]);

  const now = Date.now();
  const visible = useMemo(() => {
    const rows = events.filter((event) => isUpcoming(event, now) === showUpcoming);
    return withFocusFirst(rows, focusSlug);
  }, [events, focusSlug, now, showUpcoming]);
  const pageCount = Math.max(1, Math.ceil(visible.length / MARATHON_LIST_PAGE_SIZE));
  const page = Math.min(index, pageCount - 1);
  const slice = visible.slice(page * MARATHON_LIST_PAGE_SIZE, (page + 1) * MARATHON_LIST_PAGE_SIZE);

  return (
    <div className={MARATHON_PAGE.page}>
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      <div className={MARATHON_PAGE.pageInner}>
        <div className={ui.stage}>
          <div className={ui.listHead}>
            <h1 className={ui.listTitle}>{copy.title}</h1>
            <p className={ui.listTagline}>{flow.tagline}</p>
          </div>
          <div className={ui.pillRow}>
            <button type="button" className={showUpcoming ? ui.pillOn : ui.pillOff} onClick={() => setShowUpcoming(true)}>
              {copy.upcomingTab}
            </button>
            <button type="button" className={cn(!showUpcoming ? ui.pillOn : ui.pillOff)} onClick={() => setShowUpcoming(false)}>
              {copy.pastTab}
            </button>
          </div>
          {error ? <p className={MARATHON_PORTAL_UI.error}>{error}</p> : null}
          {!loading && slice.length === 0 && !error ? <MarathonListEmpty upcoming={showUpcoming} /> : null}
          {slice.length > 0 ? (
            <div className={ui.listGrid}>
              {slice.map((event) => {
                const mine = bookings.filter((row) => Number(row.marathon_id) === Number(event.id));
                const slotId = openSlotId(event, mine);
                return (
                  <article key={event.id} className={ui.card}>
                    <MarathonEventFact event={event}>
                      <div className={ui.actions}>
                        {slotId ? (
                          <Link href={marathonCheckoutPath(event.public_slug || event.id, slotId)} className={ui.book}>
                            {flow.bookSlot}
                            <span aria-hidden>›</span>
                          </Link>
                        ) : null}
                        <MarathonMineSection marathonId={event.id} rows={mine} />
                      </div>
                    </MarathonEventFact>
                  </article>
                );
              })}
            </div>
          ) : null}
          <MarathonFlowPager
            index={page}
            total={pageCount}
            onPrev={() => setIndex((value) => Math.max(0, value - 1))}
            onNext={() => setIndex((value) => Math.min(pageCount - 1, value + 1))}
          />
        </div>
      </div>
      <LoadingOverlay open={loading} />
    </div>
  );
}
