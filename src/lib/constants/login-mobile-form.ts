/** Mobile login (future tab) — validation copy. */

export const LOGIN_MOBILE_FORM = {
  invalidMobile: "Enter a valid 10-digit mobile number",
  sendOtpError: "Failed to send OTP. Please try again.",
  placeholder: "Enter Mobile Number",
  submitCta: "Continue",
  countryCodeAria: "Country code",
} as const;

export const LOGIN_MOBILE_COUNTRY_DIAL_OPTIONS = [
  { dial: "+91", label: "+91" },
  { dial: "+1", label: "+1" },
] as const;
