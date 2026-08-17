"use client";

import { useRouter } from "next/navigation";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { GettingStartedVideoCard } from "@/components/getting-started/GettingStartedVideoCard";
import { SettingsPageHeader } from "@/components/settings/SettingsPageHeader";
import { useI18nConstants } from "@/hooks/useT";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import {
  GETTING_STARTED_LAYOUT,
  GETTING_STARTED_SCREEN,
  GETTING_STARTED_VIDEOS,
} from "@/lib/constants/getting-started";
import {
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  ROUTES,
  SETTINGS_SCREEN,
} from "@/lib/constants";
import { SETTINGS_LAYOUT } from "@/lib/constants/settings-screen";
import { cn } from "@/lib/utils";

export function GettingStartedView() {
  const GS = useI18nConstants(GETTING_STARTED_SCREEN);
  const { t } = useAppLanguage();
  const router = useRouter();

  return (
    <div className={cn(PAGE_SHELL.column, GETTING_STARTED_LAYOUT.pageRoot)}>
      <MainTabViewportBackdrop
        className={MAIN_TAB_VIEWPORT_BACKDROP.settings}
      />
      <div className={GETTING_STARTED_LAYOUT.panel}>
        <SettingsPageHeader
          title={GS.title}
          subtitle={GS.subtitle}
          backLabel={t(SETTINGS_SCREEN.title)}
          onBack={() => router.push(ROUTES.settings)}
        />
        <div className={SETTINGS_LAYOUT.contentCard}>
          <div className={SETTINGS_LAYOUT.contentCardPad}>
            <div className={GETTING_STARTED_LAYOUT.videoGrid}>
              {GETTING_STARTED_VIDEOS.map((video) => (
                <GettingStartedVideoCard
                  key={video.id}
                  video={{
                    ...video,
                    title: t(video.title),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
