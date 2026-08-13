import { DAILY_PREDICTION_ASSETS, DASHBOARD_ASSETS } from "@/lib/constants/assets";

/** Chat UI assets — re-export focused paths for chat feature. */
export const CHAT_ASSETS = {
  background: DASHBOARD_ASSETS.chatBackground,
  botLogo: DASHBOARD_ASSETS.chatBotLogo,
  appBarBack: DAILY_PREDICTION_ASSETS.appBarBack,
  send: DASHBOARD_ASSETS.chatSend,
  mic: DASHBOARD_ASSETS.chatMic,
  landingMic: "/flutter-assets/svg/chat-mic.svg",
  themeSparkle: "/flutter-assets/svg/theme-sparkle.svg",
  history: DASHBOARD_ASSETS.headerClock,
  styleIcon: DASHBOARD_ASSETS.chatStyleIcon,
  avatarIcon: DASHBOARD_ASSETS.chatAvatarIcon,
  chevron: DASHBOARD_ASSETS.downArrow,
  download: "/flutter-assets/svg/download.svg",
  downloadMail: "/flutter-assets/svg/downloadMail.svg",
  deleteRecording: "/flutter-assets/svg/deleteChatIcon.svg",
  stopRecording: "/flutter-assets/svg/stopChatRecord.svg",
} as const;
