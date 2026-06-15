"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "@/components/common/Loader";
import { WhatsAppUpdatesSendSection } from "@/components/whatsapp-updates/WhatsAppUpdatesSendSection";
import { useI18nConstants } from "@/hooks/useT";
import { WHATSAPP_UPDATES_ASSETS } from "@/lib/constants/assets";
import {
  WHATSAPP_UPDATES_SCREEN,
  WHATSAPP_UPDATES_UI,
} from "@/lib/constants/whatsapp-updates";
import {
  formatResendCountdown,
  getResendSecondsRemaining,
} from "@/lib/whatsapp-consent-resend";
import type { WhatsAppUpdatesPendingCardProps } from "@/types/whatsapp-updates";

function PendingCardShell({ children }: { children: ReactNode }) {
  return (
    <div className={WHATSAPP_UPDATES_UI.pendingCard}>
      <div className={WHATSAPP_UPDATES_UI.pendingCardInner}>{children}</div>
    </div>
  );
}

export function WhatsAppUpdatesPendingCard({
  consent,
  sending,
  startingOver,
  onResend,
  onChangeNumber,
  onStartOver,
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
  const canResend = !onCooldown && consent.canResend;

  if (showPhoneChoice) {
    return (
      <PendingCardShell>
        <div className={WHATSAPP_UPDATES_UI.pendingIconWrap}>
          <Image
            src={WHATSAPP_UPDATES_ASSETS.ctaWhatsapp}
            alt=""
            width={28}
            height={28}
            unoptimized
            className="size-7 lg:size-8"
          />
        </div>
        <h2 className={WHATSAPP_UPDATES_UI.pendingTitle}>{WU.pendingTitle}</h2>
        <p className={WHATSAPP_UPDATES_UI.pendingBody}>{WU.pendingBody}</p>
        <WhatsAppUpdatesSendSection
          disabled={false}
          loading={sending}
          profileCountryCode={profileCountryCode}
          profileMobile={profileMobile}
          onSend={onResend}
          showStopNote={false}
          ctaLabel={WU.resendCta}
        />
      </PendingCardShell>
    );
  }

  return (
    <PendingCardShell>
      <div className={WHATSAPP_UPDATES_UI.pendingIconWrap}>
        <Image
          src={WHATSAPP_UPDATES_ASSETS.ctaWhatsapp}
          alt=""
          width={28}
          height={28}
          unoptimized
          className="size-7 lg:size-8"
        />
      </div>

      <h2 className={WHATSAPP_UPDATES_UI.pendingTitle}>{WU.pendingTitle}</h2>
      <p className={WHATSAPP_UPDATES_UI.pendingBody}>{WU.pendingBody}</p>

      {consent.phoneMasked ? (
        <div className={WHATSAPP_UPDATES_UI.pendingPhoneChip}>
          <span className={WHATSAPP_UPDATES_UI.pendingPhoneLabel}>{WU.pendingSentToPrefix}</span>
          <span className={WHATSAPP_UPDATES_UI.pendingPhoneValue}>{consent.phoneMasked}</span>
        </div>
      ) : null}

      {onCooldown ? (
        <div className={WHATSAPP_UPDATES_UI.pendingCooldownBox}>
          <p className={WHATSAPP_UPDATES_UI.pendingCooldownLabel}>{WU.resendCooldownActive}</p>
          <p className={WHATSAPP_UPDATES_UI.pendingCooldownTimer}>
            {WU.resendCooldownHint} {formatResendCountdown(secondsLeft)}
          </p>
        </div>
      ) : null}

      <button
        type="button"
        disabled={!canResend || sending}
        onClick={() =>
          onResend({
            useProfilePhone: true,
          })
        }
        className={WHATSAPP_UPDATES_UI.pendingResendBtn}
      >
        {sending ? (
          <span className="inline-flex items-center gap-2">
            <Loader variant="inline" size="sm" />
            {WU.resendSending}
          </span>
        ) : (
          WU.resendCta
        )}
      </button>

      <p className={WHATSAPP_UPDATES_UI.pendingHint}>{WU.resendDeliveryHint}</p>

      <div className={WHATSAPP_UPDATES_UI.pendingFooter}>
        <div className={WHATSAPP_UPDATES_UI.pendingFooterLinks}>
          <button type="button" onClick={onChangeNumber} className={WHATSAPP_UPDATES_UI.changeNumberBtn}>
            {WU.changeNumberLink}
          </button>
          <span className={WHATSAPP_UPDATES_UI.pendingFooterDivider} aria-hidden>
            ·
          </span>
          <button
            type="button"
            disabled={sending || startingOver}
            onClick={onStartOver}
            className={WHATSAPP_UPDATES_UI.changeNumberBtn}
          >
            {startingOver ? WU.startOverSending : WU.startOverLink}
          </button>
        </div>
      </div>
    </PendingCardShell>
  );
}
