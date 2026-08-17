import { ROUTES } from "./routes";
import { TYPO } from "./typography";

/** Change email/phone — mirrors Flutter ChangeButton → OTPScreen → ChangeEmailMobile. */

export const SETTINGS_CHANGE_CONTACT = {
  title: "Change Email / Mobile",
  subtitle: "Verify your current contact, then enter the new one.",
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

export const CHANGE_CONTACT_LAYOUT = {
  pageRoot: "relative min-h-dvh mint-glow-surface",
  panel:
    "relative z-10 mx-auto w-full max-w-lg px-4 pb-8 pt-5 lg:my-6 lg:max-w-6xl lg:px-8 lg:pb-10",
  lead: `${TYPO.chatBubble} text-black/55`,
  contact: `${TYPO.chatCardTextBot} text-[var(--color-brand-black)]`,
  feedbackOk: `${TYPO.chatBubble} text-[var(--color-brand-primary)]`,
  feedbackError: `${TYPO.chatBubble} text-[var(--color-brand-error)]`,
} as const;

export function buildChangeContactPath(mode: "email" | "mobile"): string {
  const value =
    mode === "email"
      ? SETTINGS_CHANGE_CONTACT.modeQueryEmail
      : SETTINGS_CHANGE_CONTACT.modeQueryMobile;
  return `${ROUTES.settingsChangeContact}?${SETTINGS_CHANGE_CONTACT.modeQuery}=${value}`;
}
