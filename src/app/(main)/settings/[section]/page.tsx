"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { SettingsDeleteAccountView } from "@/components/settings/SettingsDeleteAccountView";
import { SettingsFaqView } from "@/components/settings/SettingsFaqView";
import { SettingsLanguageView } from "@/components/settings/SettingsLanguageView";
import { SettingsLegalView } from "@/components/settings/SettingsLegalView";
import { SettingsPageHeader } from "@/components/settings/SettingsPageHeader";
import { SettingsPushNotificationsView } from "@/components/settings/SettingsPushNotificationsView";
import { SettingsSubscriptionsView } from "@/components/settings/SettingsSubscriptionsView";
import { SettingsSubpageHeader } from "@/components/settings/SettingsSubpageHeader";
import { SettingsSupportView } from "@/components/settings/SettingsSupportView";
import { PRIVACY_LEGAL_BLOCKS, TERMS_LEGAL_BLOCKS } from "@/lib/constants/legal";
import {
  SETTINGS_LAYOUT,
  SETTINGS_SCREEN,
  SETTINGS_SECTION_SLUGS,
  SETTINGS_SECTION_SUBTITLE,
  SETTINGS_SECTION_TITLE,
  type SettingsSectionSlug,
} from "@/lib/constants/settings-screen";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import {
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  ROUTES,
} from "@/lib/constants";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { cn } from "@/lib/utils";

function isSectionSlug(s: string): s is SettingsSectionSlug {
  return (SETTINGS_SECTION_SLUGS as readonly string[]).includes(s);
}

/** Mint-glow subpages — match Settings / Profile shell. */
const MINT_SECTIONS = new Set<SettingsSectionSlug>([
  "push-notifications",
  "language",
  "faq",
  "support",
  "terms",
  "privacy",
  "delete-account",
]);

export default function SettingsSectionPage() {
  const router = useRouter();
  const params = useParams();
  const raw = params.section;
  const section = typeof raw === "string" ? raw : "";
  if (!isSectionSlug(section)) notFound();

  const { t } = useAppLanguage();
  const title = t(SETTINGS_SECTION_TITLE[section]);
  const isMint = MINT_SECTIONS.has(section);
  const isSubscription = section === "subscriptions";

  function renderSection() {
    switch (section) {
      case "faq":
        return <SettingsFaqView />;
      case "support":
        return <SettingsSupportView />;
      case "language":
        return <SettingsLanguageView />;
      case "push-notifications":
        return <SettingsPushNotificationsView />;
      case "subscriptions":
        return <SettingsSubscriptionsView onBack={() => router.back()} />;
      case "terms":
        return <SettingsLegalView title={title} blocks={TERMS_LEGAL_BLOCKS} />;
      case "privacy":
        return (
          <SettingsLegalView title={title} blocks={PRIVACY_LEGAL_BLOCKS} />
        );
      case "delete-account":
        return <SettingsDeleteAccountView />;
      default:
        return null;
    }
  }

  if (isMint) {
    return (
      <div className={cn(PAGE_SHELL.column, SETTINGS_LAYOUT.pageRoot)}>
        <MainTabViewportBackdrop
          className={MAIN_TAB_VIEWPORT_BACKDROP.settings}
        />
        <div
          className={cn(PAGE_SHELL.contentLayer, SETTINGS_LAYOUT.desktopPanel)}
        >
          <SettingsPageHeader
            title={title}
            subtitle={
              section in SETTINGS_SECTION_SUBTITLE
                ? t(
                    SETTINGS_SECTION_SUBTITLE[
                      section as keyof typeof SETTINGS_SECTION_SUBTITLE
                    ]
                  )
                : undefined
            }
            backLabel={t(SETTINGS_SCREEN.title)}
            onBack={() => router.push(ROUTES.settings)}
          />
          {renderSection()}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        PAGE_SHELL.column,
        isSubscription ? "h-full min-h-0" : PAGE_SHELL.root
      )}
    >
      <div
        className={cn(
          PAGE_SHELL.contentLayer,
          "flex min-h-0 flex-1 flex-col",
          isSubscription
            ? cn(SETTINGS_UI.subscriptionPage, "min-h-0 flex-1 bg-black")
            : SETTINGS_UI.whitePage
        )}
      >
        {!isSubscription ? (
          <SettingsSubpageHeader
            title={title}
            onBack={() => router.back()}
            variant="white"
          />
        ) : null}
        {renderSection()}
      </div>
    </div>
  );
}
