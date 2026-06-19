import { TYPO } from "./typography";

export const FEATURE_DISCOVERY_SCREEN = {
  title: "New ways to connect",
  body:
    "Enable WhatsApp Updates in Settings to receive alerts on WhatsApp. Use Ask Astrologer under any AI reply for a personalized expert answer.",
  whatsappHint: "Settings → WhatsApp Updates",
  askAstrologerHint: "Tap Ask Astrologer below any chat reply",
  gotIt: "Got it",
  openWhatsAppSettings: "WhatsApp Updates",
} as const;

/** Mirrors Flutter `whatsapp_ask_discovery_dialog.dart` spacing and colors. */
export const FEATURE_DISCOVERY_UI = {
  overlay: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6",
  backdrop: "absolute inset-0 bg-black/50 backdrop-blur-md",
  panel:
    "relative z-10 w-full max-w-[22rem] rounded-2xl bg-white px-5 py-6 shadow-xl sm:max-w-sm sm:px-6",
  title: `${TYPO.sizeLg} ${TYPO.weightSemibold} text-[var(--color-brand-black)]`,
  body: `mt-2.5 ${TYPO.label} ${TYPO.leadingNormal} text-[var(--color-brand-black)]/70`,
  hints: "mt-5 flex flex-col gap-2.5",
  hintRow: "flex items-start gap-2",
  hintIcon: "mt-0.5 size-[1.125rem] shrink-0 text-[var(--color-brand-primary)]",
  hintText: `${TYPO.sizeSmPlus} ${TYPO.weightMedium} ${TYPO.leadingSnug} text-[var(--color-brand-black)]/80`,
  link: `mt-5 inline-block ${TYPO.labelSemibold} text-[var(--color-brand-primary)] hover:underline`,
  cta:
    `mt-5 w-full rounded-full bg-[var(--color-brand-banner)] py-3.5 ${TYPO.sizeBase} ${TYPO.weightSemibold} text-white transition-opacity hover:opacity-90`,
} as const;
