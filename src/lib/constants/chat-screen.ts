import { TYPO } from "./typography";

/** AI chat screen — Flutter `chat.dart` + `PlatformTextConfig`. */

export const CHAT_SCREEN = {
  title: "AI Voice Astro Chat",
  subtitleTag: "Jyotish voice guide for all your needs",
  introPrompt:
    "Jyotish voice guide for all your needs. Start your conversation today",
  emptyInput: "Kindly enter your question.",
  subscribeExpired: "Your subscription has expired. Subscribe to continue.",
  subscribeLimit: "You've reached your message limit. Subscribe to continue.",
  responseTimeout:
    "Response is taking longer than expected. Please check your network.",
  retryLabel: "Retry",
  noResponseLabel: "No response.",
  relatedTitle: "Related questions",
  composerPlaceholder: "Tap the mic",
  composerPlaceholderDesktop: "Ask your astrology question or tap Speak",
  speakLabel: "Speak",
  sendAria: "Send message",
  backAria: "Go back",
  plansCta: "Plans",
  sendLabel: "Send",
  bootError: "Could not start chat. Please try again.",
  wsConnectError: "Could not connect to chat. Check your network and try again.",
  wsEnvMisconfigured:
    "Chat could not connect to the server. Please try again in a few minutes.",
  wsProfileIncomplete:
    "Complete your birth details in Profile to use AI chat.",
  connecting: "Connecting…",
  downloadChat: "Download Chat",
  sendToMail: "Send to Mail",
  chatDownloadSuccess: "Chat downloaded successfully",
  mailSentSuccess: "Mail sent successfully",
  chatExportEmpty:
    "Your astrological insights haven't begun. Start a chat to unlock the stars!",
  chatExportFailed: "Could not complete this action. Please try again.",
  chatMenuAria: "Chat actions",
  historyAria: "Previous chats",
  consultBannerTitle: "Consult Astrologer",
  styleLabel: "Explanatory",
  avatarLabel: "The Seeker",
} as const;

