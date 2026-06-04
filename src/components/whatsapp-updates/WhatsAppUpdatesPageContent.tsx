"use client";

import { PageLoadingCenter } from "@/components/common/Loader";
import { WhatsAppUpdatesBenefitsCard } from "@/components/whatsapp-updates/WhatsAppUpdatesBenefitsCard";
import { WhatsAppUpdatesCta } from "@/components/whatsapp-updates/WhatsAppUpdatesCta";
import { WhatsAppUpdatesDisableCta } from "@/components/whatsapp-updates/WhatsAppUpdatesDisableCta";
import { WhatsAppUpdatesHeader } from "@/components/whatsapp-updates/WhatsAppUpdatesHeader";
import { WhatsAppUpdatesHero } from "@/components/whatsapp-updates/WhatsAppUpdatesHero";
import { WhatsAppUpdatesPhoneGate } from "@/components/whatsapp-updates/WhatsAppUpdatesPhoneGate";
import { useWhatsAppConsent } from "@/hooks/useWhatsAppConsent";
import { useI18nConstants } from "@/hooks/useT";
import { useAuthStore } from "@/store/auth.store";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
import { cn } from "@/lib/utils";
import type { WhatsAppUpdatesPageContentProps } from "@/types/whatsapp-updates";

export function WhatsAppUpdatesPageContent({ className }: WhatsAppUpdatesPageContentProps) {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);
  const user = useAuthStore((s) => s.user);
  const { consent, loading, sending, revoking, error, requestConsent, revokeConsent } =
    useWhatsAppConsent();

  const verified = Boolean(user?.isMobileVerified);
  const showRevoked = verified && !consent.granted && Boolean(consent.revokedAt);
  const pending =
    verified &&
    !consent.granted &&
    Boolean(consent.consentSentAt) &&
    !consent.revokedAt;
  const canEnable =
    verified &&
    !consent.granted &&
    (showRevoked || consent.canResend || !consent.consentSentAt);

  async function handleEnable() {
    try {
      await requestConsent();
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

  if (loading) {
    return (
      <div className={cn(WHATSAPP_UPDATES_UI.page, className)}>
        <WhatsAppUpdatesHeader />
        <PageLoadingCenter />
      </div>
    );
  }

  return (
    <div className={cn(WHATSAPP_UPDATES_UI.page, className)}>
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
            <WhatsAppUpdatesCta
              disabled={!verified}
              loading={sending}
              onEnable={() => void handleEnable()}
              className="mt-4"
              showStopNote={false}
              hintText={WU.reenableHint}
            />
          </div>
        ) : null}

        {pending ? (
          <div className={WHATSAPP_UPDATES_UI.statusBox}>
            <p className={WHATSAPP_UPDATES_UI.statusTitle}>{WU.pendingTitle}</p>
            <p className={WHATSAPP_UPDATES_UI.statusBody}>{WU.pendingBody}</p>
          </div>
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

        {canEnable && !showRevoked ? (
          <WhatsAppUpdatesCta
            disabled={!verified}
            loading={sending}
            onEnable={() => void handleEnable()}
          />
        ) : null}
      </div>
    </div>
  );
}
