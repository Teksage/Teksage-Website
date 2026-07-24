import { OTP_LENGTH } from "@/lib/constants";

export function emptyOtpCells(): string[] {
  return Array.from({ length: OTP_LENGTH }, () => "");
}

/** Mask national mobile for OTP screen — works for variable lengths. */
export function maskNationalMobile(contact: string): string {
  const digits = contact.replace(/\D/g, "");
  if (digits.length <= 4) return "*".repeat(digits.length);
  const visibleStart = Math.min(2, Math.floor(digits.length / 4));
  const visibleEnd = Math.min(2, Math.floor(digits.length / 4));
  const mid = digits.length - visibleStart - visibleEnd;
  return (
    digits.slice(0, visibleStart) +
    "x".repeat(Math.max(mid, 1)) +
    digits.slice(digits.length - visibleEnd)
  );
}
