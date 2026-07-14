import { digitsOnly } from "@/lib/phone-utils";
import { resolveMobileLengthForDial } from "@/lib/services/countries";
import {
  MOBILE_NATIONAL_MAX_DIGITS,
  MOBILE_NATIONAL_MIN_DIGITS,
} from "@/lib/constants/validation-patterns";

/** True when national digits match expected length, or fall in a safe range. */
export function isValidNationalMobile(
  mobile: string | null | undefined,
  expectedLength?: number | null
): boolean {
  const digits = digitsOnly(mobile);
  if (!digits) return false;
  if (expectedLength != null && expectedLength > 0) {
    return digits.length === expectedLength;
  }
  return (
    digits.length >= MOBILE_NATIONAL_MIN_DIGITS &&
    digits.length <= MOBILE_NATIONAL_MAX_DIGITS
  );
}

export function nationalMobileMaxLength(
  expectedLength?: number | null
): number {
  if (expectedLength != null && expectedLength > 0) return expectedLength;
  return MOBILE_NATIONAL_MAX_DIGITS;
}

/** Resolve expected national length from dial digits using cached countries. */
export function expectedLengthForCountryCode(
  countryCode: string | null | undefined
): number | null {
  return resolveMobileLengthForDial(countryCode);
}
