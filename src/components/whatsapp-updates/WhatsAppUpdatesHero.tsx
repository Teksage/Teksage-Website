"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
import { cn } from "@/lib/utils";

export function WhatsAppUpdatesHero({ className }: { className?: string }) {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);

  return (
    <section className={cn("pt-4", className)}>
      <h1 className={WHATSAPP_UPDATES_UI.heroTitle}>
        {WU.heroLead}{" "}
        <span className={WHATSAPP_UPDATES_UI.heroHighlight}>{WU.heroHighlight}</span>
      </h1>
      <p className={WHATSAPP_UPDATES_UI.heroBody}>{WU.heroBody}</p>
    </section>
  );
}
