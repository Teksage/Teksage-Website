"use client";

import { MarathonRegisterTimer } from "@/components/marathon/MarathonRegisterTimer";
import { useSoonestMarathon } from "@/hooks/useSoonestMarathon";
import { DESKTOP_SIDEBAR_UI } from "@/lib/constants/desktop-sidebar-ui";

export function MarathonNavTimer() {
  const event = useSoonestMarathon();
  if (!event?.booking_closes_at) return null;
  return (
    <MarathonRegisterTimer
      closesAt={event.booking_closes_at}
      compact
      className={DESKTOP_SIDEBAR_UI.navTimer}
    />
  );
}
