"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SettingsModalDialog } from "@/components/settings/SettingsModalDialog";
import { SettingsRateDialog } from "@/components/settings/SettingsRateDialog";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { ROUTES } from "@/lib/constants";
import { SETTINGS_ASSETS } from "@/lib/constants/assets";
import {
  SETTINGS_LAYOUT,
  SETTINGS_MENU_SECTIONS,
  SETTINGS_PRIMARY_LINKS,
  SETTINGS_SCREEN,
  type SettingsPrimaryLink,
} from "@/lib/constants/settings-screen";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { useLoginPrompt } from "@/contexts/LoginPromptContext";
import { useAuth } from "@/hooks/useAuth";

function linkById(id: string): SettingsPrimaryLink | undefined {
  return SETTINGS_PRIMARY_LINKS.find((item) => item.id === id);
}

export function SettingsMenu() {
  const SS = useI18nConstants(SETTINGS_SCREEN);
  const { t } = useAppLanguage();
  const router = useRouter();
  const { openLoginPrompt } = useLoginPrompt();
  const { isAuthenticated, logout } = useAuth();
  const [rateOpen, setRateOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const linksById = useMemo(() => {
    const map = new Map<string, SettingsPrimaryLink>();
    for (const item of SETTINGS_PRIMARY_LINKS) map.set(item.id, item);
    return map;
  }, []);

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

  function renderLink(item: SettingsPrimaryLink) {
    return (
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
    );
  }

  return (
    <>
      <div className={SETTINGS_LAYOUT.pageIntro}>
        <h1 className={SETTINGS_LAYOUT.pageTitle}>{t(SS.title)}</h1>
        <p className={SETTINGS_LAYOUT.pageSubtitle}>{t(SS.subtitle)}</p>
      </div>

      <div className={SETTINGS_LAYOUT.sectionsGrid}>
        {SETTINGS_MENU_SECTIONS.map((section) => (
          <section key={section.id} className={SETTINGS_LAYOUT.sectionCard}>
            <div className={SETTINGS_LAYOUT.sectionHeader}>
              <h2 className={SETTINGS_LAYOUT.sectionTitle}>
                {t(SS[section.titleKey])}
              </h2>
            </div>
            <div className={SETTINGS_LAYOUT.sectionBody}>
              {section.linkIds.map((id) => {
                const item = linksById.get(id) ?? linkById(id);
                return item ? renderLink(item) : null;
              })}
              {"includeRateUs" in section && section.includeRateUs ? (
                <SettingsRow
                  label={t(SS.rateUsLabel)}
                  iconSrc={SETTINGS_ASSETS.rating}
                  onClick={handleRateUs}
                />
              ) : null}
            </div>
          </section>
        ))}

        {isAuthenticated ? (
          <section className={SETTINGS_LAYOUT.dangerCard}>
            <h2 className={SETTINGS_LAYOUT.dangerTitle}>
              {t(SS.sectionDanger)}
            </h2>
            <div className={SETTINGS_LAYOUT.dangerBody}>
              <SettingsRow
                label={t(SS.deleteAccountLabel)}
                iconSrc={SETTINGS_ASSETS.deleteAccount}
                href={`${ROUTES.settings}/delete-account`}
              />
              <SettingsRow
                label={t(SS.logoutLabel)}
                iconSrc={SETTINGS_ASSETS.logout}
                variant="logout"
                onClick={() => setLogoutOpen(true)}
              />
            </div>
          </section>
        ) : null}
      </div>

      <SettingsRateDialog
        open={rateOpen}
        onClose={() => setRateOpen(false)}
        onRateNow={() => {
          setRateOpen(false);
          window.open(SS.playStoreUrl, "_blank", "noopener,noreferrer");
        }}
      />
      <SettingsModalDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        message={t(SS.logoutConfirm)}
        confirmLabel={t(SS.logoutLabel)}
        onConfirm={() => {
          setLogoutOpen(false);
          void logout();
        }}
      />
    </>
  );
}
