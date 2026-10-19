"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/common/EmptyState";
import { PageLoadingCenter } from "@/components/common/Loader";
import { MarathonPortalCard } from "@/components/marathon/MarathonPortalCard";
import { useI18nConstants, useT } from "@/hooks/useT";
import { useViewerTimezone } from "@/hooks/useViewerTimezone";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { CONSULTATION_HOME_LAYOUT } from "@/lib/constants/consultation-home";
import { MARATHON_COPY, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { astrologerMarathonEventPath } from "@/lib/constants/routes";
import { MARATHON_ASTROLOGER_COPY } from "@/lib/constants/marathon-astrologer";
import {
  bookingsForEvent,
  eventIsCompleted,
  formatMarathonWhen,
  latestFirst,
  seatSummary,
} from "@/lib/marathon-astrologer";
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
  const ui = MARATHON_PORTAL_UI;
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
      .then(([seats, nextDrafts]) => {
        setWaiting(seats.waiting ?? []);
        setMine(seats.mine ?? []);
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
      const bookings = bookingsForEvent(row.id, waiting, mine);
      const upcoming = isUpcoming(row, bookings, now);
      return showUpcoming ? upcoming : !upcoming;
    });
  }, [drafts, waiting, mine, now, showUpcoming]);
  const pastCount = drafts.filter((row) => {
    const bookings = bookingsForEvent(row.id, waiting, mine);
    return !isUpcoming(row, bookings, now);
  }).length;

  if (loading) return <PageLoadingCenter />;

  return (
    <div className={ui.stack}>
      {error ? <p className={ui.error}>{error}</p> : null}
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
      {visible.length === 0 ? <EmptyState title={copy.emptyAstrologer} /> : null}
      <section className={ui.section}>
        {visible.map((row) => {
          const bookings = bookingsForEvent(row.id, waiting, mine);
          const completed = eventIsCompleted(bookings);
          const status = completed ? t("Completed") : row.admin_ended ? copy.adminEnded : null;
          return (
            <MarathonPortalCard
              key={row.id}
              startsAt={row.starts_at}
              locale={localeTag}
              timeZone={viewerZone}
              title={marathonDisplayName(row.name)}
              lines={[`${formatMarathonWhen(row.starts_at, localeTag, viewerZone)} – ${formatMarathonWhen(row.ends_at, localeTag, viewerZone)}`]}
              categories={row.categories}
              closesAt={status ? null : row.booking_closes_at}
              status={status}
              onOpen={() => router.push(astrologerMarathonEventPath(row.id))}
            >
              <p className={ui.confirmed}>{seatSummary(bookings, seats)}</p>
              {row.confirmed ? null : (
                <button
                  type="button"
                  className={ui.action}
                  disabled={pendingId === row.id}
                  onClick={() => void confirm(row.id)}
                >
                  {pendingId === row.id ? copy.waiting : copy.confirm}
                </button>
              )}
            </MarathonPortalCard>
          );
        })}
      </section>
    </div>
  );
}
