import { ROUTES } from "./routes";

/** Change email/phone — mirrors Flutter ChangeButton → OTPScreen → ChangeEmailMobile. */

export const SETTINGS_CHANGE_CONTACT = {
  title: "Change Email / Mobile",
  titleChangeEmail: "Change Email",
  titleChangePhone: "Change Phone Number",
  titleVerifyEmail: "Verify Email",
  titleVerifyPhone: "Verify Phone Number",
  securityEmail:
    "For security reasons, kindly verify your existing email",
  securityPhone:
    "For security reasons, kindly verify your existing phone number",
  otpSentPrefix: "We have sent OTP to",
  enterNewEmail: "Enter your new email and verify it using OTP",
  enterNewPhone: "Enter your new phone number and verify it using OTP",
  newEmailLabel: "New Email",
  newPhoneLabel: "New Phone Number",
  continueCta: "Continue",
  confirmOtp: "Confirm",
  resendOtp: "Resend OTP",
  otpLabel: "OTP",
  otpHintExisting: "Enter the OTP sent to your current contact.",
  otpHintNewEmail: "Enter the OTP sent to your new email.",
  otpHintNewPhone: "Enter the OTP sent to your new mobile number.",
  success: "Contact updated successfully.",
  invalidEmail: "Enter a valid email address.",
  invalidMobile: "Enter a valid mobile number.",
  invalidOtp: "Enter a valid 6-digit OTP.",
  missingProfileContact: "No verified contact found on your profile.",
  sendOtpError: "Could not send OTP. Please try again.",
  modeQuery: "mode",
  modeQueryEmail: "email",
  modeQueryMobile: "mobile",
  countryCodeLabel: "Country code",
} as const;

export function buildChangeContactPath(mode: "email" | "mobile"): string {
  const value =
    mode === "email"
      ? SETTINGS_CHANGE_CONTACT.modeQueryEmail
      : SETTINGS_CHANGE_CONTACT.modeQueryMobile;
  return `${ROUTES.settingsChangeContact}?${SETTINGS_CHANGE_CONTACT.modeQuery}=${value}`;
}
