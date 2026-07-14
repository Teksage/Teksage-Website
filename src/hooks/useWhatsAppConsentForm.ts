"use client";

import { useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { WHATSAPP_UPDATES_SCREEN } from "@/lib/constants/whatsapp-updates";
import { maskPhoneForDisplay } from "@/lib/whatsapp-consent-resend";
import { normalizePhoneParts } from "@/lib/phone-utils";
import {
  expectedLengthForCountryCode,
  isValidNationalMobile,
} from "@/lib/mobile-validation";
import type {
  WhatsAppConsentPhoneMode,
  WhatsAppConsentRequestPayload,
} from "@/types/whatsapp-updates";
import type { WhatsAppUpdatesPhoneChoiceProps } from "@/types/whatsapp-updates";

type UseWhatsAppConsentFormArgs = {
  profileCountryCode: string;
  profileMobile: string;
};

export function useWhatsAppConsentForm({
  profileCountryCode,
  profileMobile,
}: UseWhatsAppConsentFormArgs) {
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
    const expected = expectedLengthForCountryCode(countryCode);
    if (!isValidNationalMobile(mobile, expected)) {
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

  const phoneChoiceProps: WhatsAppUpdatesPhoneChoiceProps = {
    mode,
    profileMasked,
    countryCode,
    mobile,
    onModeChange: setMode,
    onCountryCodeChange: setCountryCode,
    onMobileChange: (value) => {
      setMobile(value);
      setValidationError(null);
    },
    validationError,
  };

  return { phoneChoiceProps, buildPayload };
}
