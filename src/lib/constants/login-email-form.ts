/** Email login step — validation + errors (mirrors Flutter email OTP UX). */

export const LOGIN_EMAIL_FORM = {
  invalidEmail: "Enter a valid email address",
  sendOtpError: "Failed to send OTP. Please try again.",
  placeholder: "Enter Email",
  submitCta: "Continue",
  maxLength: 50,
  captchaRequired: "Please complete the captcha and try again.",
} as const;
