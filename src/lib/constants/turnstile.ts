/** Cloudflare Turnstile — website login OTP only. */

export const TURNSTILE = {
  /** Body field name expected by FastAPI `LoginSchema`. */
  tokenField: "cf_turnstile_token",
  missingTokenError: "Please complete the captcha and try again.",
  verifyFailedError: "Captcha verification failed. Please try again.",
  widgetClassName: "flex w-full justify-center overflow-hidden rounded-xl",
} as const;
