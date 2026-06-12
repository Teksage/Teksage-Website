"use client";

import { useWhatsAppConsentForm } from "@/hooks/useWhatsAppConsentForm";
import { WhatsAppUpdatesCta } from "@/components/whatsapp-updates/WhatsAppUpdatesCta";
import { WhatsAppUpdatesPhoneChoice } from "@/components/whatsapp-updates/WhatsAppUpdatesPhoneChoice";
import { useI18nConstants } from "@/hooks/useT";
import { WHATSAPP_UPDATES_SCREEN } from "@/lib/constants/whatsapp-updates";
import type { WhatsAppUpdatesSendSectionProps } from "@/types/whatsapp-updates";

export function WhatsAppUpdatesSendSection({
  disabled,
  loading,
  profileCountryCode,
  profileMobile,
  onSend,
  hintText,
  showStopNote = true,
  ctaLabel,
}: WhatsAppUpdatesSendSectionProps) {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);
  const { phoneChoiceProps, buildPayload } = useWhatsAppConsentForm({
    profileCountryCode,
    profileMobile,
  });

  function handleEnable() {
    const payload = buildPayload();
    if (!payload) return;
    onSend(payload);
  }

  return (
    <div className="mt-4">
      <WhatsAppUpdatesPhoneChoice {...phoneChoiceProps} />
      <WhatsAppUpdatesCta
        disabled={disabled}
        loading={loading}
        onEnable={handleEnable}
        className="mt-4"
        showStopNote={showStopNote}
        hintText={hintText}
        ctaLabel={ctaLabel ?? WU.sendConfirmationLabel}
      />
    </div>
  );
}
