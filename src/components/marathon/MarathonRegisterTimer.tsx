"use client";

import { useEffect, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { MARATHON_COPY, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import type { MarathonRegisterTimerProps } from "@/types/marathon";

function remainingLabel(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const clock = [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
  return days > 0 ? `${days}d ${clock}` : clock;
}

export function MarathonRegisterTimer({ closesAt, className, compact = false }: MarathonRegisterTimerProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const end = new Date(closesAt).getTime();
  if (Number.isNaN(end)) return null;
  const left = end - now;
  if (compact && left <= 0) return null;
  const text = left <= 0 ? copy.bookingClosed : compact ? remainingLabel(left) : copy.registerEnds.replace("{time}", remainingLabel(left));

  return <p className={className ?? MARATHON_PORTAL_UI.timer}>{text}</p>;
}
