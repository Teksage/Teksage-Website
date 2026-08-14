"use client";

import { useState } from "react";
import { PageLoadingCenter } from "@/components/common/Loader";
import { WhatsAppUpdatesBenefitsCard } from "@/components/whatsapp-updates/WhatsAppUpdatesBenefitsCard";
import { WhatsAppUpdatesDisableCta } from "@/components/whatsapp-updates/WhatsAppUpdatesDisableCta";
import { WhatsAppUpdatesHeader } from "@/components/whatsapp-updates/WhatsAppUpdatesHeader";
import { WhatsAppUpdatesHero } from "@/components/whatsapp-updates/WhatsAppUpdatesHero";
import { WhatsAppUpdatesPendingCard } from "@/components/whatsapp-updates/WhatsAppUpdatesPendingCard";
import { WhatsAppUpdatesPhoneGate } from "@/components/whatsapp-updates/WhatsAppUpdatesPhoneGate";
import { WhatsAppUpdatesSendSection } from "@/components/whatsapp-updates/WhatsAppUpdatesSendSection";
import { useWhatsAppConsent } from "@/hooks/useWhatsAppConsent";
import { useI18nConstants } from "@/hooks/useT";
import { useAuthStore } from "@/store/auth.store";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
import { normalizePhoneParts } from "@/lib/phone-utils";
import { cn } from "@/lib/utils";
import type {
  WhatsAppConsentRequestPayload,
  WhatsAppUpdatesPageContentProps,
} from "@/types/whatsapp-updates";

export function WhatsAppUpdatesPageContent({ className }: WhatsAppUpdatesPageContentProps) {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);
  const user = useAuthStore((s) => s.user);
  const { consent, loading, sending, revoking, error, requestConsent, revokeConsent } =
    useWhatsAppConsent();
  const [changingNumber, setChangingNumber] = useState(false);

  const verified = Boolean(user?.isMobileVerified);
  const profile = normalizePhoneParts(user?.countryCode, user?.mobile);
  const showRevoked = verified && !consent.granted && Boolean(consent.revokedAt);
  const pending =
    verified &&
    !consent.granted &&
    Boolean(consent.consentSentAt) &&
    !consent.revokedAt;
  const showIdleSend = verified && !consent.granted && !pending && !showRevoked;

  async function handleSend(payload: WhatsAppConsentRequestPayload) {
    try {
      await requestConsent(payload);
      setChangingNumber(false);
    } catch {
      /* error state set in hook */
    }
  }

  async function handleDisable() {
    try {
      await revokeConsent();
    } catch {
      /* error state set in hook */
    }
  }

  async function handleStartOver() {
    try {
      await revokeConsent();
      setChangingNumber(false);
    } catch {
      /* error state set in hook */
    }
  }

  if (loading) {
    return (
      <div className={cn(WHATSAPP_UPDATES_UI.panel, className)}>
        <WhatsAppUpdatesHeader />
        <PageLoadingCenter />
      </div>
    );
  }

  return (
    <div className={cn(WHATSAPP_UPDATES_UI.panel, className)}>
      <WhatsAppUpdatesHeader />
      <div className={WHATSAPP_UPDATES_UI.inner}>
        <WhatsAppUpdatesHero />
        <WhatsAppUpdatesBenefitsCard />

        {!verified ? <WhatsAppUpdatesPhoneGate /> : null}

        {consent.granted ? (
          <div className={WHATSAPP_UPDATES_UI.statusBox}>
            <p className={WHATSAPP_UPDATES_UI.statusTitle}>{WU.grantedTitle}</p>
            <p className={WHATSAPP_UPDATES_UI.statusBody}>{WU.grantedBody}</p>
            <WhatsAppUpdatesDisableCta
              loading={revoking}
              onDisable={() => void handleDisable()}
            />
          </div>
        ) : null}

        {showRevoked ? (
          <div className={WHATSAPP_UPDATES_UI.statusBox}>
            <p className={WHATSAPP_UPDATES_UI.statusTitle}>{WU.revokedTitle}</p>
            <p className={WHATSAPP_UPDATES_UI.statusBody}>{WU.revokedBody}</p>
            <WhatsAppUpdatesSendSection
              disabled={!verified}
              loading={sending}
              profileCountryCode={profile.countryCode}
              profileMobile={profile.mobile}
              onSend={(payload) => void handleSend(payload)}
              showStopNote={false}
              hintText={WU.reenableHint}
            />
          </div>
        ) : null}

        {pending ? (
          <WhatsAppUpdatesPendingCard
            consent={consent}
            sending={sending}
            startingOver={revoking}
            onResend={(payload) => void handleSend(payload)}
            onChangeNumber={() => setChangingNumber(true)}
            onStartOver={() => void handleStartOver()}
            profileCountryCode={profile.countryCode}
            profileMobile={profile.mobile}
            showPhoneChoice={changingNumber}
          />
        ) : null}

        {error ? (
          <p className="mt-3 text-center text-sm text-[var(--color-brand-error)]">
            {error.includes("429") || error.toLowerCase().includes("recently")
              ? WU.resendCooldown
              : error === "load_failed"
                ? WU.loadFailed
                : error === "revoke_failed"
                  ? WU.revokeFailed
                  : WU.requestFailed}
          </p>
        ) : null}

        {showIdleSend ? (
          <WhatsAppUpdatesSendSection
            disabled={!verified}
            loading={sending}
            profileCountryCode={profile.countryCode}
            profileMobile={profile.mobile}
            onSend={(payload) => void handleSend(payload)}
          />
        ) : null}
      </div>
    </div>
  );
}
