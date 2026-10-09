"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MarathonBookPanel } from "@/components/marathon/MarathonBookPanel";
import { MarathonMineSection } from "@/components/marathon/MarathonMineSection";
import { MarathonEventBanner } from "@/components/marathon/MarathonEventBanner";
import { MarathonListHero } from "@/components/marathon/MarathonListHero";
import { MarathonSlotStrip } from "@/components/marathon/MarathonSlotStrip";
import { useI18nConstants, useT } from "@/hooks/useT";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { MARATHON_COPY, MARATHON_PAGE, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { ROUTES } from "@/lib/constants/routes";
import { MARATHON_PARTICIPANT_COPY, eventShowsParticipants, participantLabel } from "@/lib/marathon-participants";
import { fetchMyMarathonBookings, fetchPublicMarathon, marathonErrorMessage } from "@/lib/services/marathon";
import { useAuthStore } from "@/store/auth.store";
import type { MarathonEvent } from "@/types/marathon";

export function MarathonDetailView({ marathonId }: { marathonId: number }) {
  const copy = useI18nConstants(MARATHON_COPY);
  const people = useI18nConstants(MARATHON_PARTICIPANT_COPY);
  const { t } = useT();
  const router = useRouter();
  const ui = MARATHON_PAGE;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [event, setEvent] = useState<MarathonEvent | null>(null);
  const [slotId, setSlotId] = useState<number | null>(null);
  const [booked, setBooked] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  function load() {
    fetchPublicMarathon(marathonId)
      .then(setEvent)
      .catch((err: unknown) => setError(marathonErrorMessage(err)));
  }

  useEffect(() => {
    load();
  }, [marathonId]);

  useEffect(() => {
    if (!isAuthenticated) {
      setBooked(false);
      return;
    }
    fetchMyMarathonBookings()
      .then((rows) => setBooked(rows.some((row) => row.marathon_id === marathonId)))
      .catch(() => setBooked(false));
  }, [isAuthenticated, marathonId]);

  useEffect(() => {
    if (!event || slotId != null) return;
    const first = event.slots.find((slot) => slot.seats_left > 0 && event.booking_open);
    if (first) setSlotId(first.id);
  }, [event, slotId]);

  return (
    <div className={ui.page}>
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      <div className={ui.pageInner}>
        <button type="button" className={MARATHON_PORTAL_UI.back} onClick={() => router.push(ROUTES.marathon)}>
          <svg viewBox="0 0 24 24" className={MARATHON_PORTAL_UI.backIcon} fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t("Go back")}</span>
        </button>
        <div className={ui.column}>
          {!event ? (
            <p className={ui.heroSub}>{error || copy.empty}</p>
          ) : (
            <>
              <MarathonListHero />
              <MarathonEventBanner event={event} linked={false} />
              {eventShowsParticipants(event) ? (
                <p className={ui.showTimer}>{participantLabel(event.participant_count ?? 0, people)}</p>
              ) : null}
              {event.admin_ended && booked !== true ? null : (
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
                      <p className={ui.slotHeadHint}>{copy.selectSlotHint}</p>
                    </div>
                    <div className={ui.slotActions}>
                      <MarathonMineSection marathonId={event.id} />
                    </div>
                  </div>
                  <MarathonSlotStrip event={event} slotId={slotId} onSelect={setSlotId} />
                  {slotId && event.booking_open ? (
                    <MarathonBookPanel event={event} slotId={slotId} />
                  ) : null}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
