/** OTP verify step — copy + navigation targets. */

export const OTP_VERIFY_SCREEN = {
  invalidOtp: "Invalid OTP. Please try again.",
  resendError: "Failed to resend OTP. Please try again.",
  captchaRequired: "Please complete the captcha to resend OTP.",
  heading: "Enter OTP",
  sentBeforeDigits: "We sent a ",
  sentAfterDigits: "-digit code to",
  verifyCta: "Verify & Login",
  resendQuestion: "Didn't receive OTP?",
  resendCta: "Resend",
  resendWaitPrefix: "Resend in ",
  resendWaitSuffix: "s",
} as const;
