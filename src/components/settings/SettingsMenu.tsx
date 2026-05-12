"use client";

import { useRouter } from "next/navigation";
import { SETTINGS_ASSETS } from "@/lib/constants/assets";
import {
  SETTINGS_PRIMARY_LINKS,
  SETTINGS_SCREEN,
} from "@/lib/constants/settings-screen";
import { useAuth } from "@/hooks/useAuth";
import { SettingsRow } from "@/components/settings/SettingsRow";

function loginRedirectHref(target: string): string {
  return `/login?redirect=${encodeURIComponent(target)}`;
}

export function SettingsMenu() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  function resolveHref(href: string, gateLogin?: boolean): string {
    if (gateLogin && !isAuthenticated) return loginRedirectHref(href);
    return href;
  }

  function handleLogout() {
    if (!window.confirm(SETTINGS_SCREEN.logoutConfirm)) return;
    void logout();
  }

  function handleRateUs() {
    if (!isAuthenticated) {
      router.push(loginRedirectHref("/settings"));
      return;
    }
    window.alert(SETTINGS_SCREEN.rateThanks);
  }

  return (
    <div className="flex flex-col gap-3">
      {SETTINGS_PRIMARY_LINKS.map((item) => (
        <SettingsRow
          key={item.id}
          label={item.label}
          iconSrc={SETTINGS_ASSETS[item.iconKey]}
          href={resolveHref(item.href, item.gateLogin)}
        />
      ))}

      <SettingsRow
        label="Rate us"
        iconSrc={SETTINGS_ASSETS.rating}
        onClick={handleRateUs}
      />

      {isAuthenticated && (
        <>
          <div
            className="my-2 h-px bg-[color-mix(in_srgb,var(--color-brand-black)_8%,transparent)]"
            aria-hidden
          />
          <SettingsRow
            label="Delete Account"
            iconSrc={SETTINGS_ASSETS.deleteAccount}
            href="/settings/delete-account"
          />
          <SettingsRow
            label="Logout"
            iconSrc={SETTINGS_ASSETS.logout}
            variant="logout"
            onClick={handleLogout}
          />
        </>
      )}
    </div>
  );
}
