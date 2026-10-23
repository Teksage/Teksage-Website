"use client";

import { useEffect, useState } from "react";
import { fetchPublicMarathons } from "@/lib/services/marathon";
import type { MarathonEvent } from "@/types/marathon";

let latestActive: Promise<MarathonEvent | null> | null = null;

function isBookingOpen(row: MarathonEvent, now: number): boolean {
  if (row.admin_ended) return false;
  if (row.booking_closes_at) {
    const closes = new Date(row.booking_closes_at).getTime();
    return Number.isFinite(closes) && closes > now;
  }
  const ends = new Date(row.ends_at).getTime();
  return Number.isFinite(ends) && ends > now;
}

/** Latest open marathon (by starts_at). Used for a single home-card timer. */
function loadLatestActive() {
  if (!latestActive) {
    latestActive = fetchPublicMarathons()
      .then((rows) => {
        const now = Date.now();
        const open = rows.filter((row) => isBookingOpen(row, now));
        open.sort(
          (left, right) =>
            new Date(right.starts_at).getTime() - new Date(left.starts_at).getTime()
        );
        return open[0] ?? null;
      })
      .catch(() => null);
  }
  return latestActive;
}

export function useSoonestMarathon() {
  const [event, setEvent] = useState<MarathonEvent | null>(null);

  useEffect(() => {
    let live = true;
    void loadLatestActive().then((row) => {
      if (live) setEvent(row);
    });
    return () => {
      live = false;
    };
  }, []);

  return event;
}
