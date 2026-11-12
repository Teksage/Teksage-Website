import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import { MARATHON_PAGE } from "@/lib/constants/marathon";
import { SETTINGS_SUPPORT_WHATSAPP } from "@/lib/constants/settings-support";
import { TYPO } from "@/lib/constants/typography";

export const ASTROCONNECT_LEAD_COPY = {
  /** Button on the AstroConnect event card. */
  cardCta: "Notify me",
  /** Card CTA after the user already submitted for this event. */
  cardCtaView: "View notification",
  title: "Stay in the loop",
  subtitle: "Share your details and confirm on WhatsApp. No login needed.",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  phoneLabel: "Phone",
  phonePlaceholder: "Mobile number",
  countryCodeAria: "Country code",
  categoryLabel: "Category you are interested",
  submit: "Notify me",
  submitting: "Saving…",
  tapSendTitle: "You're on the list",
  tapSendBody: "WhatsApp is opening with prefilled message. Tap Send to confirm updates.",
  openWhatsApp: "Open WhatsApp",
  alreadySubmitted: "You're already registered for this event.",
  alreadySubmittedBody:
    "Confirm on WhatsApp if you haven't yet, or follow us for updates.",
  grantedTitle: "You're all set",
  grantedBody: "WhatsApp alerts are enabled for your interests. Follow us for more updates.",
  followUs: "Follow us",
  joinChannel: "WhatsApp Channel",
  joinInstagram: "Instagram",
  errorGeneric: "Could not save your details. Please try again.",
  errorName: "Please enter your name.",
  errorPhone: "Please enter a valid mobile number.",
  errorCategory: "Please select a category.",
  notFound: "This AstroConnect event was not found.",
} as const;

export const ASTROCONNECT_LEAD_CATEGORIES = [
  "Career",
  "Wealth",
  "Marriage & Relationships",
  "Health",
  "All",
] as const;

/** Pre-select every category configured on the event (multi-select). */
export function defaultAstroConnectLeadCategories(
  categories: string[] | null | undefined
): string[] {
  const fromEvent = (categories ?? []).map((name) => name.trim()).filter(Boolean);
  if (fromEvent.length > 0) return fromEvent;
  return [ASTROCONNECT_LEAD_CATEGORIES[0]];
}

export const ASTROCONNECT_LEAD_WHATSAPP = {
  e164: SETTINGS_SUPPORT_WHATSAPP.e164,
  keyword: "Yes",
  intro: "Please keep me updated when events matching my interests are available.",
  /** Prefer www — bare whatsapp.com/channel often opens a blank WhatsApp Web page. */
  channelUrl: "https://www.whatsapp.com/channel/0029Vb7cSKBInlqIhwnlcz20",
} as const;

export function buildAstroConnectConsentPrefill(details?: {
  name?: string;
  categories?: string[];
}): string {
  const lines = [
    ASTROCONNECT_LEAD_WHATSAPP.keyword,
    "",
    ASTROCONNECT_LEAD_WHATSAPP.intro,
  ];
  const name = details?.name?.trim();
  if (name) lines.push(`Name: ${name}`);
  const cats = (details?.categories ?? []).map((c) => c.trim()).filter(Boolean);
  if (cats.length) lines.push(`Interested in: ${cats.join(", ")}`);
  return lines.join("\n");
}

export function buildAstroConnectConsentWhatsAppUrl(
  prefillOrDetails?: string | {
    name?: string;
    categories?: string[];
  }
): string {
  const prefill =
    typeof prefillOrDetails === "string"
      ? prefillOrDetails
      : buildAstroConnectConsentPrefill(prefillOrDetails);
  return `https://wa.me/${ASTROCONNECT_LEAD_WHATSAPP.e164}?text=${encodeURIComponent(prefill)}`;
}

/** Lead form chrome — reuses AstroConnect checkout / list tokens. */
export const ASTROCONNECT_LEAD_UI = {
  page: MARATHON_PAGE.page,
  pageInner: MARATHON_PAGE.pageInner,
  /** Form column only — header stays full-bleed like checkout. */
  stage: "mx-auto mt-5 flex w-full min-w-0 max-w-xl flex-col",
  card: MARATHON_FLOW_UI.card,
  title: MARATHON_FLOW_UI.sectionTitle,
  sub: MARATHON_FLOW_UI.sectionHint,
  field: MARATHON_CHECKOUT.fieldStack,
  fieldGap: "mt-4",
  label: MARATHON_CHECKOUT.label,
  input: MARATHON_CHECKOUT.field,
  phoneRow: MARATHON_CHECKOUT.contactRow,
  dial: MARATHON_CHECKOUT.dial,
  phoneInput: `${MARATHON_CHECKOUT.field} ${MARATHON_CHECKOUT.contactInput}`,
  chips: "mt-1 flex flex-wrap gap-2",
  chipOn: `${MARATHON_CHECKOUT.subjectOn} px-3`,
  chipOff: `${MARATHON_CHECKOUT.subjectOff} px-3`,
  submit: MARATHON_FLOW_UI.payBtn,
  error: `${TYPO.chatBubble} mt-2 text-[var(--color-brand-error)]`,
  successTitle: MARATHON_FLOW_UI.sectionTitle,
  successBody: MARATHON_FLOW_UI.sectionHint,
  successMark:
    "mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-brand-primary)_14%,white)]",
  successMarkIcon: "size-7",
  successHead: "text-center",
  followLabel: `${TYPO.chatBubble} mt-5 text-center text-black/45`,
  primaryRow: "mt-3 flex flex-wrap justify-center",
  followRow: "mt-3 flex flex-row flex-wrap items-stretch justify-center gap-2",
  link: `inline-flex min-h-11 min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-brand-primary)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)] px-3 py-2 text-[var(--color-brand-primary)] sm:flex-none sm:px-4 ${TYPO.chatBubble}`,
  linkIcon: "size-5 shrink-0",
  primaryLink: `inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-full !bg-[var(--color-brand-primary)] px-5 py-2 !text-white ${TYPO.chatBubble}`,
} as const;
