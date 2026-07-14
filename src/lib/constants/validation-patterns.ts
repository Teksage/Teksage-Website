/** Shared validation — used by login / profile forms. */

export const LOGIN_EMAIL_REGEX =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

/** @deprecated Prefer length-aware `isValidNationalMobile` — kept for India-default fallthrough. */
export const LOGIN_MOBILE_DIGITS_REGEX = /^[1-9]\d{9}$/;

/** Fallback max national digits when country length is unknown (E.164). */
export const MOBILE_NATIONAL_MAX_DIGITS = 15 as const;

export const MOBILE_NATIONAL_MIN_DIGITS = 4 as const;

/** @deprecated Prefer `nationalMobileMaxLength(expectedLength)`. */
export const MOBILE_INPUT_MAX_DIGITS = MOBILE_NATIONAL_MAX_DIGITS;
