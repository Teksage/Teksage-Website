"use client";

import { useEffect, useState } from "react";
import { fetchPublicMarathons } from "@/lib/services/marathon";
import type { MarathonEvent } from "@/types/marathon";

let soonest: Promise<MarathonEvent | null> | null = null;

function loadSoonest() {
  if (!soonest) {
    soonest = fetchPublicMarathons()
      .then((rows) => {
        const open = rows.filter((row) => !row.admin_ended);
        open.sort((left, right) => new Date(left.starts_at).getTime() - new Date(right.starts_at).getTime());
        return open[0] ?? null;
      })
      .catch(() => null);
  }
  return soonest;
}

export function useSoonestMarathon() {
  const [event, setEvent] = useState<MarathonEvent | null>(null);

  useEffect(() => {
    let live = true;
    void loadSoonest().then((row) => {
      if (live) setEvent(row);
    });
    return () => {
      live = false;
    };
  }, []);

  return event;
}
