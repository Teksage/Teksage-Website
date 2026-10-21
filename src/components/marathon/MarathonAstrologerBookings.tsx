"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/common/EmptyState";
import { PageLoadingCenter } from "@/components/common/Loader";
import { MarathonEventsHero } from "@/components/marathon/MarathonEventsHero";
import { MarathonPortalCard } from "@/components/marathon/MarathonPortalCard";
import { useI18nConstants, useT } from "@/hooks/useT";
import { useViewerTimezone } from "@/hooks/useViewerTimezone";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { consultationLanguageLabel } from "@/lib/constants/consultation-languages";
import { RELATED_RELATIONSHIP_COPY, formatRelatedPerson, relatedRelationshipLabel } from "@/lib/constants/related-profiles";
import { MARATHON_ASTROLOGER_COPY } from "@/lib/constants/marathon-astrologer";
import { MARATHON_COPY, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { astrologerMarathonEventPath, astrologerMeetingHoroscopePath } from "@/lib/constants/routes";
import {
  bookingsForEvent,
  eventIsCompleted,
  formatMarathonWhen,
} from "@/lib/marathon-astrologer";
import { marathonDisplayName } from "@/lib/marathon-display";
import { MARATHON_PARTICIPANT_COPY, eventShowsParticipants, participantLabel } from "@/lib/marathon-participants";
import {
  completeMarathonSeat,
  fetchAstrologerDrafts,
  fetchAstrologerMarathonSeats,
  marathonErrorMessage,
} from "@/lib/services/marathon";
import type { MarathonAstrologerBookingsProps, MarathonBooking, MarathonDraft } from "@/types/marathon";

function bookingStatus(status: string, waiting: string, accepted: string, assigned: string, completed: string) {
  if (status === "completed") return completed;
  if (status === "accepted") return accepted;
  if (status === "assigned") return assigned;
  return waiting;
}

function slotEnded(endsAt: string): boolean {
  return Date.now() >= new Date(endsAt).getTime();
}

export function MarathonAstrologerBookings({ marathonId }: MarathonAstrologerBookingsProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const relations = useI18nConstants(RELATED_RELATIONSHIP_COPY);
  const extra = useI18nConstants(MARATHON_ASTROLOGER_COPY);
  const people = useI18nConstants(MARATHON_PARTICIPANT_COPY);
  const ui = MARATHON_PORTAL_UI;
  const { locale, t } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const viewerZone = useViewerTimezone();
  const [event, setEvent] = useState<MarathonDraft | null>(null);
  const [rows, setRows] = useState<MarathonBooking[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pendingId, setPendingId] = useState<number | null>(null);

  function load() {
    setLoading(true);
    Promise.all([
      fetchAstrologerMarathonSeats().catch(() => ({ waiting: [], mine: [] })),
      fetchAstrologerDrafts().catch(() => [] as MarathonDraft[]),
    ])
      .then(([seats, drafts]) => {
        const bookings = bookingsForEvent(marathonId, seats.waiting ?? [], seats.mine ?? []);
        setRows(bookings);
        setEvent(drafts.find((row) => row.id === marathonId) ?? null);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, [marathonId]);

  async function run(id: number, action: () => Promise<string | null | void>) {
    setError("");
    setPendingId(id);
    try {
      const warning = await action();
      if (warning) setError(warning);
      load();
    } catch (err: unknown) {
      setError(marathonErrorMessage(err));
    } finally {
      setPendingId(null);
    }
  }

  if (loading) return <PageLoadingCenter />;

  const title =
    marathonDisplayName(event?.name || rows[0]?.event_name || "") || copy.title;
  const completed = eventIsCompleted(rows);
  const finished = eventShowsParticipants(event) || completed;
  const statusHint = completed ? t("Completed") : event?.admin_ended ? copy.adminEnded : "";
  const hint = [statusHint, finished ? participantLabel(event?.participant_count ?? rows.length, people) : ""]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={ui.stack}>
      <MarathonEventsHero title={title} subtitle={copy.viewBookings} hint={hint} />
      {error ? <p className={ui.error}>{error}</p> : null}
      {rows.length === 0 ? <EmptyState title={extra.emptyBookings} /> : null}
      <section className={ui.section}>
        {rows.map((row) => {
          const label = bookingStatus(row.status, copy.waiting, extra.accepted, t("Assigned"), t("Completed"));
          const done = row.status === "completed";
          const assigned = row.status === "accepted" || row.status === "assigned";
          const canComplete = assigned && slotEnded(row.ends_at);
          return (
            <MarathonPortalCard
              key={row.id}
              startsAt={row.starts_at}
              locale={localeTag}
              timeZone={viewerZone}
              title={row.user_name}
              lines={[
                formatMarathonWhen(row.starts_at, localeTag, viewerZone),
                ...(row.member_display_name
                  ? [formatRelatedPerson(copy.consultingFor, row.member_display_name, relatedRelationshipLabel(relations, row.relationship ?? ""))]
                  : []),
                ...(row.preferred_language
                  ? [`${copy.languageTitle}: ${consultationLanguageLabel(row.preferred_language)}`]
                  : []),
                ...(row.customer_query ? [`${copy.customerQuery}: ${row.customer_query}`] : []),
              ]}
              status={done ? label : row.admin_ended ? `${label} · ${copy.adminEnded}` : label}
            >
              {row.event_id ? (
                <Link
                  className={ui.link}
                  href={astrologerMeetingHoroscopePath(
                    row.event_id,
                    astrologerMarathonEventPath(marathonId),
                    row.member_display_name
                      ? `${row.member_display_name} (${relatedRelationshipLabel(relations, row.relationship ?? "")})`
                      : row.user_name
                  )}
                >
                  {t("Full Horoscope")}
                </Link>
              ) : null}
              {row.meeting_link ? (
                <a className={ui.link} href={row.meeting_link} target="_blank" rel="noreferrer">
                  {copy.joinMeeting}
                </a>
              ) : null}
              {done ? (
                <p className={ui.confirmed}>{label}</p>
              ) : row.status === "paid" ? (
                <p className={ui.confirmed}>{copy.waiting}</p>
              ) : (
                <button
                  type="button"
                  className={ui.action}
                  disabled={pendingId === row.id || !canComplete}
                  title={!canComplete ? copy.completeTooEarly : undefined}
                  onClick={() => void run(row.id, () => completeMarathonSeat(row.id))}
                >
                  {pendingId === row.id
                    ? copy.waiting
                    : canComplete
                      ? copy.markComplete
                      : copy.completeTooEarly}
                </button>
              )}
            </MarathonPortalCard>
          );
        })}
      </section>
    </div>
  );
}
