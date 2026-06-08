"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { WhatsAppUpdatesSendSection } from "@/components/whatsapp-updates/WhatsAppUpdatesSendSection";
import { useI18nConstants } from "@/hooks/useT";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
import {
  formatResendCountdown,
  getResendSecondsRemaining,
} from "@/lib/whatsapp-consent-resend";
import type { WhatsAppUpdatesPendingCardProps } from "@/types/whatsapp-updates";

export function WhatsAppUpdatesPendingCard({
  consent,
  sending,
  onResend,
  onChangeNumber,
  profileCountryCode,
  profileMobile,
  showPhoneChoice,
}: WhatsAppUpdatesPendingCardProps) {
  const WU = useI18nConstants(WHATSAPP_UPDATES_SCREEN);
  const [secondsLeft, setSecondsLeft] = useState(() =>
    getResendSecondsRemaining(consent.consentSentAt, consent.resendAvailableAt)
  );

  useEffect(() => {
    const tick = () => {
      setSecondsLeft(
        getResendSecondsRemaining(consent.consentSentAt, consent.resendAvailableAt)
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [consent.consentSentAt, consent.resendAvailableAt]);

  const onCooldown = secondsLeft > 0;
  const canResend = !onCooldown;

  if (showPhoneChoice) {
    return (
      <div className={WHATSAPP_UPDATES_UI.statusBox}>
        <p className={WHATSAPP_UPDATES_UI.statusTitle}>{WU.pendingTitle}</p>
        <p className={WHATSAPP_UPDATES_UI.statusBody}>{WU.pendingBody}</p>
        <WhatsAppUpdatesSendSection
          disabled={false}
          loading={sending}
          profileCountryCode={profileCountryCode}
          profileMobile={profileMobile}
          onSend={onResend}
          showStopNote={false}
          ctaLabel={WU.resendCta}
        />
      </div>
    );
  }

  return (
    <div className={WHATSAPP_UPDATES_UI.statusBox}>
      <p className={WHATSAPP_UPDATES_UI.statusTitle}>{WU.pendingTitle}</p>
      <p className={WHATSAPP_UPDATES_UI.statusBody}>{WU.pendingBody}</p>
      {consent.phoneMasked ? (
        <p className={`${WHATSAPP_UPDATES_UI.statusBody} mt-2 font-medium`}>
          {WU.pendingSentToPrefix}{" "}
          <span className="text-[var(--color-brand-black)]">{consent.phoneMasked}</span>
        </p>
      ) : null}

      {onCooldown ? (
        <div className="mt-4">
          <p className={WHATSAPP_UPDATES_UI.resendCountdownHint}>{WU.resendCooldownActive}</p>
          <p className={WHATSAPP_UPDATES_UI.resendCountdown}>
            {WU.resendCooldownHint} {formatResendCountdown(secondsLeft)}
          </p>
        </div>
      ) : null}

      <Button
        type="button"
        disabled={!canResend || sending}
        onClick={() =>
          onResend({
            useProfilePhone: true,
          })
        }
        className={WHATSAPP_UPDATES_UI.resendBtn}
      >
        {sending ? (
          <span className="inline-flex items-center gap-2">
            <Loader variant="inline" size="sm" />
            {WU.resendSending}
          </span>
        ) : (
          WU.resendCta
        )}
      </Button>

      <button type="button" onClick={onChangeNumber} className={WHATSAPP_UPDATES_UI.changeNumberBtn}>
        {WU.changeNumberLink}
      </button>
    </div>
  );
}
