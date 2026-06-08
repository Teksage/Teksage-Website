import { TYPO } from "@/lib/constants/typography";

export const WHATSAPP_UPDATES_SCREEN = {
  title: "WhatsApp Updates",
  backAria: "Go back",
  heroLead: "Never Miss an",
  heroHighlight: "Important Astrological Opportunity",
  heroBody:
    "Get timely WhatsApp alerts about important planetary movements, favorable periods, and personalized horoscope updates that can help you make better decisions at the right time.",
  benefitsTitle: "What You'll Receive",
  benefitTransitTitle: "Major Planetary Transits",
  benefitTransitDesc: "Important movements that impact your life.",
  benefitFavorableTitle: "Favorable Periods",
  benefitFavorableDesc: "Best times for important decisions and activities.",
  benefitHoroscopeTitle: "Personalized Horoscope Highlights",
  benefitHoroscopeDesc: "Key insights based on your unique birth chart.",
  benefitAlertsTitle: "Important Alerts",
  benefitAlertsDesc: "Special days, events and astrological updates.",
  ctaLabel: "Enable WhatsApp Astrology Alerts",
  ctaSending: "Sending…",
  unsubscribeNote: "You can unsubscribe anytime by sending",
  unsubscribeKeyword: "STOP",
  unsubscribeSuffix: "on WhatsApp.",
  pendingTitle: "Check your WhatsApp",
  pendingBody: "We sent a confirmation message. Reply on WhatsApp to enable alerts.",
  grantedTitle: "WhatsApp alerts enabled",
  grantedBody: "You will receive astrology updates on WhatsApp.",
  disableCtaLabel: "Disable WhatsApp Alerts",
  disableCtaSending: "Disabling…",
  revokedTitle: "WhatsApp alerts disabled",
  revokedBody:
    "You will no longer receive astrology updates on WhatsApp. Tap the button below to enable alerts again.",
  reenableHint: "We will send a new confirmation message on WhatsApp.",
  revokeFailed: "Could not disable WhatsApp alerts. Try again later.",
  verifyPhoneTitle: "Verify your mobile number",
  verifyPhoneBody: "Verify your phone to receive the WhatsApp consent message.",
  loadFailed: "Could not load WhatsApp status.",
  requestFailed: "Could not send WhatsApp message. Try again later.",
  resendCooldown: "Message already sent. Check WhatsApp or try again later.",
  phoneChoiceProfileLabel: "Use my verified profile number",
  phoneChoiceDifferentLabel: "Use a different WhatsApp number",
  phoneChoiceInvalidMobile: "Enter a valid mobile number.",
  sendConfirmationLabel: "Send confirmation message",
  pendingSentToPrefix: "Message sent to",
  resendCta: "Resend WhatsApp message",
  resendSending: "Resending…",
  resendCooldownHint: "Resend available in",
  resendCooldownActive: "Please wait before resending",
  changeNumberLink: "Use a different number",
  startOverLink: "Didn't get the message? Start over",
  startOverSending: "Starting over…",
  resendDeliveryHint:
    "If resend still doesn't arrive, start over or try a different WhatsApp number.",
} as const;

/** Poll consent status while waiting for the user to reply on WhatsApp. */
export const WHATSAPP_CONSENT_POLL_MS = 5000;

/** Fallback resend cooldown when API omits resend_available_at. */
export const WHATSAPP_CONSENT_RESEND_COOLDOWN_MS = 120_000;

export const WHATSAPP_UPDATES_UI = {
  page: "relative z-10 flex min-h-0 flex-1 flex-col bg-[var(--color-surface-muted)]",
  inner: "mx-auto flex w-full max-w-lg min-h-0 flex-1 flex-col px-4 pb-8",
  heroTitle: `${TYPO.pageTitle} font-bold text-[var(--color-brand-black)] leading-tight`,
  heroHighlight: "text-[var(--color-brand-primary)]",
  heroBody: `${TYPO.body} text-[var(--color-brand-black)]/80 mt-3`,
  card: "mt-6 rounded-2xl border border-black/5 bg-white p-4 shadow-sm",
  benefitsSectionTitle: `${TYPO.body} font-semibold text-[var(--color-brand-primary)]`,
  benefitRow: "flex gap-3 py-3 first:pt-0 last:pb-0",
  benefitIcon:
    "flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/15",
  benefitTitle: `${TYPO.body} font-semibold text-[var(--color-brand-black)]`,
  benefitDesc: `${TYPO.bodySm} text-[var(--color-brand-black)]/65 mt-0.5`,
  footer: `${TYPO.bodySm} text-[var(--color-brand-primary)] text-center mt-4 px-2`,
  statusBox: "mt-4 rounded-xl bg-white border border-black/10 p-4 text-center",
  statusTitle: `${TYPO.body} font-semibold text-[var(--color-brand-black)]`,
  statusBody: `${TYPO.bodySm} text-[var(--color-brand-black)]/70 mt-1`,
  disableBtn:
    "mt-4 flex h-11 w-full items-center justify-center rounded-xl border border-[var(--color-brand-error)]/40 bg-white text-base font-semibold text-[var(--color-brand-error)] hover:bg-[var(--color-brand-error)]/5 disabled:opacity-50",
  phoneChoiceRow: "flex items-start gap-3 rounded-lg border border-black/10 p-3 text-left",
  phoneChoiceRadioInput: "sr-only",
  phoneChoiceRadioIndicator:
    "mt-1 size-4 shrink-0 rounded-full border-2 border-[var(--color-brand-black)]/20 bg-white",
  phoneChoiceRadioIndicatorSelected:
    "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]",
  phoneChoiceLabel: `${TYPO.bodySm} font-medium text-[var(--color-brand-black)]`,
  phoneChoiceHint: `${TYPO.bodySm} text-[var(--color-brand-black)]/65 mt-0.5`,
  phoneInputWrap: "mt-3 flex gap-2",
  phoneDialSelect:
    "flex h-12 min-w-[72px] shrink-0 items-center justify-center rounded-xl border border-neutral-300 bg-white px-2",
  phoneMobileInput:
    "h-12 flex-1 rounded-xl border-neutral-300 bg-white px-4 text-base font-semibold shadow-sm ring-1 ring-inset ring-neutral-300 focus-visible:border-[var(--color-brand-primary)] focus-visible:ring-0",
  resendBtn:
    "mt-4 flex h-11 w-full items-center justify-center rounded-xl bg-[var(--color-brand-primary)] text-base font-semibold text-white hover:bg-[var(--color-brand-primary)]/90 disabled:opacity-50",
  pendingLinkStack: "mt-3 flex w-full flex-col items-center gap-2",
  changeNumberBtn:
    `${TYPO.bodySm} block w-full text-center font-medium text-[var(--color-brand-primary)] underline-offset-2 hover:underline`,
  resendCountdown:
    `${TYPO.body} mt-3 font-semibold tabular-nums text-[var(--color-brand-primary)]`,
  resendCountdownHint: `${TYPO.bodySm} mt-1 text-[var(--color-brand-black)]/65`,
} as const;
