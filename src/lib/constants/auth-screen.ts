/** Shared login + OTP chrome — mint glow shell + chat typography. */

import { TYPO } from "@/lib/constants/typography";

export const AUTH_SCREEN = {
  shellClassName: "auth-page-mesh flex min-h-dvh",
  formColumnClassName:
    "auth-form-column-surface relative flex min-h-dvh flex-1 flex-col items-center justify-center px-5 py-10 sm:px-10",
  formWrapClassName: "auth-form-enter relative z-10 w-full max-w-[420px]",
  panelClassName:
    "auth-glass-panel overflow-hidden rounded-2xl border p-6 sm:p-8",
  panelBodyClassName: "space-y-5",
  accentBarClassName:
    "mb-6 h-1 w-full rounded-full bg-[var(--color-brand-primary)]",
  mobileBrandClassName:
    "auth-form-enter relative z-10 mb-8 flex flex-col items-center gap-3 lg:hidden",
  mobileBrandTaglineClassName: `max-w-xs text-center ${TYPO.chatBubble} text-black/55`,
  headingBlockClassName: "space-y-2",
  headingClassName: `${TYPO.h1} text-[var(--color-brand-black)]`,
  subtextClassName: `${TYPO.chatBubble} text-black/55`,
  contactEmphasisClassName: `${TYPO.weightExtrabold} text-[var(--color-brand-black)]`,
  legalClassName: `mt-6 text-center ${TYPO.sizeXs} ${TYPO.weightMedium} leading-relaxed text-black/45`,
  ctaClassName: `h-12 w-full rounded-full ${TYPO.sizeBodySm} ${TYPO.weightExtrabold} transition-opacity`,
  ctaReadyClassName:
    "bg-[var(--color-brand-primary)] text-white hover:opacity-90",
  ctaDisabledClassName:
    "cursor-not-allowed bg-[var(--login-email-cta-disabled-bg)] text-[var(--login-email-cta-disabled-text)]",
  inputClassName:
    "h-12 rounded-2xl border-0 bg-white px-4 text-base font-semibold text-[var(--color-brand-black)] shadow-[0_1px_6px_rgb(0_0_0_/_0.04)] ring-1 ring-inset ring-black/[0.08] focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]",
  dialPickerClassName:
    "flex h-12 min-w-[88px] shrink-0 items-center justify-center rounded-2xl border border-black/[0.08] bg-white px-2 text-base font-bold text-[var(--color-brand-black)] shadow-[0_1px_6px_rgb(0_0_0_/_0.04)]",
  otpRowClassName: "flex justify-center gap-2.5 sm:gap-3",
  otpCellClassName:
    "h-12 w-11 rounded-2xl bg-white text-center text-xl font-bold text-[var(--color-brand-black)] outline-none transition-[box-shadow,border-color,background-color] sm:h-14 sm:w-12",
  otpCellIdleClassName:
    "border border-black/[0.08] shadow-[0_1px_6px_rgb(0_0_0_/_0.04)] focus:border-[var(--color-brand-primary)] focus:shadow-[0_0_0_3px_var(--auth-otp-focus-ring)]",
  otpCellFilledClassName:
    "border border-[var(--color-brand-primary)] bg-[var(--auth-otp-filled-bg)]",
  otpCellErrorClassName:
    "border border-[var(--color-brand-error)] text-[var(--color-brand-error)] focus:shadow-[0_0_0_3px_var(--auth-otp-error-ring)]",
  tabsTrackClassName: "relative mb-5 flex rounded-xl bg-black/[0.04] p-1",
  tabPillClassName:
    "auth-tab-pill pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-lg bg-[var(--color-brand-primary)] shadow-[0_1px_6px_rgb(16_177_0_/_0.2)]",
  tabPillEmailClassName: "auth-tab-pill-email",
  tabClassName: `relative z-10 flex-1 rounded-lg py-2.5 ${TYPO.sizeSm} ${TYPO.weightSemibold} transition-colors duration-200`,
  tabActiveClassName: "text-white",
  tabIdleClassName: "text-black/50 hover:text-black/70",
  tabPanelClassName: "auth-tab-panel",
  errorClassName: `mt-3 text-center ${TYPO.errorSemibold} text-[var(--color-brand-error)]`,
  resendClassName: `mt-5 text-center ${TYPO.chatBubble} text-black/55 transition-colors`,
} as const;
