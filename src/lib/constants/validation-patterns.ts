/** Shared validation — used by login / profile forms. */

export const LOGIN_EMAIL_REGEX =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

export const LOGIN_MOBILE_DIGITS_REGEX = /^[1-9]\d{9}$/;

export const MOBILE_INPUT_MAX_DIGITS = 10 as const;
