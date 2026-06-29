/** Flutter `customSnackBar` / `snackBarHelper.dart` — Android palette. */

export const APP_SNACKBAR_DURATION_MS = {
  success: 3000,
  error: 3000,
  info: 3000,
} as const;

export const APP_SNACKBAR_MESSAGES = {
  profileUpdated: "Profile updated successfully",
  profileSaveFailed: "Failed to save profile. Please try again.",
  genericError: "Something went wrong. Please try again.",
  logoutSuccess: "Logged out successfully",
  logoutFailed: "Logout failed. Please try again.",
  deleteAccountFarewell: "Thanks for using Teksage",
  otpSent: "OTP sent successfully",
  otpVerified: "OTP Verified",
  paymentSuccess: "Payment successful!",
  paymentFailed: "Payment verification failed. Please try again.",
  paymentFailedGeneric: "Payment failed. Please try again.",
  languageUpdated: "Language updated successfully",
  predictionRegenerated: "Prediction regenerated successfully",
  shareSuccess: "Shared successfully",
  downloadSuccess: "Downloaded successfully",
  answerSubmitted: "Answer submitted",
  autoRenewCancelled: "Auto-renewal cancelled successfully",
  contactOtpSent: "OTP sent successfully",
} as const;

export const APP_SNACKBAR_UI = {
  hostTop:
    "pointer-events-none fixed inset-x-0 top-[max(4.5rem,env(safe-area-inset-top,0px)+3.5rem)] z-[200] flex justify-center px-4",
  hostBottom:
    "pointer-events-none fixed inset-x-0 bottom-[max(5.5rem,env(safe-area-inset-bottom,0px)+4.5rem)] z-[200] flex justify-center px-4",
  hostDesktopBottomRight:
    "lg:inset-x-auto lg:left-auto lg:right-6 lg:top-auto lg:bottom-6 lg:justify-end lg:px-0",
  bar: "pointer-events-auto flex w-full max-w-lg overflow-hidden rounded-xl shadow-md",
  indicator: "w-1.5 shrink-0 self-stretch",
  body: "flex min-h-[3.25rem] flex-1 items-center gap-3 px-4 py-3",
  message: "text-sm font-medium leading-snug text-[var(--color-brand-black)]",
  icon: "size-7 shrink-0",
} as const;

export const APP_SNACKBAR_VARIANT_STYLES = {
  success: {
    surface: "bg-[var(--color-snackbar-success-bg)]",
    indicator: "bg-[var(--color-brand-primary)]",
    iconClass: "text-[var(--color-brand-primary)]",
  },
  error: {
    surface: "bg-[var(--color-snackbar-error-bg)]",
    indicator: "bg-[var(--color-brand-error)]",
    iconClass: "text-[var(--color-brand-error)]",
  },
  info: {
    surface: "bg-[var(--color-snackbar-info-bg)]",
    indicator: "bg-[var(--color-brand-primary)]",
    iconClass: "text-[var(--color-brand-primary)]",
  },
} as const;
