"use client";

import { useState } from "react";
import { ProfilePhoneRow } from "@/components/settings/ProfilePhoneRow";
import { useAuthStore } from "@/store/auth.store";
import { useProfile } from "@/hooks/useProfile";
import { useI18nConstants } from "@/hooks/useT";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
import { DEFAULT_COUNTRY_CODE_NUMERIC } from "@/lib/constants/default-region";

export function WhatsAppUpdatesPhoneGate() {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);
  const user = useAuthStore((s) => s.user);
  const { refetchProfile } = useProfile();
  const [countryCode, setCountryCode] = useState(
    user?.countryCode ?? DEFAULT_COUNTRY_CODE_NUMERIC
  );
  const [mobile, setMobile] = useState(user?.mobile?.replace(/\D/g, "") ?? "");

  if (user?.isMobileVerified) return null;

  return (
    <div className={WHATSAPP_UPDATES_UI.statusBox}>
      <p className={WHATSAPP_UPDATES_UI.statusTitle}>{WU.verifyPhoneTitle}</p>
      <p className={WHATSAPP_UPDATES_UI.statusBody}>{WU.verifyPhoneBody}</p>
      <div className="mt-4 text-left">
        <ProfilePhoneRow
          countryCode={countryCode}
          mobile={mobile}
          onCountryCodeChange={setCountryCode}
          onMobileChange={setMobile}
          isMobileVerified={false}
          isEditing
          onVerificationSuccess={() => refetchProfile()}
        />
      </div>
    </div>
  );
}
