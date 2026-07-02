/**
 * Profile Details screen — mirrors Flutter `profile_page.dart` field labels.
 */

export const PROFILE_DETAILS = {
  title: "Profile Details",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phone: "Phone Number",
  chatLanguage: "AI Chat Language",
  referralSource: "How did you first hear about Teksage?",
  dateOfBirth: "Date of Birth",
  timeOfBirth: "Time of Birth",
  placeOfBirth: "Place of Birth",
  currentLocation: "Current Location",
  rasi: "Rasi",
  nakshatram: "Nakshatram",
  verify: "Verify",
  save: "Save",
  edit: "Edit",
  discard: "Discard",
  otpHint: "We sent a 6-digit code to your mobile.",
  otpLabel: "OTP",
  confirmOtp: "Confirm",
  resentPrompt: "Did not receive a code? Tap Verify again.",
  notFoundTitle: "Profile not found",
  notFoundDescription: "Please log in to view your profile.",
  rashiResolving: "Updating Rasi & Nakshatram…",
  rashiResolveError: "Could not update Rasi/Nakshatram. Check birth details.",
} as const;

export const PROFILE_LAYOUT = {
  main: "relative z-10 mx-auto w-full max-w-lg overflow-visible px-5 pb-4 pt-5 lg:max-w-2xl lg:px-0 lg:pb-8",
  desktopPanel:
    "lg:rounded-2xl lg:border lg:border-[var(--color-home-dashboard-rule)] lg:bg-white lg:px-6 lg:py-6 lg:shadow-[0_4px_24px_rgb(0_0_0_/0.07)]",
  editButton:
    "mr-1 px-2 py-2 text-lg font-semibold text-[var(--color-brand-primary)]",
  errorBanner:
    "mb-4 text-center text-sm font-semibold text-[var(--color-brand-error)]",
} as const;

/** Default chat options — align with backend `VALID_LANGUAGES` / Flutter. */
export const CHAT_LANGUAGE_OPTIONS = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Marathi",
  "Kannada",
  "Malayalam",
] as const;
