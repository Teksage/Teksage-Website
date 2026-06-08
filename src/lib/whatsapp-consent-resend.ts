import { WHATSAPP_CONSENT_RESEND_COOLDOWN_MS } from "@/lib/constants/whatsapp-updates";
import { digitsOnly } from "@/lib/phone-utils";

export function maskPhoneForDisplay(countryCode: string, mobile: string): string {
  const cc = digitsOnly(countryCode) || "91";
  const national = digitsOnly(mobile);
  if (!national) return `+${cc}`;
  if (national.length <= 4) return `+${cc} ****`;
  return `+${cc} ${"*".repeat(national.length - 4)}${national.slice(-4)}`;
}

export function formatResendCountdown(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/** API datetimes from Python utcnow() arrive without a timezone suffix. */
export function parseApiUtcMs(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const trimmed = iso.trim();
  if (!trimmed) return null;
  const hasZone = /[zZ]$|[+-]\d{2}:\d{2}$/.test(trimmed);
  const normalized = hasZone ? trimmed : `${trimmed}Z`;
  const ms = Date.parse(normalized);
  return Number.isNaN(ms) ? null : ms;
}

export function getResendSecondsRemaining(
  consentSentAt: string | null,
  resendAvailableAt: string | null,
  nowMs: number = Date.now()
): number {
  const targetMs = parseApiUtcMs(resendAvailableAt);
  if (targetMs !== null) {
    return Math.max(0, Math.ceil((targetMs - nowMs) / 1000));
  }
  const sentMs = parseApiUtcMs(consentSentAt);
  if (sentMs === null) return 0;
  const elapsed = nowMs - sentMs;
  return Math.max(0, Math.ceil((WHATSAPP_CONSENT_RESEND_COOLDOWN_MS - elapsed) / 1000));
}
