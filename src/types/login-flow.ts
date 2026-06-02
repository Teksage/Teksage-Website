/** Login route UI step — mirrors Flutter login / OTP stack. */

export const OTP_CONTACT_TYPE_EMAIL = "email" as const;
export const OTP_CONTACT_TYPE_MOBILE = "mobile" as const;

export type OtpContactType =
  | typeof OTP_CONTACT_TYPE_EMAIL
  | typeof OTP_CONTACT_TYPE_MOBILE;

export type LoginStep = "form" | "otp";

export type LoginMethodTab = "mobile" | "email";
