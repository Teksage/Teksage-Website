import { DASHBOARD_ASSETS } from "@/lib/constants/assets";

const flutterSvg = (file: string) => `/flutter-assets/svg/${file}` as const;

/** Flutter SharedPreferences keys — `chatField.dart`. */
export const CHAT_PREFERENCE_KEYS = {
  style: "chat_style",
  avatar: "chat_avatar",
} as const;

export type ChatStyleFormat = "long" | "short";

export const CHAT_PREFERENCES = {
  styleOnboardingTitle: "Choose how AI replies",
  avatarOnboardingTitle: "Choose an avatar for AI",
  avatarSheetChooseLabel: "Choose your avatar",
  styleLongLabel: "Explanatory",
  styleShortLabel: "Concise",
  styleLongHint:
    "In-depth, structured replies with step-by-step clarity — perfect for learning or detailed insights.",
  styleShortHint:
    "Quick, direct replies without extra details — ideal for instant answers.",
  continueCta: "Continue",
  onboardingAppTitle: "AI Chat",
} as const;

export const CHAT_STYLE_OPTIONS = [
  {
    format: "short" as const,
    label: CHAT_PREFERENCES.styleShortLabel,
    hint: CHAT_PREFERENCES.styleShortHint,
    icon: flutterSvg("chatConcise.svg"),
  },
  {
    format: "long" as const,
    label: CHAT_PREFERENCES.styleLongLabel,
    hint: CHAT_PREFERENCES.styleLongHint,
    icon: flutterSvg("chatExplain.svg"),
  },
] as const;

/** Flutter `chatAvatarModel.dart` + `AvatarBottomSheet`. */
export const CHAT_AVATAR_OPTIONS = [
  {
    storageTitle: "the seeker",
    title: "The Seeker",
    description:
      "Ideal for those who want in-depth astrological analysis and clear reasoning",
    image: flutterSvg("chatSeeker.svg"),
    sheetClass: "chat-avatar-sheet-seeker",
  },
  {
    storageTitle: "the luminary",
    title: "The Luminary",
    description: "Ideal for those who seek joyful and engaging astrology guidance",
    image: flutterSvg("chatLuminary.svg"),
    sheetClass: "chat-avatar-sheet-luminary",
  },
  {
    storageTitle: "the guardian",
    title: "The Guardian",
    description:
      "Ideal for those looking for reassurance and personal connection in predictions",
    image: flutterSvg("chatGuardian.svg"),
    sheetClass: "chat-avatar-sheet-guardian",
  },
  {
    storageTitle: "the pathfinder",
    title: "The Pathfinder",
    description:
      "Ideal for those seeking career growth, success strategies, or clear-cut solutions",
    image: flutterSvg("chatPathFinder.svg"),
    sheetClass: "chat-avatar-sheet-pathfinder",
  },
] as const;

export const CHAT_PREFERENCE_ASSETS = {
  styleExplain: flutterSvg("chatExplain.svg"),
  styleConcise: flutterSvg("chatConcise.svg"),
  selectCheck: flutterSvg("selectCheckBox.svg"),
  sheetDecoration: flutterSvg("chatDecoration.svg"),
  onboardingBack: flutterSvg("backButton.svg"),
  defaultStyleIcon: DASHBOARD_ASSETS.chatStyleIcon,
  defaultAvatarIcon: DASHBOARD_ASSETS.chatAvatarIcon,
} as const;
