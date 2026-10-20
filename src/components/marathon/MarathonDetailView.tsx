"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { MarathonBookPanel } from "@/components/marathon/MarathonBookPanel";
import { MarathonMineSection } from "@/components/marathon/MarathonMineSection";
import { MarathonEventBanner } from "@/components/marathon/MarathonEventBanner";
import { MarathonListHero } from "@/components/marathon/MarathonListHero";
import { MarathonSlotStrip } from "@/components/marathon/MarathonSlotStrip";
import { useI18nConstants, useT } from "@/hooks/useT";
import { useViewerTimezoneHint } from "@/hooks/useViewerTimezone";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { MARATHON_CHECKOUT, MARATHON_CHECKOUT_COPY } from "@/lib/constants/marathon-checkout";
import { MARATHON_COPY, MARATHON_PAGE, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { ROUTES } from "@/lib/constants/routes";
import { MARATHON_PARTICIPANT_COPY, eventShowsParticipants, participantLabel } from "@/lib/marathon-participants";
import { fetchMyMarathonBookings, fetchPublicMarathon, marathonErrorMessage } from "@/lib/services/marathon";
import { useAuthStore } from "@/store/auth.store";
import type { MarathonBooking, MarathonEvent } from "@/types/marathon";

export function MarathonDetailView({
  marathonId,
}: {
  marathonId: number | string;
}) {
  const copy = useI18nConstants(MARATHON_COPY);
  const checkoutCopy = useI18nConstants(MARATHON_CHECKOUT_COPY);
  const people = useI18nConstants(MARATHON_PARTICIPANT_COPY);
  const { t } = useT();
  const timeHint = useViewerTimezoneHint(copy.timesInIST, copy.timesInYourZone);
  const router = useRouter();
  const ui = MARATHON_PAGE;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [event, setEvent] = useState<MarathonEvent | null>(null);
  const [slotId, setSlotId] = useState<number | null>(null);
  const [mine, setMine] = useState<MarathonBooking[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetchPublicMarathon(marathonId)
      .then(setEvent)
      .catch((err: unknown) => setError(marathonErrorMessage(err)))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, [marathonId]);

  useEffect(() => {
    if (!isAuthenticated || !event) {
      setMine([]);
      return;
    }
    fetchMyMarathonBookings()
      .then((rows) => {
        const filtered = rows.filter((row) => Number(row.marathon_id) === Number(event.id));
        setMine(filtered);
      })
      .catch(() => setMine([]));
  }, [isAuthenticated, event]);

  const bookedSlotIds = useMemo(() => {
    if (!mine?.length) return [] as number[];
    const ids = new Set<number>();
    for (const row of mine) {
      const slotId = Number(row.slot_id);
      if (Number.isFinite(slotId) && slotId > 0) {
        ids.add(slotId);
        continue;
      }
      // Fallback when older APIs omit slot_id: match by start time.
      const bookingStart = new Date(row.starts_at).getTime();
      if (!Number.isFinite(bookingStart)) continue;
      const match = event?.slots.find(
        (slot) => new Date(slot.starts_at).getTime() === bookingStart
      );
      if (match) ids.add(Number(match.id));
    }
    return [...ids];
  }, [mine, event]);
  const booked = (mine?.length ?? 0) > 0;

  useEffect(() => {
    if (!event) return;
    if (slotId != null && bookedSlotIds.includes(Number(slotId))) {
      setSlotId(null);
      return;
    }
    if (slotId != null) return;
    const first = event.slots.find(
      (slot) =>
        Number(slot.seats_left) > 0 &&
        event.booking_open &&
        !bookedSlotIds.includes(Number(slot.id))
    );
    if (first) setSlotId(Number(first.id));
  }, [event, slotId, bookedSlotIds]);

  return (
    <div className={ui.page}>
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      <div className={ui.pageInner}>
        <button type="button" className={MARATHON_PORTAL_UI.back} onClick={() => router.push(ROUTES.expertHours)}>
          <svg viewBox="0 0 24 24" className={MARATHON_PORTAL_UI.backIcon} fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t("Go back")}</span>
        </button>
        <div className={ui.column}>
          {!event ? (
            loading ? null : <p className={ui.heroSub}>{error || copy.empty}</p>
          ) : (
            <>
              <MarathonListHero />
              <MarathonEventBanner event={event} linked={false} />
              {eventShowsParticipants(event) ? (
                <p className={ui.showTimer}>{participantLabel(event.participant_count ?? 0, people)}</p>
              ) : null}
              {event.admin_ended && !booked ? null : (
                <>
                  <div className={ui.slotHeadBar}>
                    <div className={ui.slotHead}>
                      <p className={ui.slotHeadTitle}>
                        <svg viewBox="0 0 24 24" className="size-5 text-[var(--color-brand-primary)]" fill="none" aria-hidden>
                          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M12 8v4.5l3 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                        {copy.selectSlot}
                      </p>
                      <p className={ui.slotHeadHint}>
                        {copy.selectSlotHint} · {timeHint}
                      </p>
                    </div>
                    <div className={ui.slotActions}>
                      <MarathonMineSection marathonId={event.id} rows={mine ?? []} />
                    </div>
                  </div>
                  <MarathonSlotStrip
                    event={event}
                    slotId={slotId}
                    onSelect={setSlotId}
                    bookedSlotIds={bookedSlotIds}
                  />
                  {slotId && event.booking_open && !bookedSlotIds.includes(Number(slotId)) ? (
                    <MarathonBookPanel event={event} slotId={slotId} />
                  ) : null}
                </>
              )}
              <div className={ui.slotActions}>
                <button type="button" className={MARATHON_CHECKOUT.viewAll} onClick={() => router.push(ROUTES.expertHours)}>
                  {checkoutCopy.viewAllEvents}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <LoadingOverlay open={loading || (isAuthenticated && mine === null)} />
    </div>
  );
}
