"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import {
  SETTINGS_LAYOUT,
  SETTINGS_PLACEHOLDER_SLUGS,
  SETTINGS_SCREEN,
  SETTINGS_SECTION_TITLE,
  type SettingsPlaceholderSlug,
} from "@/lib/constants/settings-screen";
import { MAIN_TAB_VIEWPORT_BACKDROP, PAGE_SHELL } from "@/lib/constants";
import { cn } from "@/lib/utils";

function isPlaceholderSlug(s: string): s is SettingsPlaceholderSlug {
  return (SETTINGS_PLACEHOLDER_SLUGS as readonly string[]).includes(s);
}

export default function SettingsSectionPlaceholderPage() {
  const router = useRouter();
  const params = useParams();
  const raw = params.section;
  const section = typeof raw === "string" ? raw : "";
  if (!isPlaceholderSlug(section)) notFound();

  const title = SETTINGS_SECTION_TITLE[section];

  return (
    <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.settings} />
      <AppHeader
        title={title}
        blend
        showBack
        onBackClick={() => router.back()}
        className={PAGE_SHELL.contentLayer}
      />

      <div className={SETTINGS_LAYOUT.sectionContent}>
        <div className={SETTINGS_LAYOUT.placeholderCard}>
          <p className={SETTINGS_LAYOUT.placeholderTitle}>
            {SETTINGS_SCREEN.placeholderLead}
          </p>
          <p className={SETTINGS_LAYOUT.placeholderHint}>
            {SETTINGS_SCREEN.placeholderHint}
          </p>
        </div>
      </div>
    </div>
  );
}
