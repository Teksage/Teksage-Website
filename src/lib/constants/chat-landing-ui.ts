import { TYPO } from "@/lib/constants/typography";

/** Chat landing page layout — desktop home embed (matches design mockup). */
export const CHAT_LANDING_UI = {
  sectionTitle: "TRY ASKING",
  themeLabel: "Theme",
  currentDasaLabel: "Current Dasa",
  energyScoreTitle: "Today's Energy Score",
  daysRemaining: "{days} days remaining",
  speakCta: "Speak",
  historyTitle: "Previous chats",
  historyAria: "Open previous chat",
  returnToLandingAria: "Back to chat home",
  subtitleLanguages: "All Languages · Spoken replies",
  profileMenuProfile: "Profile",
  profileMenuWhatsApp: "WhatsApp Updates",
  profileMenuSubscriptions: "Subscriptions",
  profileMenuSupport: "Support",
  profileMenuLanguage: "Language",
  profileMenuAllSettings: "View all settings",
  profileMenuHeaderHint: "Manage your account",
  gettingStarted: "Getting Started",
  referralRewards: "Referral rewards",
  voiceGuideReady: "VOICE GUIDE READY",
  tapToSpeakPrefix: "Tap to speak with your",
  tapToSpeakHighlight: "Jyotish guide",
  speakAria: "Tap to speak with your Jyotish guide",
  metaSeparator: " - ",
} as const;

