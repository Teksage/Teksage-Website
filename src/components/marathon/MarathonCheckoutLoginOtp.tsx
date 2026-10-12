"use client";

import { useEffect, useState } from "react";
import { OtpInput } from "@/components/auth/OtpInput";
import { OtpResendBlock } from "@/components/auth/OtpResendBlock";
import { Button } from "@/components/ui/button";
import { useI18nConstants } from "@/hooks/useT";
import { OTP_LENGTH, OTP_RESEND_COOLDOWN_SECONDS, OTP_VERIFY_SCREEN } from "@/lib/constants";
import { MARATHON_CHECKOUT, MARATHON_CHECKOUT_COPY } from "@/lib/constants/marathon-checkout";
import { MARATHON_COPY } from "@/lib/constants/marathon";
import { cn } from "@/lib/utils";
import { isTurnstileConfigured } from "@/lib/env";
import { resendOtp } from "@/lib/services/auth";
import type { MarathonCheckoutLoginOtpProps } from "@/types/marathon";

export function MarathonCheckoutLoginOtp({
  contact,
  tab,
  countryCode,
  error,
  onConfirm,
}: MarathonCheckoutLoginOtpProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const note = useI18nConstants(MARATHON_CHECKOUT_COPY);
  const resend = useI18nConstants(OTP_VERIFY_SCREEN);
  const form = MARATHON_CHECKOUT;
  const [cells, setCells] = useState<string[]>(() => Array.from({ length: OTP_LENGTH }, () => ""));
  const [seconds, setSeconds] = useState(OTP_RESEND_COOLDOWN_SECONDS);
  const [busy, setBusy] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [tokenKey, setTokenKey] = useState(0);
  const shown = tab === "email" ? contact : `${countryCode} ${contact}`;
  const ready = cells.join("").length === OTP_LENGTH;
  const canResend = seconds <= 0 && !busy && (!isTurnstileConfigured() || Boolean(token));

  useEffect(() => {
    if (seconds <= 0) return;
    const id = window.setTimeout(() => setSeconds((left) => left - 1), 1000);
    return () => window.clearTimeout(id);
  }, [seconds]);

  async function sendAgain() {
    if (!canResend) return;
    setBusy(true);
    try {
      if (tab === "email") {
        await resendOtp({ email: contact, cf_turnstile_token: token ?? undefined });
      } else {
        await resendOtp({
          mobile_number: contact,
          country_code: countryCode.replace(/\D/g, ""),
          cf_turnstile_token: token ?? undefined,
        });
      }
      setCells(Array.from({ length: OTP_LENGTH }, () => ""));
      setSeconds(OTP_RESEND_COOLDOWN_SECONDS);
      setToken(null);
      setTokenKey((key) => key + 1);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={form.otpBlock}>
      <p className={form.otpNote}>
        {note.otpSentTo} <span className={form.otpContact}>{shown}</span>
      </p>
      <p className={form.otpNote}>{note.otpValid}</p>
      <OtpInput
        value={cells}
        onChange={setCells}
        hasError={Boolean(error)}
        className={form.otpBoxes}
        cellClassName={form.otpCellLogin}
      />
      <Button
        type="button"
        className={cn(form.action, !ready && "cursor-not-allowed opacity-50")}
        disabled={!ready}
        onClick={() => onConfirm(cells.join(""))}
      >
        {copy.continue}
      </Button>
      <OtpResendBlock
        canResend={canResend}
        isResending={busy}
        resendSecondsLeft={seconds}
        showCaptcha={isTurnstileConfigured()}
        turnstileKey={tokenKey}
        onTokenChange={setToken}
        onResend={() => void sendAgain()}
        labels={{
          resendWaitPrefix: resend.resendWaitPrefix,
          resendWaitSuffix: resend.resendWaitSuffix,
          resendQuestion: resend.resendQuestion,
          resendCta: resend.resendCta,
        }}
      />
    </div>
  );
}
