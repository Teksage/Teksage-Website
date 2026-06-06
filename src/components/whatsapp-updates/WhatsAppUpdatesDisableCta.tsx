"use client";

import { Button } from "@/components/ui/button";
import { useI18nConstants } from "@/hooks/useT";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
import { cn } from "@/lib/utils";

type WhatsAppUpdatesDisableCtaProps = {
  loading: boolean;
  onDisable: () => void;
  className?: string;
};

export function WhatsAppUpdatesDisableCta({
  loading,
  onDisable,
  className,
}: WhatsAppUpdatesDisableCtaProps) {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);

  return (
    <div className={cn("mt-4", className)}>
      <Button
        type="button"
        variant="outline"
        className={WHATSAPP_UPDATES_UI.disableBtn}
        disabled={loading}
        onClick={onDisable}
      >
        {loading ? WU.disableCtaSending : WU.disableCtaLabel}
      </Button>
      <p className={WHATSAPP_UPDATES_UI.footer}>
        {WU.unsubscribeNote}{" "}
        <strong>{WU.unsubscribeKeyword}</strong> {WU.unsubscribeSuffix}
      </p>
    </div>
  );
}
