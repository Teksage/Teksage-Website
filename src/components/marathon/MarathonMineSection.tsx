"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useI18nConstants, useT } from "@/hooks/useT";
import { useViewerTimezone } from "@/hooks/useViewerTimezone";
import { bcp47FromAppLocale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import { MARATHON_BANNER_UI } from "@/lib/constants/marathon-banner";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";
import { marathonBookingPath } from "@/lib/constants/routes";
import { marathonDateParts } from "@/lib/marathon-display";
import { fetchMyMarathonBookings } from "@/lib/services/marathon";
import { useAuthStore } from "@/store/auth.store";
import type { MarathonBooking, MarathonMineSectionProps } from "@/types/marathon";

export function MarathonMineSection({ marathonId, rows: preset }: MarathonMineSectionProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const { locale } = useT();
  const localeTag = bcp47FromAppLocale(locale);
  const viewerZone = useViewerTimezone();
  const ui = MARATHON_PAGE;
  const history = MARATHON_BANNER_UI;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [fetched, setFetched] = useState<MarathonBooking[]>([]);
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

  useEffect(() => {
    if (preset || !isAuthenticated) return;
    fetchMyMarathonBookings()
      .then((all) => setFetched(all.filter((row) => row.marathon_id === marathonId)))
      .catch(() => setFetched([]));
  }, [isAuthenticated, marathonId, preset]);

  const rows = preset ?? fetched;

  if (!rows.length) return null;

  if (rows.length === 1) {
    return (
      <Link href={marathonBookingPath(rows[0].id)} className={ui.viewBooking}>
        {copy.viewBookings}
        <span aria-hidden>→</span>
      </Link>
    );
  }

  return (
    <div ref={menuRef} className={cn(history.menuAnchor, open && history.menuOpen)}>
      <button type="button" className={ui.viewBooking} onClick={() => setOpen((value) => !value)}>
        {copy.viewBookings}
        <span aria-hidden>{open ? "▴" : "▾"}</span>
      </button>
      {open ? (
        <div className={history.history}>
          {rows.map((booking) => {
            const when = marathonDateParts(booking.starts_at, viewerZone, localeTag);
            return (
              <Link key={booking.id} href={marathonBookingPath(booking.id)} className={history.historyRow}>
                {when.time}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
