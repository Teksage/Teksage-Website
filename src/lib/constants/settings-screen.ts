/**
 * Settings screen copy + nav — mirrors Flutter `settings_page.dart` section order.
 */

import type { SettingsAssetKey } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";
export const SETTINGS_SCREEN = {
  title: "Settings",
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
    iconKey: "faq",
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

/** `@layer utilities` in `globals.css` — mint shell gradient (opaque stops). */
export const SETTINGS_SHELL_GRADIENT_CLASS = "settings-shell-gradient";

export const SETTINGS_LAYOUT = {
  pageRoot: "relative min-h-dvh lg:bg-[var(--color-brand-bg)]",
  /** Solid bar on desktop — `blend` alone disappears on the mint gradient. */
  headerChrome:
    "lg:border-b lg:border-[var(--color-home-dashboard-rule)] lg:bg-white lg:shadow-[0_1px_3px_rgb(0_0_0_/0.06)] lg:backdrop-blur-none",
  desktopPanel:
    "relative z-10 mx-auto w-full max-w-lg pb-4 pt-6 lg:my-5 lg:max-w-2xl lg:rounded-2xl lg:border lg:border-[var(--color-home-dashboard-rule)] lg:bg-white lg:px-6 lg:py-6 lg:shadow-[0_4px_24px_rgb(0_0_0_/0.07)]",
  menuContent: "flex flex-col gap-3",
} as const;
