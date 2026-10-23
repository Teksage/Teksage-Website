import { TYPO } from "@/lib/constants/typography";

/** Shared “answers ready” callout — meetings list + booking details. */
export const CONSULTATION_ANSWERS_READY = {
  title: "Answers ready",
  body: "Astrologer submitted answers for your queries",
} as const;

/** One-time popup after consultation queries are answered (confirmed→completed). */
export const CONSULTATION_ANSWERS_READY_POPUP = {
  title: "Your answers are ready",
  body: "Your astrologer has submitted answers to your consultation questions.",
  hint: "Open Booking Details to read them — you can also leave a review there.",
  viewCta: "View answers",
  laterCta: "Not now",
} as const;

export const CONSULTATION_ANSWERS_READY_UI = {
  root: "mt-3 flex w-full items-start gap-3 rounded-2xl border border-[var(--color-chat-bot-border)] bg-white/80 px-3.5 py-3",
  rootFlush:
    "mb-4 flex w-full items-start gap-3 rounded-2xl border border-[var(--color-chat-bot-border)] bg-white/80 px-3.5 py-3",
  iconWrap:
    "flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-white",
  icon: `${TYPO.sizeSm} ${TYPO.weightBold} leading-none`,
  copy: "min-w-0 flex-1",
  title: `${TYPO.chatCardTextBot} ${TYPO.weightExtrabold}`,
  body: `${TYPO.chatBubble} mt-0.5 text-black/55`,
  popupPanel:
    "relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-7 lg:max-w-lg lg:rounded-3xl lg:p-8",
  popupIcon:
    "mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/12 text-xl font-bold text-[var(--color-brand-primary)] lg:mb-5 lg:size-14 lg:text-2xl",
  popupTitle: `${TYPO.sizeLg} ${TYPO.weightSemibold} text-center text-[var(--color-brand-black)] lg:text-xl`,
  popupBody: "mt-2 text-center text-sm leading-relaxed text-black/65 lg:text-base",
  popupHint: "mt-1 text-center text-xs leading-relaxed text-black/45 lg:text-sm",
  popupAstro:
    "mt-5 rounded-xl border-l-4 border-[var(--color-brand-primary)] bg-neutral-50 px-4 py-3 text-center text-sm font-semibold leading-snug text-[var(--color-brand-black)] lg:px-5 lg:py-4 lg:text-base",
  popupActions: "mt-6 grid grid-cols-2 gap-2.5",
  popupPrimaryBtn:
    "inline-flex h-11 items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-4 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 lg:h-12 lg:text-base",
  popupSecondaryBtn:
    "inline-flex h-11 items-center justify-center rounded-full border border-black/12 bg-white px-4 text-sm font-medium text-black/60 transition-colors hover:bg-neutral-50 lg:h-12 lg:text-base",
} as const;

/** Review form on consultation summary (Booking Details). */
export const CONSULTATION_REVIEW_SCREEN = {
  title: "Rate your consultation",
  subtitle: "Reviews appear after admin approval.",
  editSubtitle: "You can update this until an admin approves it.",
  feedbackLabel: "Your review",
  feedbackPlaceholder: "Write a short review (optional)",
  submitCta: "Submit review",
  updateCta: "Save changes",
  editCta: "Edit",
  deleteCta: "Delete",
  cancelCta: "Cancel",
  submitting: "Submitting…",
  pendingStatus: "Pending",
  pendingHint: "Thanks! Your review will show on the astrologer's profile once approved.",
  pendingEditHint: "Pending — you can still edit until approved.",
  approvedStatus: "Published",
  rejectedStatus: "Not published",
  rejectedEditHint: "Edit and resubmit for approval.",
  alreadyRated: "You already rated this consultation.",
  ratingRequired: "Please select a star rating.",
  submitError: "Could not submit your review. Please try again.",
  submitSuccess: "Review submitted for approval.",
  deleteConfirm: "Delete your review?",
  deleteError: "Could not delete your review. Please try again.",
} as const;

/** Compact review card — matches booking-details chat cards. */
export const CONSULTATION_REVIEW_UI = {
  card: `${TYPO.chatCardTextBot} w-full overflow-hidden rounded-2xl border border-[var(--color-chat-bot-border)] bg-[var(--color-chat-bot-bubble)] shadow-[0_1px_6px_rgb(0_0_0_/_0.06)]`,
  header:
    "flex items-center justify-between gap-3 border-b border-black/[0.05] bg-[var(--color-home-screen-mint)]/35 px-4 py-2.5 sm:px-5",
  title: `${TYPO.h3Bold} min-w-0 truncate text-[var(--color-brand-black)]`,
  chip: `${TYPO.sizeXs} ${TYPO.weightBold} shrink-0 rounded-full px-2.5 py-0.5`,
  chipPending:
    "bg-[color-mix(in_srgb,var(--color-chat-star)_22%,white)] text-[var(--color-chat-star)]",
  chipRejected: "bg-black/[0.06] text-black/55",
  chipApproved:
    "bg-[color-mix(in_srgb,var(--color-brand-primary)_16%,white)] text-[var(--color-brand-primary)]",
  body: "flex flex-col gap-2.5 px-4 py-3 sm:px-5",
  hint: `${TYPO.sizeXs} text-black/45`,
  starsRow: "flex items-center gap-0.5",
  starBtn:
    "flex size-8 items-center justify-center text-xl leading-none text-[var(--color-chat-star)] transition-transform active:scale-95 hover:scale-105",
  starOff: "opacity-20",
  textarea:
    `${TYPO.chatBubble} min-h-[2.75rem] max-h-24 w-full resize-none rounded-xl border border-black/[0.08] bg-white/80 px-3 py-2 text-[var(--color-brand-black)] outline-none placeholder:text-black/35 focus:border-[var(--color-brand-primary)]`,
  footer: "flex items-center justify-end gap-2",
  footerSplit: "flex items-center justify-between gap-3",
  error: `${TYPO.sizeXs} text-[var(--color-brand-error)]`,
  submitBtn:
    "inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-4 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:opacity-50",
  secondaryBtn:
    "inline-flex h-9 shrink-0 items-center justify-center rounded-full border border-black/[0.12] bg-white px-3.5 text-xs font-semibold text-black/70 transition-colors hover:bg-black/[0.03] disabled:opacity-50",
  dangerBtn:
    "inline-flex h-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-brand-error)]/35 bg-white px-3.5 text-xs font-semibold text-[var(--color-brand-error)] transition-colors hover:bg-[var(--color-brand-error)]/5 disabled:opacity-50",
  approvedBody: "flex flex-col gap-1.5 px-4 py-3 sm:px-5",
  approvedStars: "flex gap-0.5 text-base leading-none text-[var(--color-chat-star)]",
  approvedText: `${TYPO.chatBubble} text-black/65`,
  viewActions: "mt-1 flex items-center justify-end gap-2",
} as const;

