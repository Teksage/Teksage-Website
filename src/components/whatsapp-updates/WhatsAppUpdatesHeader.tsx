"use client";

import { useRouter } from "next/navigation";
import { SettingsPageHeader } from "@/components/settings/SettingsPageHeader";
import { ROUTES } from "@/lib/constants/routes";
import { WHATSAPP_UPDATES_SCREEN } from "@/lib/constants/whatsapp-updates";
import { useI18nConstants } from "@/hooks/useT";

export function WhatsAppUpdatesHeader() {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);
  const router = useRouter();

  return (
    <SettingsPageHeader
      title={WU.title}
      subtitle={WU.subtitle}
      backLabel={WU.backLabel}
      onBack={() => router.push(ROUTES.settings)}
    />
  );
}
