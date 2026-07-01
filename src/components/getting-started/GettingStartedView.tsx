"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { GettingStartedVideoCard } from "@/components/getting-started/GettingStartedVideoCard";
import { useI18nConstants } from "@/hooks/useT";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import {
  GETTING_STARTED_LAYOUT,
  GETTING_STARTED_SCREEN,
  GETTING_STARTED_VIDEOS,
} from "@/lib/constants/getting-started";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";

export function GettingStartedView() {
  const GS = useI18nConstants(GETTING_STARTED_SCREEN);
  const { t } = useAppLanguage();
  const router = useRouter();

  return (
    <div className={GETTING_STARTED_LAYOUT.pageRoot}>
      <AppHeader
        blend
        title={GS.title}
        showBack
        onBackClick={() => router.push(ROUTES.settings)}
        className={cn(GETTING_STARTED_LAYOUT.headerChrome)}
      />

      <div className={GETTING_STARTED_LAYOUT.panel}>
        <header className={GETTING_STARTED_LAYOUT.hero}>
          <h1 className={GETTING_STARTED_LAYOUT.heroTitle}>{GS.title}</h1>
          <p className={GETTING_STARTED_LAYOUT.heroSubtitle}>{GS.subtitle}</p>
        </header>

        <section aria-labelledby="getting-started-videos-heading">
          <h2
            id="getting-started-videos-heading"
            className={GETTING_STARTED_LAYOUT.sectionTitle}
          >
            {GS.videosSectionTitle}
          </h2>
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
        </section>
      </div>
    </div>
  );
}