/** Chat page layout — Flutter `chatAppBar.dart` + `chat.dart`. */
export const CHAT_LAYOUT = {
  pageRoot:
    "relative flex min-h-dvh w-full flex-col bg-[var(--color-chat-shell)] lg:h-full lg:min-h-0 lg:max-w-none lg:overflow-hidden",
  onboardingRootEmbedded:
    "chat-conversation-surface relative flex h-full min-h-0 w-full flex-col overflow-hidden",
  onboardingRootStandalone: "chat-conversation-surface fixed inset-0 z-50 flex flex-col",
  onboardingGlow:
    "pointer-events-none absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--color-chat-conversation-glow)] opacity-80 blur-3xl",
  onboardingHeader: "relative z-10 flex items-center px-4 py-3",
  onboardingBack:
    "flex size-10 items-center justify-center rounded-full text-black/50 transition-colors hover:bg-black/5 hover:text-[var(--color-brand-black)]",
  onboardingBackIcon: "size-5",
  onboardingHeaderTitle: `${TYPO.h3Bold} pointer-events-none absolute inset-x-14 text-center text-[var(--color-brand-black)]`,
  onboardingContent:
    "relative z-10 mx-auto flex w-full max-w-lg flex-1 flex-col justify-between px-5 pb-8 pt-2",
  onboardingTitle: `${TYPO.h2} text-center text-[var(--color-brand-black)]`,
  onboardingOptionsStack: "mt-6 flex flex-col gap-3",
  onboardingCta: `h-12 w-full cursor-pointer rounded-full bg-[var(--color-brand-primary)] text-white shadow-[0_6px_16px_rgb(16_177_0_/_0.28)] hover:brightness-105 ${TYPO.bodySemibold}`,
  onboardingCtaOff:
    "cursor-not-allowed bg-black/10 text-black/35 shadow-none hover:bg-black/10 hover:brightness-100",
  styleCard:
    "flex w-full items-start gap-3 rounded-2xl border border-[var(--color-chat-bot-border)] bg-white px-4 py-4 text-left shadow-[0_1px_6px_rgb(0_0_0_/_0.06)] transition",
  styleCardOn:
    "border-[var(--color-brand-primary)] bg-[color-mix(in_srgb,var(--color-home-screen-mint)_55%,white)]",
  styleIcon:
    "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[color-mix(in_srgb,var(--color-brand-primary)_14%,white)]",
  styleIconImg: "size-6",
  styleCopy: "min-w-0 flex-1",
  styleTitle: `${TYPO.chatCardText} text-[var(--color-brand-black)]`,
  styleTitleOn: "text-[var(--color-brand-primary)]",
  styleHint: `${TYPO.chatCardTextBot} mt-1 text-black/55`,
  styleCheck:
    "flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-white",
  avatarWrap: "relative mx-auto w-full max-w-md pt-12",
  avatarHero:
    "rounded-3xl border border-[var(--color-chat-bot-border)] bg-white px-6 pb-6 pt-16 text-center shadow-[0_8px_24px_rgb(16_24_16_/_0.06)]",
  avatarImage:
    "absolute left-1/2 top-0 z-10 size-24 -translate-x-1/2 rounded-full border-4 border-white bg-white shadow-[0_6px_16px_rgb(16_177_0_/_0.22)]",
  avatarTitle: `${TYPO.h3Bold} text-[var(--color-brand-black)]`,
  avatarHint: `${TYPO.chatCardTextBot} mt-2 text-black/55`,
  avatarChoose: `${TYPO.caption} mt-6 text-center uppercase tracking-wide text-black/40`,
  avatarRow: "mt-3 flex justify-center gap-3",
  avatarThumb:
    "flex size-14 items-center justify-center rounded-2xl border-2 border-black/10 bg-white p-0.5 transition",
  avatarThumbOn:
    "border-[var(--color-brand-primary)] shadow-[0_4px_12px_rgb(16_177_0_/_0.22)]",
  avatarThumbImg: "size-full rounded-[0.8rem] object-cover",
  messageGutter: "relative min-h-full flex-1 px-5",
  messageList:
    "chat-conversation-surface relative z-10 flex min-h-full flex-col gap-4 py-4",
  messageListGlow:
    "pointer-events-none absolute left-[30%] top-8 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--color-chat-conversation-glow)] opacity-90 blur-3xl",
  conversationScroll:
    "chat-conversation-surface flex min-h-0 flex-1 flex-col overflow-y-auto",
  landingScroll: "flex min-h-0 flex-1 flex-col overflow-y-auto",
  messageColumn:
    "flex max-w-[min(92%,34rem)] flex-col gap-2 lg:max-w-[min(90%,42rem)]",
  /** Card chrome — same idea as energy-score pills: solid fill + border + soft shadow. */
  userMessageCard: `${TYPO.chatCardTextUser} rounded-2xl bg-[var(--color-chat-user-bubble)] px-4 py-3 shadow-[0_2px_10px_rgb(16_177_0_/_0.16)]`,
  botMessageCard: `${TYPO.chatCardTextBot} rounded-2xl border border-[var(--color-chat-bot-border)] bg-[var(--color-chat-bot-bubble)] px-4 py-3 shadow-[0_1px_6px_rgb(0_0_0_/_0.06)]`,
  botAvatar: "mr-2.5 mt-0.5 size-9 shrink-0 self-start",
  userAvatar:
    "ml-2.5 mt-0.5 flex size-9 shrink-0 items-center justify-center self-start rounded-full border border-black/10 bg-[var(--color-chat-user-avatar-bg)] text-xs font-bold text-[var(--color-chat-user-avatar-text)]",
  askActionBtn:
    "inline-flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-[var(--color-chat-ask-btn-border)] bg-[var(--color-chat-ask-btn-bg)] px-4 py-1.5 text-center text-xs font-bold leading-tight text-[var(--color-chat-ask-btn-text)] transition-colors hover:bg-[var(--color-brand-primary)]/8",
  consultActionBtn:
    "inline-flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-[var(--color-chat-consult-btn-border)] bg-[var(--color-chat-consult-btn-bg)] px-4 py-1.5 text-center text-xs font-bold leading-tight text-[var(--color-chat-consult-btn-text)] transition-colors hover:bg-[var(--color-chat-consult-btn-border)]/8",
  headerBlock: "bg-[var(--color-brand-primary)] text-white",
  embedHeaderBlock: "px-4 py-3 text-center",
  embedHeaderTitle: `${TYPO.h3Bold} text-white`,
  appBarTitle: `${TYPO.h3Bold} flex-1 text-center text-white`,
  composerShell: "bg-[var(--color-chat-composer-bg)]",
  /** Standalone `/chat` — hidden on desktop (`lg+`); home embed omits the strip entirely. */
  consultStripRoot: "relative z-10 shrink-0 lg:hidden",
} as const;

/** Free-tier cap — Flutter `freeUserLimit`. */
export const CHAT_FREE_MESSAGE_LIMIT = 5;

/** Default outbound payload — Flutter chat preferences. */
export const CHAT_DEFAULTS = {
  format: "long",
  avatar: "Seeker",
  messageMode: "text",
  language: "english",
} as const;

export const CHAT_RESPONSE_TIMEOUT_MS = 30_000;
export const CHAT_WS_CONNECT_TIMEOUT_MS = 15_000;

export const CHAT_WS_END_MARKER = "[END]";

/** Backend `chat.py` closes with these when customer horoscope is missing (no reconnect). */
export const CHAT_WS_FATAL_PROFILE_CLOSE_CODES = [4000, 4001] as const;
