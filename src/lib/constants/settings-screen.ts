/**
 * Settings screen copy + nav — mirrors Flutter `settings_page.dart` section order.
 */

import type { SettingsAssetKey } from "@/lib/constants/assets";
import { ROUTES } from "@/lib/constants/routes";
export const SETTINGS_SCREEN = {
  title: "Settings",
  placeholderLead: "Coming soon",
  placeholderHint:
    "This screen will match the Teksage mobile app. Connect APIs here when ready.",
  logoutConfirm: "Are you sure you want to log out?",
  rateThanks: "Thanks for your support!",
  rateUsLabel: "Rate us",
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

export const SETTINGS_LAYOUT = {
  menuContent: "relative z-10 mx-auto w-full max-w-lg px-5 pb-4 pt-6",
  sectionContent: "relative z-10 mx-auto w-full max-w-lg px-5 pb-4 pt-8",
  placeholderCard:
    "rounded-2xl border border-black/[0.06] bg-white/90 px-5 py-8 shadow-sm",
  placeholderTitle: "text-lg font-semibold text-neutral-900",
  placeholderHint: "mt-3 text-sm leading-relaxed text-neutral-600",
} as const;
