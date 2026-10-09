"use client";

import { useState } from "react";
import { OtpInput } from "@/components/auth/OtpInput";
import { TurnstileField } from "@/components/auth/TurnstileField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18nConstants } from "@/hooks/useT";
import { AUTH_SCREEN, OTP_LENGTH } from "@/lib/constants";
import { DEFAULT_COUNTRY_CODE_NUMERIC } from "@/lib/constants/default-region";
import { LOGIN_EMAIL_FORM } from "@/lib/constants/login-email-form";
import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";
import { cn } from "@/lib/utils";
import { isTurnstileConfigured } from "@/lib/env";
import { marathonProfileReady } from "@/lib/marathon-display";
import { resendOtp, verifyOtp } from "@/lib/services/auth";
import { marathonErrorMessage } from "@/lib/services/marathon";
import { fetchProfile } from "@/lib/services/profile";
import { useAuthStore } from "@/store/auth.store";
import type { MarathonCheckoutSignInProps } from "@/types/marathon";

export function MarathonCheckoutSignIn({ onComplete }: MarathonCheckoutSignInProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const log = useI18nConstants(LOGIN_EMAIL_FORM);
  const ui = MARATHON_PAGE;
  const setAuth = useAuthStore((s) => s.setAuth);
  const [contact, setContact] = useState("");
  const [otpCells, setOtpCells] = useState<string[]>(() => Array.from({ length: OTP_LENGTH }, () => ""));
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  function resetCaptcha() {
    setCaptchaToken(null);
    setCaptchaKey((key) => key + 1);
  }

  async function sendCode() {
    setError("");
    if (isTurnstileConfigured() && !captchaToken) {
      setError(log.captchaRequired);
      return;
    }
    const value = contact.trim();
    try {
      if (value.includes("@")) {
        await resendOtp({ email: value, cf_turnstile_token: captchaToken ?? undefined });
      } else {
        await resendOtp({
          mobile_number: value,
          country_code: DEFAULT_COUNTRY_CODE_NUMERIC,
          cf_turnstile_token: captchaToken ?? undefined,
        });
      }
      setShowOtp(true);
    } catch (err: unknown) {
      setError(marathonErrorMessage(err));
      resetCaptcha();
    }
  }

  async function confirmOtp() {
    setError("");
    const code = otpCells.join("");
    if (code.length < OTP_LENGTH) {
      setError(copy.otp);
      return;
    }
    try {
      const auth = contact.includes("@")
        ? await verifyOtp({ email: contact.trim(), otp: code })
        : await verifyOtp({
            mobile: contact.trim(),
            countryCode: DEFAULT_COUNTRY_CODE_NUMERIC,
            otp: code,
          });
      setAuth(auth.user, auth.token);
      const profile = await fetchProfile();
      onComplete(marathonProfileReady(profile) ? 3 : 2);
    } catch {
      setError(copy.otpInvalid);
    }
  }

  const form = MARATHON_CHECKOUT;
  const codeReady = otpCells.join("").length === OTP_LENGTH;
  return (
    <>
      <p className={form.stepTitle}>{copy.login}</p>
      <p className={form.hint}>{copy.emailOrPhone}</p>
      {error ? <p className={ui.bookError}>{error}</p> : null}
      <Input className={AUTH_SCREEN.inputClassName} value={contact} onChange={(e) => setContact(e.target.value)} />
      <TurnstileField remountKey={captchaKey} onTokenChange={setCaptchaToken} />
      {showOtp ? (
        <>
          <p className={form.hint}>{copy.otp}</p>
          <OtpInput value={otpCells} onChange={setOtpCells} hasError={Boolean(error)} />
        </>
      ) : null}
      <div className={AUTH_SCREEN.otpCtaWrapClassName}>
        <Button
          type="button"
          className={cn(
            AUTH_SCREEN.otpCtaClassName,
            showOtp && !codeReady ? AUTH_SCREEN.ctaDisabledClassName : AUTH_SCREEN.ctaReadyClassName
          )}
          onClick={() => void (showOtp ? confirmOtp() : sendCode())}
          disabled={showOtp && !codeReady}
        >
          {showOtp ? copy.continue : copy.login}
        </Button>
      </div>
    </>
  );
}
