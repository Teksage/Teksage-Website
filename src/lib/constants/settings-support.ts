export const SETTINGS_SUPPORT_COPY = {
  lead: "Got a question?\nOur support team is here to guide your path",
  placeholder: "Enter feedback or query here...",
  submit: "Submit",
  submitting: "Sending…",
  emptyError: "Please enter your message.",
  success:
    "Thanks for reaching out! Your query has been received — our team will respond shortly.",
  failed: "Something went wrong. Please try again.",
  orDivider: "or",
  whatsappCta: "Contact via WhatsApp",
  whatsappHint: "Opens WhatsApp with a short message you can edit before sending.",
} as const;

/** Detected by backend so only Support-button chats email ops. */
const SUPPORT_WHATSAPP_MARKER = "[Teksage Support]";

/** Teksage business WhatsApp — same number as admin 24h inbox. */
export const SETTINGS_SUPPORT_WHATSAPP = {
  e164: "919840178216",
  marker: SUPPORT_WHATSAPP_MARKER,
  prefill: `Hello Teksage Support,\n\nI would like assistance with my account. Please find the details of my request below:\n\n${SUPPORT_WHATSAPP_MARKER}`,
} as const;

export function buildSupportWhatsAppUrl(): string {
  const text = encodeURIComponent(SETTINGS_SUPPORT_WHATSAPP.prefill);
  return `https://wa.me/${SETTINGS_SUPPORT_WHATSAPP.e164}?text=${text}`;
}
