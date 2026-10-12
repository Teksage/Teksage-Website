"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18nConstants, useT } from "@/hooks/useT";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import { MarathonRegisterTimer } from "@/components/marathon/MarathonRegisterTimer";
import { MARATHON_BANNER_UI } from "@/lib/constants/marathon-banner";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";
import { marathonDateParts } from "@/lib/marathon-display";
import { marathonBookingPath, ROUTES } from "@/lib/constants/routes";
import type { MarathonBookingHistoryProps, MarathonEventBannerProps } from "@/types/marathon";

function CalendarMark() {
  return (
    <svg viewBox="0 0 24 24" className={MARATHON_BANNER_UI.dateIcon} fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 3.5v3M16 3.5v3M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function HistoryList({ rows }: MarathonBookingHistoryProps) {
  const ui = MARATHON_BANNER_UI;
  const { locale } = useT();
  const localeTag = bcp47FromAppLocale(locale);

  return (
    <div className={ui.history}>
      {rows.map((booking) => {
        const when = marathonDateParts(booking.starts_at, booking.timezone, localeTag);
        return (
          <Link key={booking.id} href={marathonBookingPath(booking.id)} className={ui.historyRow}>
            {when.time}
          </Link>
        );
      })}
    </div>
  );
}

export function MarathonEventBanner({ event, linked = true, canOpen = true, bookings = [] }: MarathonEventBannerProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const { locale, t } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const ui = MARATHON_PAGE;
  const date = MARATHON_BANNER_UI;
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);
  const when = marathonDateParts(event.starts_at, event.timezone, localeTag);
  const end = marathonDateParts(event.ends_at, event.timezone, localeTag);
  const category = event.categories[0];
  const showDetails = linked && canOpen;
  const single = bookings.length === 1 ? bookings[0] : null;

  return (
    <article className={cn(date.card, open && date.cardOpen)}>
      <div className={date.top}>
        <div className={date.dateTile}>
          <CalendarMark />
          <span className={date.dateDay}>{when.day}</span>
          <span className={date.dateMonth}>{when.month}</span>
        </div>
        <div className={date.copy}>
          <div className={date.titleRow}>
            <p className={ui.showTitle}>{event.name}</p>
            {category ? <span className={ui.showChip}>{t(category)}</span> : null}
          </div>
          {event.description ? <p className={ui.showText}>{t(event.description)}</p> : null}
          <div className={date.meta}>
            <p className={date.time}>
              <svg viewBox="0 0 24 24" className={date.icon} fill="none" aria-hidden>
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 8v4.5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              {`${when.time} – ${end.time}`}
            </p>
            {event.admin_ended ? (
              <p className={ui.showTimer}>{copy.adminEnded}</p>
            ) : (
              <MarathonRegisterTimer closesAt={event.booking_closes_at} className={ui.showTimer} />
            )}
          </div>
        </div>
      </div>
      {showDetails || bookings.length > 0 ? (
        <div className={date.foot}>
          {showDetails ? (
            <Link href={`${ROUTES.marathon}/${event.id}`} className={ui.showCta}>
              {copy.bannerCta}
              <span aria-hidden>→</span>
            </Link>
          ) : null}
          {single ? (
            <Link href={marathonBookingPath(single.id)} className={ui.viewBooking}>
              {copy.viewBookings}
              <span aria-hidden>→</span>
            </Link>
          ) : null}
          {bookings.length > 1 ? (
            <div ref={menuRef} className={date.menuAnchor}>
              <button type="button" className={ui.viewBooking} onClick={() => setOpen((value) => !value)}>
                {copy.viewBookings}
                <span aria-hidden>{open ? "▴" : "▾"}</span>
              </button>
              {open ? <HistoryList rows={bookings} /> : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
