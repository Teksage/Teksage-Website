"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SettingsRateDialog } from "@/components/settings/SettingsRateDialog";
import { ROUTES } from "@/lib/constants";
import { SETTINGS_ASSETS } from "@/lib/constants/assets";
import {
  SETTINGS_PRIMARY_LINKS,
  SETTINGS_SCREEN,
} from "@/lib/constants/settings-screen";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useLoginPrompt } from "@/contexts/LoginPromptContext";
import { useAuth } from "@/hooks/useAuth";
import { SettingsRow } from "@/components/settings/SettingsRow";

export function SettingsMenu() {
  const SS = useI18nConstants(SETTINGS_SCREEN);
  const { t } = useAppLanguage();
  const router = useRouter();
  const { openLoginPrompt } = useLoginPrompt();
  const { isAuthenticated, logout } = useAuth();
  const [rateOpen, setRateOpen] = useState(false);

  function handleLogout() {
    if (!window.confirm(SS.logoutConfirm)) return;
    void logout();
  }

  function handleRateUs() {
    if (!isAuthenticated) {
      openLoginPrompt({ returnPath: ROUTES.settings, redirectHomeOnClose: false });
      return;
    }
    setRateOpen(true);
  }

  function handleRowPress(href: string, gateLogin?: boolean) {
    if (gateLogin && !isAuthenticated) {
      openLoginPrompt({ returnPath: href, redirectHomeOnClose: false });
      return;
    }
    router.push(href);
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {SETTINGS_PRIMARY_LINKS.map((item) => (
          <SettingsRow
            key={item.id}
            label={t(item.label)}
            iconSrc={SETTINGS_ASSETS[item.iconKey]}
            href={!item.gateLogin || isAuthenticated ? item.href : undefined}
            onClick={
              item.gateLogin && !isAuthenticated
                ? () => handleRowPress(item.href, true)
                : undefined
            }
          />
        ))}

        <SettingsRow
          label={t(SS.rateUsLabel)}
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
              label={t(SS.deleteAccountLabel)}
              iconSrc={SETTINGS_ASSETS.deleteAccount}
              href={`${ROUTES.settings}/delete-account`}
            />
            <SettingsRow
              label={t(SS.logoutLabel)}
              iconSrc={SETTINGS_ASSETS.logout}
              variant="logout"
              onClick={handleLogout}
            />
          </>
        )}
      </div>
      <SettingsRateDialog
        open={rateOpen}
        onClose={() => setRateOpen(false)}
        onRateNow={() => {
          setRateOpen(false);
          window.open(SS.playStoreUrl, "_blank", "noopener,noreferrer");
        }}
      />
    </>
  );
}
