/** Live remaining time until partner referral discount expires. */

export type PartnerCountdownParts = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

/** Parse API `expires_at` (UTC, may lack `Z`) to epoch ms. */
export function partnerExpiresAtMs(expiresAt?: string | null): number | null {
  if (!expiresAt?.trim()) return null;
  const raw = expiresAt.trim();
  const withZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(raw) ? raw : `${raw}Z`;
  const ms = Date.parse(withZone);
  return Number.isFinite(ms) ? ms : null;
}

export function partnerCountdownParts(
  expiresAtMs: number | null,
  nowMs = Date.now()
): PartnerCountdownParts {
  if (expiresAtMs == null) {
    return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const totalMs = Math.max(0, expiresAtMs - nowMs);
  const expired = totalMs <= 0;
  const totalSec = Math.floor(totalMs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { totalMs, days, hours, minutes, seconds, expired };
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Compact chip: `1d 04:32:18` or `04:32:18` when under a day. */
export function formatPartnerCountdown(parts: PartnerCountdownParts): string {
  if (parts.expired) return "00:00:00";
  const hms = `${pad2(parts.hours)}:${pad2(parts.minutes)}:${pad2(parts.seconds)}`;
  if (parts.days > 0) return `${parts.days}d ${hms}`;
  return hms;
}
