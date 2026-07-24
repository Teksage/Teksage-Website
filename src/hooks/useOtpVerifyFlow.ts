"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { resendOtp, verifyOtp } from "@/lib/services/auth";
import {
  DEFAULT_COUNTRY_CALLING_CODE,
  OTP_RESEND_COOLDOWN_SECONDS,
  OTP_VERIFY_SCREEN,
} from "@/lib/constants";
import { isTurnstileConfigured } from "@/lib/env";
import { LOGIN_REDIRECT_QUERY } from "@/lib/constants/routes";
import { resolvePostLoginRedirectPath } from "@/lib/login-redirect";
import { emptyOtpCells } from "@/lib/otp-verify-helpers";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import {
  OTP_CONTACT_TYPE_EMAIL,
  type OtpContactType,
} from "@/types";

export function useOtpVerifyFlow(args: {
  contact: string;
  contactType: OtpContactType;
  mobileCountryCode?: string;
  copy: typeof OTP_VERIFY_SCREEN;
}) {
  const { contact, contactType, mobileCountryCode, copy } = args;
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();
  const [otpCells, setOtpCells] = useState<string[]>(emptyOtpCells);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [resendSecondsLeft, setResendSecondsLeft] = useState(
    OTP_RESEND_COOLDOWN_SECONDS
  );

  const otpDigits = otpCells.join("");
  const captchaReady = !isTurnstileConfigured() || Boolean(turnstileToken);
  const canResend =
    resendSecondsLeft <= 0 && !isLoading && !isResending && captchaReady;

  useEffect(() => {
    if (resendSecondsLeft <= 0) return;
    const id = window.setTimeout(
      () => setResendSecondsLeft((s) => s - 1),
      1000
    );
    return () => window.clearTimeout(id);
  }, [resendSecondsLeft]);

  async function handleVerify(isComplete: boolean) {
    if (!isComplete || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await verifyOtp(
        contactType === OTP_CONTACT_TYPE_EMAIL
          ? { email: contact, otp: otpDigits }
          : {
              mobile: contact,
              otp: otpDigits,
              countryCode: mobileCountryCode ?? DEFAULT_COUNTRY_CALLING_CODE,
            }
      );
      setAuth(response.user, response.token);
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.otpVerified);
      void import("@/lib/services/push-notifications").then(({ initWebPush }) =>
        initWebPush()
      );
      router.replace(
        resolvePostLoginRedirectPath(searchParams.get(LOGIN_REDIRECT_QUERY), {
          profileUpdated: response.user.isProfileUpdated,
        })
      );
    } catch {
      setError(copy.invalidOtp);
      showErrorAppSnackBar(copy.invalidOtp);
      setOtpCells(emptyOtpCells());
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendOtp() {
    if (!canResend) return;
    if (isTurnstileConfigured() && !turnstileToken) {
      setError(copy.captchaRequired);
      showErrorAppSnackBar(copy.captchaRequired);
      return;
    }
    setIsResending(true);
    setError(null);
    try {
      if (contactType === OTP_CONTACT_TYPE_EMAIL) {
        await resendOtp({
          email: contact,
          ...(turnstileToken ? { cf_turnstile_token: turnstileToken } : {}),
        });
      } else {
        await resendOtp({
          mobile_number: contact,
          country_code: (
            mobileCountryCode ?? DEFAULT_COUNTRY_CALLING_CODE
          ).replace("+", ""),
          ...(turnstileToken ? { cf_turnstile_token: turnstileToken } : {}),
        });
      }
      setOtpCells(emptyOtpCells());
      setResendSecondsLeft(OTP_RESEND_COOLDOWN_SECONDS);
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.otpSent);
    } catch {
      setError(copy.resendError);
      showErrorAppSnackBar(copy.resendError);
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
    } finally {
      setIsResending(false);
    }
  }

  return {
    otpCells,
    setOtpCells,
    error,
    setError,
    isLoading,
    isResending,
    turnstileKey,
    setTurnstileToken,
    resendSecondsLeft,
    canResend,
    handleVerify,
    handleResendOtp,
  };
}
