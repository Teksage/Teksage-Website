"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { ConsultationFlowCta } from "@/components/consultation/ConsultationFlowCta";
import { PageLoadingCenter } from "@/components/common/Loader";
import { WhatsAppUpdatesSendSection } from "@/components/whatsapp-updates/WhatsAppUpdatesSendSection";
import { WhatsAppUpdatesPhoneGate } from "@/components/whatsapp-updates/WhatsAppUpdatesPhoneGate";
import { useWhatsAppConsent } from "@/hooks/useWhatsAppConsent";
import { useAuthStore } from "@/store/auth.store";
import { normalizePhoneParts } from "@/lib/phone-utils";
import { ROUTES } from "@/lib/constants/routes";
import { ASK_ASTROLOGER_SCREEN, ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";
import type { WhatsAppConsentRequestPayload } from "@/types/whatsapp-updates";

export default function AskAstrologerWhatsAppConsentPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const { consent, loading, sending, requestConsent } = useWhatsAppConsent();
  const profile = normalizePhoneParts(user?.countryCode, user?.mobile);

  const verified = Boolean(user?.isMobileVerified);

  // Skip if already granted
  useEffect(() => {
    if (!loading && consent.granted) {
      router.replace(ROUTES.askAstrologerConfirmation);
    }
  }, [loading, consent.granted, router]);

  if (loading) {
    return (
      <div className={ASK_ASTROLOGER_UI.page}>
        <AppHeader title={ASK_ASTROLOGER_SCREEN.waConsentTitle} />
        <PageLoadingCenter />
      </div>
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

  return (
    <div className={ASK_ASTROLOGER_UI.page}>
      <AppHeader
        title={ASK_ASTROLOGER_SCREEN.waConsentTitle}
        showBack
        onBackClick={() => router.back()}
      />
      <div className={ASK_ASTROLOGER_UI.inner}>
        <h1 className={ASK_ASTROLOGER_UI.heading}>
          {ASK_ASTROLOGER_SCREEN.waConsentHeading}
        </h1>
        <p className={ASK_ASTROLOGER_UI.subtitle}>
          {ASK_ASTROLOGER_SCREEN.waConsentSubtitle}
        </p>
        <div className="mt-4">
          {!verified ? <WhatsAppUpdatesPhoneGate /> : null}
          {verified ? (
            <WhatsAppUpdatesSendSection
              disabled={false}
              loading={sending}
              profileCountryCode={profile.countryCode}
              profileMobile={profile.mobile}
              onSend={(payload) => void handleEnable(payload)}
              showStopNote={false}
              hintText={ASK_ASTROLOGER_SCREEN.waConsentEnable}
            />
          ) : null}
        </div>
      </div>
      <footer className="sticky bottom-0 border-t border-black/10 bg-white px-5 py-4">
        <button
          type="button"
          onClick={() => router.push(ROUTES.askAstrologerConfirmation)}
          className="w-full py-3 text-sm font-medium text-black/60 hover:text-black/80"
        >
          {ASK_ASTROLOGER_SCREEN.waConsentSkip}
        </button>
      </footer>
    </div>
  );
}
