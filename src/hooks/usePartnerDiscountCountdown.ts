"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatPartnerCountdown,
  partnerCountdownParts,
  partnerExpiresAtMs,
  type PartnerCountdownParts,
} from "@/lib/partner-discount-countdown";

const TICK_MS = 1000;

/**
 * Live countdown to partner discount `expiresAt`.
 * Falls back once from `daysLeft` when `expiresAt` is missing.
 */
export function usePartnerDiscountCountdown(
  expiresAt?: string | null,
  daysLeft = 0
): { label: string; parts: PartnerCountdownParts } {
  const expiresMs = useMemo(() => {
    const fromApi = partnerExpiresAtMs(expiresAt);
    if (fromApi != null) return fromApi;
    if (daysLeft > 0) return Date.now() + daysLeft * 86_400_000;
    return null;
  }, [expiresAt, daysLeft]);

  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    if (expiresMs == null) return;
    const id = window.setInterval(() => setNowMs(Date.now()), TICK_MS);
    return () => window.clearInterval(id);
  }, [expiresMs]);

  const parts = partnerCountdownParts(expiresMs, nowMs);
  return { label: formatPartnerCountdown(parts), parts };
}
