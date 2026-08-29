/**
 * Profile Details screen — mirrors Flutter `profile_page.dart` field labels.
 */

import { TYPO } from "@/lib/constants/typography";

export const PROFILE_DETAILS = {
  title: "Profile Details",
  subtitle: "Manage your personal info and birth chart details.",
  backLabel: "Settings",
  heroHint: "Your birth chart details power predictions & chat.",
  sectionPersonal: "Personal info",
  sectionBirth: "Birth details",
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
  change: "Change",
  save: "Save",
  edit: "Edit",
  discard: "Discard",
  otpHint: "We sent a 6-digit code to your mobile.",
  otpHintEmail: "We sent a 6-digit code to your email.",
  otpLabel: "OTP",
  confirmOtp: "Confirm",
  resentPrompt: "Did not receive a code? Tap Verify again.",
  notFoundTitle: "Profile not found",
  notFoundDescription: "Please log in to view your profile.",
  rashiResolving: "Updating Rasi & Nakshatram…",
  rashiResolveError: "Could not update Rasi/Nakshatram. Check birth details.",
} as const;

export const PROFILE_LAYOUT = {
  pageRoot: "relative min-h-dvh mint-glow-surface",
  /** Same content width as Settings (`lg:max-w-6xl`). */
  desktopPanel:
    "relative z-10 mx-auto w-full max-w-lg px-4 pb-8 pt-4 lg:my-6 lg:max-w-6xl lg:px-8 lg:pb-10 lg:pt-6",
  /** Settings-style intro: breadcrumb back, then title + Edit on one row. */
  pageHeader: "mb-6 flex flex-col gap-4",
  pageHeaderBack:
    `inline-flex w-fit items-center gap-1.5 rounded-full py-1 pr-2.5 ${TYPO.sizeSm} ${TYPO.weightMedium} text-black/50 transition-colors hover:bg-black/5 hover:text-[var(--color-brand-black)]`,
  pageHeaderBackIcon: "size-[1.1rem] shrink-0",
  pageHeaderIntro: "flex items-start justify-between gap-4",
  pageHeaderText: "min-w-0 flex-1",
  pageTitle: `${TYPO.size2xl} ${TYPO.weightBold} tracking-tight text-[var(--color-brand-black)]`,
  pageSubtitle: `${TYPO.sizeSm} ${TYPO.weightMedium} mt-1 max-w-xl text-black/45`,
  pageHeaderAction: "shrink-0 pt-0.5",
  main: "flex flex-col",
  heroCard:
    "mb-4 w-full overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.06)]",
  heroInner:
    "relative flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:gap-5 sm:px-6",
  heroGlow:
    "pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,var(--color-home-screen-mint)_0%,transparent_100%)] opacity-70",
  heroAvatar: `relative z-[1] flex size-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] ${TYPO.sizeLg} ${TYPO.weightBold} text-white shadow-[0_4px_14px_rgb(16_177_0_/_0.28)] ring-[3px] ring-white`,
  heroText: "relative z-[1] min-w-0 flex-1",
  heroName: `${TYPO.sizeMd} ${TYPO.weightBold} truncate text-[var(--color-brand-black)]`,
  heroHint: `${TYPO.sizeXs} mt-0.5 truncate text-black/45`,
  heroMeta: "relative z-[1] mt-2 flex flex-wrap gap-2",
  heroPill: `inline-flex items-center rounded-full bg-[var(--color-home-screen-mint)]/80 px-2.5 py-1 ${TYPO.sizeXs} ${TYPO.weightSemibold} text-[var(--color-brand-primary)]`,
  sectionsStack: "flex w-full flex-col gap-4",
  sectionCard:
    "overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-white px-4 py-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)] lg:px-6 lg:py-6",
  sectionTitle: `${TYPO.sizeSm} ${TYPO.weightBold} mb-4 text-[var(--color-brand-black)]`,
  fieldsStack: "flex flex-col gap-4",
  fieldsGrid: "grid grid-cols-1 gap-4 sm:grid-cols-2",
  editButton: `${TYPO.sizeSm} ${TYPO.weightSemibold} rounded-full bg-[var(--color-home-screen-mint)]/80 px-4 py-2 text-[var(--color-brand-primary)] transition-colors hover:bg-[var(--color-home-screen-mint)]`,
  errorBanner: `${TYPO.sizeSm} ${TYPO.weightSemibold} mb-4 text-center text-[var(--color-brand-error)]`,
  saveButton:
    "mt-1 h-11 w-full rounded-full bg-[var(--color-brand-primary)] font-semibold text-white hover:bg-[var(--color-brand-primary)]/90 sm:max-w-[14rem]",
  saveRow: "mt-2 flex justify-start",
} as const;

/** Shared field chrome — profile details form. */
export const PROFILE_FIELD_UI = {
  label: `${TYPO.sizeSm} ${TYPO.weightMedium} text-[var(--color-brand-black)]/70`,
  labelRequired: "text-[var(--color-brand-error)]",
  inputBase: `h-12 rounded-xl px-4 ${TYPO.sizeSm} ${TYPO.weightMedium} transition-colors focus-visible:ring-0`,
  inputIdle:
    "border border-black/[0.08] bg-[var(--color-brand-bg)] focus-visible:border-[var(--color-brand-primary)] focus-visible:bg-white",
  inputDisabled:
    "cursor-not-allowed border border-black/[0.06] bg-[var(--color-brand-bg)] text-neutral-700",
  inputError:
    "border-[var(--color-brand-error)] focus-visible:border-[var(--color-brand-error)]",
  shell:
    "flex h-12 items-stretch overflow-hidden rounded-xl border border-black/[0.08] bg-[var(--color-brand-bg)]",
  shellError: "border-[var(--color-brand-error)]",
  errorText: `${TYPO.sizeXs} ${TYPO.weightSemibold} text-[var(--color-brand-error)]`,
  select: `h-12 w-full appearance-none rounded-xl border border-black/[0.08] bg-[var(--color-brand-bg)] px-4 pr-11 ${TYPO.sizeSm} ${TYPO.weightMedium} focus-visible:border-[var(--color-brand-primary)] focus-visible:bg-white focus-visible:outline-none`,
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
