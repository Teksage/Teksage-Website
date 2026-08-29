import { TYPO } from "@/lib/constants/typography";

export const DELETE_ACCOUNT_REASONS = [
  "I am having another account",
  "App not working properly",
  "I don't like the app",
  "I am worried about my privacy",
] as const;

/** Flutter `deleteAccount_mainPage.dart` + `deleteOTPScreen.dart` — i18n keys match `en_US.json`. */
export const SETTINGS_DELETE_COPY = {
  prompt: "We value your experience.\nWhat made you decide to leave?",
  aboutToDelete: "You are about to delete\nyour account",
  deleteWarning:
    "All data associated with this account (including your profile, service, bookings, horoscopes, predictions) will be permanently deleted in 45 days",
  deleteAccountNow: "Delete Account Now",
  cancelDelete: "No, I have changed my mind",
  verifyEmail: "Verify Email",
  otpSentTo: "We have sent OTP to",
  resendOtpInSeconds: "resend_otp_in_seconds",
  resendOtp: "Resend OTP",
  failed: "Could not complete deletion. Try again.",
  invalidOtp: "Please enter a valid OTP",
} as const;

export const DELETE_ACCOUNT_LAYOUT = {
  shell: "flex w-full flex-col",
  prompt: `${TYPO.chatBubble} text-black/50`,
  reasonSpacer: "mt-6",
  reasonRow:
    "flex w-full items-start justify-between gap-3 border-b border-black/[0.08] py-4 text-left last:border-b-0",
  reasonText: `min-w-0 flex-1 ${TYPO.chatBubble} text-[var(--color-brand-black)]`,
  reasonChevron: "mt-0.5 size-5 shrink-0 -rotate-90 opacity-70",
  confirmBlock: "mx-auto flex w-full max-w-md flex-col items-center text-center",
  confirmTitle: `${TYPO.h3} text-[var(--color-brand-black)]`,
  confirmBody: `${TYPO.chatBubble} mt-2.5 text-black/60`,
  confirmActions: "mt-8 flex w-full max-w-md flex-col gap-4",
  deleteNowBtn:
    `w-full rounded-full bg-[var(--color-brand-error)] py-3 text-center ${TYPO.chatBubble} text-white transition-opacity hover:opacity-95 disabled:opacity-60`,
  cancelBtn:
    `w-full rounded-full border border-black/[0.12] bg-white py-3 text-center ${TYPO.chatBubble} text-[var(--color-brand-black)] transition-opacity hover:opacity-95`,
  otpBlock: "flex flex-1 flex-col items-center px-1 pt-4",
  otpTitle: `${TYPO.h3Bold} text-center text-[var(--color-brand-black)]`,
  otpLead: `${TYPO.chatBubble} mt-10 text-center text-black/60`,
  otpContact: `${TYPO.chatCardText} text-center text-black/60`,
  otpInputWrap: "mt-10 w-full",
  otpError: `${TYPO.chatBubble} mt-2 text-center text-[var(--color-brand-error)]`,
  otpResend: `${TYPO.chatBubble} mt-10 text-center text-black/60`,
  otpResendBtn: `${TYPO.chatBubble} text-[var(--color-brand-primary)]`,
} as const;
