"use client";

import { AppHeader } from "@/components/common/AppHeader";
import { SettingsMenu } from "@/components/settings/SettingsMenu";
import {
  SETTINGS_SCREEN,
  SETTINGS_SHELL_GRADIENT_CLASS,
} from "@/lib/constants/settings-screen";
import { HOME_LAYOUT } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  return (
    <div
      className={cn(
        "flex min-h-dvh flex-col",
        SETTINGS_SHELL_GRADIENT_CLASS
      )}
    >
      <AppHeader blend title={SETTINGS_SCREEN.title} />

      <div
        className={cn(
          HOME_LAYOUT.maxWidth,
          "mx-auto w-full flex-1 px-5 pb-28 pt-6"
        )}
      >
        <SettingsMenu />
      </div>
    </div>
  );
}
