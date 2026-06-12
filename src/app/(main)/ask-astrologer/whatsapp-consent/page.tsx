"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AskAstrologerShell } from "@/components/ask-astrologer/AskAstrologerShell";
import { AskAstrologerWhatsAppConsentContent } from "@/components/ask-astrologer/AskAstrologerWhatsAppConsentContent";
import { PageLoadingCenter } from "@/components/common/Loader";
import { WhatsAppUpdatesCta } from "@/components/whatsapp-updates/WhatsAppUpdatesCta";
import { useWhatsAppConsent } from "@/hooks/useWhatsAppConsent";
import { useWhatsAppConsentForm } from "@/hooks/useWhatsAppConsentForm";
import { useAuthStore } from "@/store/auth.store";
import { normalizePhoneParts } from "@/lib/phone-utils";
import { ROUTES } from "@/lib/constants/routes";
import {
  ASK_ASTROLOGER_LAYOUT,
  ASK_ASTROLOGER_SCREEN,
} from "@/lib/constants/chat-ask-astrologer";
import type { WhatsAppConsentRequestPayload } from "@/types/whatsapp-updates";

export default function AskAstrologerWhatsAppConsentPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const { consent, loading, sending, requestConsent } = useWhatsAppConsent();
  const profile = normalizePhoneParts(user?.countryCode, user?.mobile);
  const verified = Boolean(user?.isMobileVerified);
  const { phoneChoiceProps, buildPayload } = useWhatsAppConsentForm({
    profileCountryCode: profile.countryCode,
    profileMobile: profile.mobile,
  });

  useEffect(() => {
    if (!loading && consent.granted) {
      router.replace(ROUTES.askAstrologerConfirmation);
    }
  }, [loading, consent.granted, router]);

  if (loading) {
    return (
      <AskAstrologerShell title={ASK_ASTROLOGER_SCREEN.waConsentTitle} showBack={false}>
        <PageLoadingCenter />
      </AskAstrologerShell>
    );
  }

  if (consent.granted) return null;

  async function handleEnable(payload: WhatsAppConsentRequestPayload) {
    try {
      await requestConsent(payload);
      router.push(ROUTES.askAstrologerConfirmation);
    } catch {
      /* error shown by hook */
    }
  }

  function onSendClick() {
    const payload = buildPayload();
    if (payload) void handleEnable(payload);
  }

  return (
    <AskAstrologerShell
      title={ASK_ASTROLOGER_SCREEN.waConsentTitle}
      onBack={() => router.back()}
      centered
      footer={
        <>
          {verified ? (
            <WhatsAppUpdatesCta
              disabled={false}
              loading={sending}
              onEnable={onSendClick}
              variant="flow"
              showStopNote={false}
              ctaLabel={
                sending
                  ? ASK_ASTROLOGER_SCREEN.waConsentSending
                  : ASK_ASTROLOGER_SCREEN.waConsentCta
              }
            />
          ) : null}
          <button
            type="button"
            onClick={() => router.push(ROUTES.askAstrologerConfirmation)}
            className={ASK_ASTROLOGER_LAYOUT.skipLink}
          >
            {ASK_ASTROLOGER_SCREEN.waConsentSkip}
          </button>
        </>
      }
    >
      <AskAstrologerWhatsAppConsentContent
        verified={verified}
        phoneChoiceProps={phoneChoiceProps}
      />
    </AskAstrologerShell>
  );
}
