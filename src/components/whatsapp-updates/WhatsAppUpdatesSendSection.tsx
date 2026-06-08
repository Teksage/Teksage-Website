"use client";

import { useState } from "react";
import { WhatsAppUpdatesCta } from "@/components/whatsapp-updates/WhatsAppUpdatesCta";
import { WhatsAppUpdatesPhoneChoice } from "@/components/whatsapp-updates/WhatsAppUpdatesPhoneChoice";
import { useI18nConstants } from "@/hooks/useT";
import { LOGIN_MOBILE_DIGITS_REGEX } from "@/lib/constants";
import { WHATSAPP_UPDATES_SCREEN } from "@/lib/constants/whatsapp-updates";
import { maskPhoneForDisplay } from "@/lib/whatsapp-consent-resend";
import { normalizePhoneParts } from "@/lib/phone-utils";
import type {
  WhatsAppConsentPhoneMode,
  WhatsAppConsentRequestPayload,
  WhatsAppUpdatesSendSectionProps,
} from "@/types/whatsapp-updates";

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
  const profile = normalizePhoneParts(profileCountryCode, profileMobile);
  const [mode, setMode] = useState<WhatsAppConsentPhoneMode>("profile");
  const [countryCode, setCountryCode] = useState(profile.countryCode);
  const [mobile, setMobile] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const profileMasked = maskPhoneForDisplay(profile.countryCode, profile.mobile);

  function buildPayload(): WhatsAppConsentRequestPayload | null {
    if (mode === "profile") {
      return { useProfilePhone: true };
    }
    if (!LOGIN_MOBILE_DIGITS_REGEX.test(mobile)) {
      setValidationError(WU.phoneChoiceInvalidMobile);
      return null;
    }
    setValidationError(null);
    return {
      useProfilePhone: false,
      countryCode: countryCode.replace(/\D/g, ""),
      mobileNumber: mobile,
    };
  }

  function handleEnable() {
    const payload = buildPayload();
    if (!payload) return;
    onSend(payload);
  }

  return (
    <div className="mt-4">
      <WhatsAppUpdatesPhoneChoice
        mode={mode}
        profileMasked={profileMasked}
        countryCode={countryCode}
        mobile={mobile}
        onModeChange={setMode}
        onCountryCodeChange={setCountryCode}
        onMobileChange={(value) => {
          setMobile(value);
          setValidationError(null);
        }}
        validationError={validationError}
      />
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
