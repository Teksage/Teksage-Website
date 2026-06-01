"use client";

import { useI18nConstants } from "@/hooks/useT";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { SettingsMenu } from "@/components/settings/SettingsMenu";
import {
  SETTINGS_LAYOUT,
  SETTINGS_SCREEN,
} from "@/lib/constants/settings-screen";
import { MAIN_TAB_VIEWPORT_BACKDROP, PAGE_SHELL } from "@/lib/constants";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const SS = useI18nConstants(SETTINGS_SCREEN);
  const { t } = useAppLanguage();
  return (
    <div className={cn(PAGE_SHELL.column, SETTINGS_LAYOUT.pageRoot)}>
      <MainTabViewportBackdrop
        className={cn(
          MAIN_TAB_VIEWPORT_BACKDROP.settings,
          "lg:opacity-0"
        )}
      />
      <AppHeader
        blend
        title={t(SS.title)}
        className={cn(PAGE_SHELL.contentLayer, SETTINGS_LAYOUT.headerChrome)}
      />

      <div className={cn(PAGE_SHELL.contentLayer, SETTINGS_LAYOUT.desktopPanel)}>
        <SettingsMenu />
      </div>
    </div>
  );
}
