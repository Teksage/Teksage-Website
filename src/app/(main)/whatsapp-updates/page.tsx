"use client";

import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { WhatsAppUpdatesPageContent } from "@/components/whatsapp-updates/WhatsAppUpdatesPageContent";
import { MAIN_TAB_VIEWPORT_BACKDROP, PAGE_SHELL } from "@/lib/constants";
import { WHATSAPP_UPDATES_UI } from "@/lib/constants/whatsapp-updates";
import { cn } from "@/lib/utils";

export default function WhatsAppUpdatesPage() {
  return (
    <div className={cn(PAGE_SHELL.column, WHATSAPP_UPDATES_UI.page)}>
      <MainTabViewportBackdrop
        className={MAIN_TAB_VIEWPORT_BACKDROP.settings}
      />
      <WhatsAppUpdatesPageContent />
    </div>
  );
}
