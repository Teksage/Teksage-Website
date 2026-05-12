/**
 * Settings screen copy + nav — mirrors Flutter `settings_page.dart` section order.
 */

import type { SettingsAssetKey } from "@/lib/constants/assets";

export const SETTINGS_SCREEN = {
  title: "Settings",
  placeholderLead: "Coming soon",
  placeholderHint:
    "This screen will match the Teksage mobile app. Connect APIs here when ready.",
  logoutConfirm: "Are you sure you want to log out?",
  rateThanks: "Thanks for your support!",
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
    href: "/profile",
    iconKey: "profile",
    gateLogin: true,
  },
  {
    id: "push-notifications",
    label: "Push Notifications",
    href: "/settings/push-notifications",
    iconKey: "pushNotifications",
    gateLogin: true,
  },
  {
    id: "language",
    label: "Language",
    href: "/settings/language",
    iconKey: "language",
  },
  {
    id: "subscriptions",
    label: "Subscriptions",
    href: "/settings/subscriptions",
    iconKey: "subscription",
    gateLogin: true,
  },
  {
    id: "terms",
    label: "Terms & Conditions",
    href: "/settings/terms",
    iconKey: "terms",
  },
  {
    id: "privacy",
    label: "Privacy Policy",
    href: "/settings/privacy",
    iconKey: "privacy",
  },
  {
    id: "support",
    label: "Support",
    href: "/settings/support",
    iconKey: "support",
    gateLogin: true,
  },
  {
    id: "faq",
    label: "FAQs",
    href: "/settings/faq",
    iconKey: "faq",
  },
] as const;

/** Sub-pages implemented as placeholders (`settings/[section]`). */
export const SETTINGS_PLACEHOLDER_SLUGS = [
  "push-notifications",
  "language",
  "subscriptions",
  "terms",
  "privacy",
  "faq",
  "support",
  "delete-account",
] as const;

export type SettingsPlaceholderSlug =
  (typeof SETTINGS_PLACEHOLDER_SLUGS)[number];

/** Titles for `settings/[section]` placeholders — aligned with Flutter screen names. */
export const SETTINGS_SECTION_TITLE: Record<SettingsPlaceholderSlug, string> = {
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
