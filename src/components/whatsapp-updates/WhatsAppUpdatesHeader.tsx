"use client";

import { useRouter } from "next/navigation";
import { SettingsSubpageHeader } from "@/components/settings/SettingsSubpageHeader";
import { WHATSAPP_UPDATES_SCREEN } from "@/lib/constants/whatsapp-updates";
import { useI18nConstants } from "@/hooks/useT";

export function WhatsAppUpdatesHeader() {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);
  const router = useRouter();

  return (
    <SettingsSubpageHeader
      title={WU.title}
      onBack={() => router.back()}
      variant="white"
    />
  );
}
