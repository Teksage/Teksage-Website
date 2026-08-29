/**
 * Settings screen copy + nav — mirrors Flutter `settings_page.dart` section order.
 */

import type { SettingsAssetKey } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";

export {
  SETTINGS_LAYOUT,
  SETTINGS_SECTION_SUBTITLE,
  SETTINGS_SHELL_GRADIENT_CLASS,
} from "@/lib/constants/settings-layout";

export const SETTINGS_SCREEN = {
  title: "Settings",
  subtitle: "Manage your account, preferences, and support options.",
  sectionAccount: "Account",
  sectionPreferences: "Preferences",
  sectionLegal: "Legal & help",
  sectionDanger: "Account actions",
  logoutConfirm: "Are you sure you want to log out?",
  rateThanks: "Thanks for your support!",
  rateUsLabel: "Rate us",
  rateDialogLead:
    "Your stars guide you, and your feedback guides us ⭐\nRate Teksage today!",
  rateNowLabel: "Rate Now",
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.venzo.astroPrompt",
  deleteAccountLabel: "Delete Account",
  logoutLabel: "Logout",
} as const;

export type SettingsPrimaryLink = {
  id: string;
  label: string;
  href: string;
  iconKey: SettingsAssetKey;
  /** When true, unauthenticated users are sent to login with redirect back. */
  gateLogin?: boolean;
};

/** Same order as Flutter `SettingsPage` build method (Android-style list). */
export const SETTINGS_PRIMARY_LINKS: readonly SettingsPrimaryLink[] = [
  {
    id: "profile",
    label: "Profile",
    href: ROUTES.profile,
    iconKey: "profile",
    gateLogin: true,
  },
  {
    id: "push-notifications",
    label: "Push Notifications",
    href: `${ROUTES.settings}/push-notifications`,
    iconKey: "pushNotifications",
    gateLogin: true,
  },
  {
    id: "whatsapp-updates",
    label: "WhatsApp Updates",
    href: ROUTES.whatsappUpdates,
    iconKey: "whatsapp",
    gateLogin: true,
  },
  // P4 — Change email / mobile (hidden for now; re-enable when ready)
  // {
  //   id: "change-contact",
  //   label: "Change Email / Mobile",
  //   href: ROUTES.settingsChangeContact,
  //   iconKey: "profile",
  //   gateLogin: true,
  // },
  {
    id: "language",
    label: "Language",
    href: `${ROUTES.settings}/language`,
    iconKey: "language",
  },
  {
    id: "subscriptions",
    label: "Subscriptions",
    href: ROUTES.settingsSubscriptions,
    iconKey: "subscription",
    gateLogin: true,
  },
  {
    id: "terms",
    label: "Terms & Conditions",
    href: `${ROUTES.settings}/terms`,
    iconKey: "terms",
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    href: `${ROUTES.settings}/privacy`,
    iconKey: "privacy",
  },
  {
    id: "support",
    label: "Support",
    href: `${ROUTES.settings}/support`,
    iconKey: "support",
    gateLogin: true,
  },
  {
    id: "faq",
    label: "FAQs",
    href: `${ROUTES.settings}/faq`,
    iconKey: "faq",
  },
  {
    id: "getting-started",
    label: "Getting Started",
    href: ROUTES.gettingStarted,
    iconKey: "gettingStarted",
  },
] as const;

/** Desktop settings — grouped cards (2-column grid). */
export const SETTINGS_MENU_SECTIONS = [
  {
    id: "account",
    titleKey: "sectionAccount" as const,
    linkIds: [
      "profile",
      "push-notifications",
      "whatsapp-updates",
      "subscriptions",
    ] as const,
  },
  {
    id: "preferences",
    titleKey: "sectionPreferences" as const,
    linkIds: ["language", "getting-started"] as const,
    includeRateUs: true,
  },
  {
    id: "legal",
    titleKey: "sectionLegal" as const,
    linkIds: ["terms", "privacy", "support", "faq"] as const,
  },
] as const;

/** Sub-pages under `settings/[section]`. */
export const SETTINGS_SECTION_SLUGS = [
  "push-notifications",
  "language",
  "subscriptions",
  "terms",
  "privacy",
  "faq",
  "support",
  "delete-account",
] as const;

export type SettingsSectionSlug = (typeof SETTINGS_SECTION_SLUGS)[number];

/** Titles for `settings/[section]` — aligned with Flutter screen names. */
export const SETTINGS_SECTION_TITLE: Record<SettingsSectionSlug, string> = {
  "push-notifications": "Push Notifications",
  language: "Language",
  subscriptions: "Subscriptions",
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
  faq: "FAQs",
  support: "Support",
  "delete-account": "Delete Account",
};
