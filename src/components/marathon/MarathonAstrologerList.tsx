"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState } from "@/components/common/EmptyState";
import { PageLoadingCenter } from "@/components/common/Loader";
import { MarathonPortalCard } from "@/components/marathon/MarathonPortalCard";
import { useI18nConstants, useT } from "@/hooks/useT";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
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
import {
  confirmMarathonParticipation,
  fetchAstrologerDrafts,
  fetchAstrologerMarathonSeats,
  marathonErrorMessage,
} from "@/lib/services/marathon";
import type { MarathonBooking, MarathonDraft } from "@/types/marathon";

export function MarathonAstrologerList() {
  const copy = useI18nConstants(MARATHON_COPY);
  const seats = useI18nConstants(MARATHON_ASTROLOGER_COPY);
  const ui = MARATHON_PORTAL_UI;
  const { locale, t } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const router = useRouter();
  const [waiting, setWaiting] = useState<MarathonBooking[]>([]);
  const [mine, setMine] = useState<MarathonBooking[]>([]);
  const [drafts, setDrafts] = useState<MarathonDraft[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState<number | null>(null);

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

  if (loading) return <PageLoadingCenter />;

  return (
    <div className={ui.stack}>
      {error ? <p className={ui.error}>{error}</p> : null}
      {drafts.length === 0 ? <EmptyState title={copy.emptyAstrologer} /> : null}
      <section className={ui.section}>
        {drafts.map((row) => {
          const bookings = bookingsForEvent(row.id, waiting, mine);
          const completed = eventIsCompleted(bookings);
          const status = completed ? t("Completed") : row.admin_ended ? copy.adminEnded : null;
          return (
            <MarathonPortalCard
              key={row.id}
              startsAt={row.starts_at}
              locale={localeTag}
              title={row.name}
              lines={[`${formatMarathonWhen(row.starts_at, localeTag)} – ${formatMarathonWhen(row.ends_at, localeTag)}`]}
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