export const CHAT_LANDING_LAYOUT = {
  landingRoot:
    "chat-landing-surface mx-auto flex w-full max-w-4xl flex-col items-center px-4 pb-4 pt-3",
  /** Home embed — denser so promo banner + landing fit without scroll. */
  landingRootCompact:
    "chat-landing-surface mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col items-center justify-center gap-1 overflow-hidden px-3 pb-1 pt-0",
  heroSection: "relative flex w-full flex-col items-center pb-2 pt-1",
  heroSectionCompact: "relative flex w-full shrink-0 flex-col items-center pb-0 pt-0",
  heroGlow:
    "pointer-events-none absolute left-1/2 top-12 h-36 w-40 -translate-x-1/2 rounded-full bg-[var(--color-chat-landing-glow)] opacity-45 blur-3xl",
  heroGlowCompact:
    "pointer-events-none absolute left-1/2 top-6 h-20 w-24 -translate-x-1/2 rounded-full bg-[var(--color-chat-landing-glow)] opacity-35 blur-2xl",
  voiceReadyBadge:
    "relative z-[1] mb-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-chat-voice-ready-bg)] px-4 py-1.5",
  voiceReadyBadgeCompact: "hidden",
  voiceReadyText: `${TYPO.sizeXs} ${TYPO.weightBold} tracking-[0.04em] text-[var(--color-chat-voice-ready-text)]`,
  voiceReadyChevron:
    "size-0 border-x-[5px] border-b-[6px] border-x-transparent border-b-[var(--color-chat-voice-ready-text)]",
  micButton:
    "relative z-[1] flex size-[11.5rem] cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
  micButtonCompact:
    "relative z-[1] flex size-[6.5rem] cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-0 transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
  micImage: "pointer-events-none size-full select-none",
  heroHeadline: `${TYPO.sizeMd} ${TYPO.weightBold} relative z-[1] mt-1 text-center text-[var(--color-brand-black)] sm:text-lg`,
  heroHeadlineCompact: `${TYPO.sizeSm} ${TYPO.weightBold} relative z-[1] mt-0 text-center text-[var(--color-brand-black)]`,
  heroHeadlineAccent: `${TYPO.weightExtrabold} text-[var(--color-chat-landing-accent)]`,
  metaRow: "relative z-[1] flex flex-wrap items-center justify-center gap-2.5 py-3",
  metaRowCompact: "relative z-[1] flex shrink-0 flex-wrap items-center justify-center gap-1.5 py-0.5",
  metaPill:
    "inline-flex max-w-full items-center gap-1 rounded-full border border-[var(--color-chat-landing-pill-border)] bg-[var(--color-chat-landing-bg)] px-5 py-2.5 shadow-[0_1px_4px_rgb(0_0_0_/_0.06)]",
  metaPillCompact:
    "inline-flex max-w-full items-center gap-1 rounded-full border border-[var(--color-chat-landing-pill-border)] bg-[var(--color-chat-landing-bg)] px-3 py-1 shadow-[0_1px_3px_rgb(0_0_0_/_0.05)]",
  metaLabel: `${TYPO.sizeSm} ${TYPO.weightSemibold} shrink-0 text-[var(--color-chat-landing-label)]`,
  metaLabelCompact: `${TYPO.sizeXs} ${TYPO.weightSemibold} shrink-0 text-[var(--color-chat-landing-label)]`,
  metaValue: `${TYPO.sizeSm} ${TYPO.weightBold} text-[var(--color-brand-black)]`,
  metaValueCompact: `${TYPO.sizeXs} ${TYPO.weightBold} text-[var(--color-brand-black)]`,
  metaThemeValue: `${TYPO.sizeSm} ${TYPO.weightBold} inline-flex items-center gap-1.5 text-[var(--color-brand-black)]`,
  metaThemeValueCompact: `${TYPO.sizeXs} ${TYPO.weightBold} inline-flex items-center gap-1 text-[var(--color-brand-black)]`,
  metaThemeIcon: "size-3.5 shrink-0",
  energySection:
    "chat-energy-section relative z-[1] w-full px-1 pb-3 pt-1",
  energySectionCompact:
    "chat-energy-section relative z-[1] w-full shrink-0 px-0 pb-0 pt-0",
  energyBar:
    "scrollbar-hidden mx-auto w-full max-w-5xl overflow-x-auto rounded-full border border-[var(--color-chat-landing-pill-border)] bg-[var(--color-chat-landing-bg)] shadow-[0_1px_4px_rgb(0_0_0_/_0.06)]",
  energyContent:
    "mx-auto flex w-max min-w-full flex-nowrap items-center justify-center gap-x-1.5 whitespace-nowrap px-5 py-3",
  energyContentCompact:
    "mx-auto flex w-max min-w-full flex-nowrap items-center justify-center gap-x-1 whitespace-nowrap px-3 py-1.5",
  energyTitle: `text-energy-score ${TYPO.weightSemibold} shrink-0 text-[var(--color-chat-landing-label)]`,
  energyItem: "inline-flex shrink-0 items-center gap-1",
  energyCategory: `text-energy-score ${TYPO.weightBold} shrink-0 text-[var(--color-brand-black)]`,
  energySeparator:
    "text-energy-score shrink-0 text-[var(--color-chat-landing-label)]",
  tryAskingSection: "relative z-[1] w-full pt-2",
  tryAskingTitle: `${TYPO.sizeXs} mb-3 text-center ${TYPO.weightSemibold} uppercase tracking-[0.12em] text-black/40`,
  tabRow: "mb-4 flex flex-wrap items-center justify-center gap-3",
  tabIdle: `${TYPO.sizeBodySm} ${TYPO.weightMedium} rounded-full px-3 py-1 text-black/55 transition-colors hover:text-[var(--color-brand-black)]`,
  tabActive: `${TYPO.sizeBodySm} ${TYPO.weightBold} rounded-full bg-[var(--color-brand-primary)] px-4 py-1.5 text-white`,
  questionGrid: "grid grid-cols-2 gap-3",
  questionCard:
    "min-h-[5.5rem] rounded-2xl border border-[var(--color-chat-landing-card-border)] bg-[var(--color-chat-landing-bg)] px-4 py-4 text-left text-body-sm font-medium leading-snug text-[var(--color-brand-black)] transition-colors hover:border-[var(--color-brand-primary)]/35 hover:bg-[var(--color-home-screen-mint)]/30",
  speakButton:
    "relative z-[1] flex h-12 shrink-0 items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 text-body-sm font-bold text-white disabled:opacity-50",
  headerRoot:
    "relative z-30 shrink-0 border-b border-[var(--color-chat-landing-header-border)] bg-[var(--color-chat-landing-bg)] px-4 py-3",
  headerRootCompact:
    "relative z-30 shrink-0 border-b border-[var(--color-chat-landing-header-border)] bg-[var(--color-chat-landing-bg)] px-3 py-1.5",
  headerRow: "flex items-center gap-3",
  headerIconWrap: "relative shrink-0",
  headerIcon:
    "flex size-10 items-center justify-center rounded-full bg-[var(--color-home-screen-mint)]",
  headerOnlineDot:
    "absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-white bg-[var(--color-brand-primary)]",
  headerTitle: `${TYPO.h3Bold} text-[var(--color-brand-black)]`,
  headerSubtitle: `${TYPO.sizeSm} text-black/55`,
  headerActions: "ml-auto flex items-center gap-2",
  headerActionBtn:
    "flex size-9 items-center justify-center rounded-full border border-neutral-200 text-[var(--color-brand-black)]/70 hover:bg-black/5",
  headerMenuDot: "block size-1 rounded-full bg-[var(--color-brand-black)]/70",
  embeddedShell:
    "relative flex h-full min-h-0 w-full flex-col bg-[var(--color-chat-landing-bg)]",
  embeddedComposerShell:
    "mt-auto shrink-0 border-t border-[var(--color-chat-landing-composer-border)] bg-[var(--color-chat-landing-bg)] px-3 pb-2 pt-1",
  embeddedComposerRow: "flex items-center gap-2",
  embeddedInputShell:
    "flex min-h-[2.75rem] flex-1 items-center rounded-full border border-black/10 bg-white pl-4 pr-1.5",
  embeddedSendBtn:
    "mb-0.5 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed",
  embeddedSendBtnIdle: "bg-black/15",
  embeddedSendBtnActive: "bg-[var(--color-brand-primary)]",
  tryAskingLabelEmbedded:
    `${TYPO.sizeXs} ${TYPO.weightSemibold} px-1 pb-0.5 text-center uppercase tracking-[0.12em] text-black/40`,
  preferenceChipRow: "relative flex gap-2 overflow-x-auto overflow-y-visible px-1 pb-1 pt-0.5",
  preferenceChip:
    "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-chat-landing-pill-border)] bg-[var(--color-chat-landing-bg)] px-3 py-1.5 text-body-sm font-semibold text-[var(--color-brand-black)] shadow-[0_1px_3px_rgb(0_0_0_/_0.04)]",
  preferenceChipIcon: "size-[1.125rem] shrink-0",
  preferenceChipChevron: "size-3.5 shrink-0 brightness-0 opacity-45",
  preferenceChipLabel: "max-w-[9rem] truncate",
  speakButtonCompact:
    "relative z-[1] flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-[var(--color-brand-primary)] px-4 text-sm font-bold text-white disabled:opacity-50",
} as const;

export const CHAT_LANDING_CATEGORY_LABELS = {
  today: "Today",
  relationship: "Relationship",
  career: "Career",
  wealth: "Wealth",
} as const;

export const CHAT_LANDING_ENERGY_LABELS = {
  career: "Career",
  relationship: "Relationships",
  wealth: "Finance",
  health: "Health",
} as const;

export const CHAT_LANDING_IDLE_MS = 24 * 60 * 60 * 1000;
