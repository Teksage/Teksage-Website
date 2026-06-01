"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { SettingsDeleteAccountView } from "@/components/settings/SettingsDeleteAccountView";
import { SettingsFaqView } from "@/components/settings/SettingsFaqView";
import { SettingsLanguageView } from "@/components/settings/SettingsLanguageView";
import { SettingsLegalView } from "@/components/settings/SettingsLegalView";
import { SettingsPushNotificationsView } from "@/components/settings/SettingsPushNotificationsView";
import { SettingsSubscriptionsView } from "@/components/settings/SettingsSubscriptionsView";
import { SettingsSubpageHeader } from "@/components/settings/SettingsSubpageHeader";
import { SettingsSupportView } from "@/components/settings/SettingsSupportView";
import { PRIVACY_LEGAL_BLOCKS, TERMS_LEGAL_BLOCKS } from "@/lib/constants/legal";
import {
  SETTINGS_SECTION_SLUGS,
  SETTINGS_SECTION_TITLE,
  type SettingsSectionSlug,
} from "@/lib/constants/settings-screen";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { MAIN_TAB_VIEWPORT_BACKDROP, PAGE_SHELL } from "@/lib/constants";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { cn } from "@/lib/utils";

function isSectionSlug(s: string): s is SettingsSectionSlug {
  return (SETTINGS_SECTION_SLUGS as readonly string[]).includes(s);
}

type SectionShell = "mint" | "white" | "language" | "dark" | "legal";

const SECTION_SHELL: Record<SettingsSectionSlug, SectionShell> = {
  language: "language",
  faq: "white",
  support: "white",
  "push-notifications": "white",
  subscriptions: "dark",
  terms: "legal",
  privacy: "legal",
  "delete-account": "white",
};

function shellClass(shell: SectionShell): string {
  switch (shell) {
    case "language":
      return SETTINGS_UI.languagePage;
    case "white":
      return SETTINGS_UI.whitePage;
    case "dark":
      return cn(SETTINGS_UI.subscriptionPage, "min-h-0 flex-1 bg-black");
    case "legal":
      return "relative z-10 flex min-h-0 flex-1 flex-col bg-white";
    default:
      return "relative z-10 min-h-0 flex-1";
  }
}

export default function SettingsSectionPage() {
  const router = useRouter();
  const params = useParams();
  const raw = params.section;
  const section = typeof raw === "string" ? raw : "";
  if (!isSectionSlug(section)) notFound();

  const { t } = useAppLanguage();
  const title = t(SETTINGS_SECTION_TITLE[section]);
  const shell = SECTION_SHELL[section];
  const showMintBackdrop = shell === "mint" || shell === "language";
  const showHeader = shell === "white" || shell === "language";

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
        return (
          <SettingsLegalView
            title={title}
            blocks={TERMS_LEGAL_BLOCKS}
            onBack={() => router.back()}
          />
        );
      case "privacy":
        return (
          <SettingsLegalView
            title={title}
            blocks={PRIVACY_LEGAL_BLOCKS}
            onBack={() => router.back()}
          />
        );
      case "delete-account":
        return <SettingsDeleteAccountView />;
      default:
        return null;
    }
  }

  const isSubscriptionSection = section === "subscriptions";

  return (
    <div
      className={cn(
        PAGE_SHELL.column,
        isSubscriptionSection ? "h-full min-h-0" : PAGE_SHELL.root
      )}
    >
      {showMintBackdrop ? (
        <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.settings} />
      ) : null}
      <div className={cn(PAGE_SHELL.contentLayer, "flex min-h-0 flex-1 flex-col", shellClass(shell))}>
        {showHeader ? (
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
