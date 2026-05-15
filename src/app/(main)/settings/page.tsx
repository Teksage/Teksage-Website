"use client";

import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { SettingsMenu } from "@/components/settings/SettingsMenu";
import {
  SETTINGS_LAYOUT,
  SETTINGS_SCREEN,
} from "@/lib/constants/settings-screen";
import {
  HOME_LAYOUT,
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  return (
    <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.settings} />
      <AppHeader
        blend
        title={SETTINGS_SCREEN.title}
        className={PAGE_SHELL.contentLayer}
      />

      <div className={cn(HOME_LAYOUT.maxWidth, SETTINGS_LAYOUT.menuContent)}>
        <SettingsMenu />
      </div>
    </div>
  );
}
