"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { SETTINGS_ASSETS } from "@/lib/constants/assets";
import {
  SETTINGS_PRIMARY_LINKS,
  SETTINGS_SCREEN,
} from "@/lib/constants/settings-screen";
import { useAuth } from "@/hooks/useAuth";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import { SettingsRow } from "@/components/settings/SettingsRow";

export function SettingsMenu() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  function resolveHref(href: string, gateLogin?: boolean): string {
    if (gateLogin && !isAuthenticated) return buildLoginRedirectPath(href);
    return href;
  }

  function handleLogout() {
    if (!window.confirm(SETTINGS_SCREEN.logoutConfirm)) return;
    void logout();
  }

  function handleRateUs() {
    if (!isAuthenticated) {
      router.push(buildLoginRedirectPath(ROUTES.settings));
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
        label={SETTINGS_SCREEN.rateUsLabel}
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
            label={SETTINGS_SCREEN.deleteAccountLabel}
            iconSrc={SETTINGS_ASSETS.deleteAccount}
            href={`${ROUTES.settings}/delete-account`}
          />
          <SettingsRow
            label={SETTINGS_SCREEN.logoutLabel}
            iconSrc={SETTINGS_ASSETS.logout}
            variant="logout"
            onClick={handleLogout}
          />
        </>
      )}
    </div>
  );
}
