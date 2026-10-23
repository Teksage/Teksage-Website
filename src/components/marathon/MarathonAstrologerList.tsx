"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/common/EmptyState";
import { PageLoadingCenter } from "@/components/common/Loader";
import { MarathonAstrologerCard } from "@/components/marathon/MarathonAstrologerCard";
import { MarathonRegisterTimer } from "@/components/marathon/MarathonRegisterTimer";
import { useI18nConstants, useT } from "@/hooks/useT";
import { useViewerTimezone } from "@/hooks/useViewerTimezone";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { MARATHON_COPY, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { astrologerMarathonEventPath } from "@/lib/constants/routes";
import { MARATHON_ASTROLOGER_COPY } from "@/lib/constants/marathon-astrologer";
import { bookingsForEvent, eventIsCompleted, latestFirst, seatSummary } from "@/lib/marathon-astrologer";
import { marathonDisplayName } from "@/lib/marathon-display";
import {
  confirmMarathonParticipation,
  fetchAstrologerDrafts,
  fetchAstrologerMarathonSeats,
  marathonErrorMessage,
} from "@/lib/services/marathon";
import { cn } from "@/lib/utils";
import type { MarathonBooking, MarathonDraft } from "@/types/marathon";

function isUpcoming(row: MarathonDraft, bookings: MarathonBooking[], now: number): boolean {
  const completed = eventIsCompleted(bookings);
  return !row.admin_ended && !completed && new Date(row.ends_at).getTime() >= now;
}

export function MarathonAstrologerList() {
  const copy = useI18nConstants(MARATHON_COPY);
  const seats = useI18nConstants(MARATHON_ASTROLOGER_COPY);
  const ui = MARATHON_FLOW_UI;
  const { locale, t } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const viewerZone = useViewerTimezone();
  const router = useRouter();
  const [waiting, setWaiting] = useState<MarathonBooking[]>([]);
  const [mine, setMine] = useState<MarathonBooking[]>([]);
  const [drafts, setDrafts] = useState<MarathonDraft[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState<number | null>(null);
  const [showUpcoming, setShowUpcoming] = useState(true);

  function load() {
    setLoading(true);
    Promise.all([
      fetchAstrologerMarathonSeats().catch(() => ({ waiting: [], mine: [] })),
      fetchAstrologerDrafts().catch(() => [] as MarathonDraft[]),
    ])
      .then(([next, nextDrafts]) => {
        setWaiting(next.waiting ?? []);
        setMine(next.mine ?? []);
        setDrafts(latestFirst(nextDrafts ?? []));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function confirm(id: number) {
    setError("");
    setPendingId(id);
    try {
      await confirmMarathonParticipation(id);
      load();
    } catch (err: unknown) {
      setError(marathonErrorMessage(err));
    } finally {
      setPendingId(null);
    }
  }

  const now = Date.now();
  const visible = useMemo(() => {
    return drafts.filter((row) => {
      const upcoming = isUpcoming(row, bookingsForEvent(row.id, waiting, mine), now);
      return showUpcoming ? upcoming : !upcoming;
    });
  }, [drafts, waiting, mine, now, showUpcoming]);

  if (loading) return <PageLoadingCenter />;

  return (
    <div className={ui.stack}>
      <div className={ui.pillRow}>
        <button type="button" className={showUpcoming ? ui.pillOn : ui.pillOff} onClick={() => setShowUpcoming(true)}>
          {copy.upcomingTab}
        </button>
        <button type="button" className={cn(!showUpcoming ? ui.pillOn : ui.pillOff)} onClick={() => setShowUpcoming(false)}>
          {copy.pastTab}
        </button>
      </div>
      {error ? <p className={MARATHON_PORTAL_UI.error}>{error}</p> : null}
      {visible.length === 0 ? <EmptyState title={copy.emptyAstrologer} /> : null}
      <div className={ui.listGrid}>
        {visible.map((row) => {
          const bookings = bookingsForEvent(row.id, waiting, mine);
          const completed = eventIsCompleted(bookings);
          const text = completed ? t("Completed") : row.admin_ended ? copy.adminEnded : null;
          return (
            <MarathonAstrologerCard
              key={row.id}
              startsAt={row.starts_at}
              endsAt={row.ends_at}
              locale={localeTag}
              timeZone={viewerZone}
              category={row.categories[0] ? t(row.categories[0]) : undefined}
              active={!text}
              status={text ?? (row.booking_closes_at ? <MarathonRegisterTimer closesAt={row.booking_closes_at} className="inline" /> : null)}
              title={marathonDisplayName(row.name)}
              lines={[seatSummary(bookings, seats)]}
              onOpen={() => router.push(astrologerMarathonEventPath(row.id))}
            >
              <button type="button" className={ui.book} onClick={() => router.push(astrologerMarathonEventPath(row.id))}>
                {copy.viewBookings}
                <span aria-hidden>›</span>
              </button>
              {row.confirmed ? null : (
                <button type="button" className={ui.actionSolid} disabled={pendingId === row.id} onClick={() => void confirm(row.id)}>
                  {pendingId === row.id ? copy.waiting : copy.confirm}
                </button>
              )}
            </MarathonAstrologerCard>
          );
        })}
      </div>
    </div>
  );
}
