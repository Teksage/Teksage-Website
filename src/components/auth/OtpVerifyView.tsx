"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/auth/OtpInput";
import { Loader } from "@/components/common/Loader";
import { BrandLoginLogo } from "@/components/common/BrandLoginLogo";
import { LoginBackButton } from "@/components/auth/LoginChrome";
import { useAuthStore } from "@/store/auth.store";
import { resendOtp, verifyOtp } from "@/lib/services/auth";
import { cn } from "@/lib/utils";
import {
  DEFAULT_COUNTRY_CALLING_CODE,
  OTP_LENGTH,
  LOGIN_SCREEN,
  OTP_VERIFY_SCREEN,
} from "@/lib/constants";
import { LOGIN_REDIRECT_QUERY } from "@/lib/constants/routes";
import { resolvePostLoginRedirectPath } from "@/lib/login-redirect";
import type { OtpVerifyViewProps } from "@/types";
import { OTP_CONTACT_TYPE_EMAIL, OTP_CONTACT_TYPE_MOBILE } from "@/types";

function emptyOtpCells(): string[] {
  return Array.from({ length: OTP_LENGTH }, () => "");
}

export function OtpVerifyView({
  contact,
  contactType,
  mobileCountryCode,
  onBack,
}: OtpVerifyViewProps) {
  const LS = useI18nConstants(LOGIN_SCREEN);
  const OV = useI18nConstants(OTP_VERIFY_SCREEN);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth } = useAuthStore();
  const [otpCells, setOtpCells] = useState<string[]>(emptyOtpCells);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const otpDigits = otpCells.join("");
  const isComplete = otpDigits.length === OTP_LENGTH;

  async function handleVerify() {
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
      // Fire-and-forget — push registration is non-fatal
      void import("@/lib/services/push-notifications").then(({ initWebPush }) =>
        initWebPush()
      );
      const dest = resolvePostLoginRedirectPath(searchParams.get(LOGIN_REDIRECT_QUERY));
      router.replace(dest);
    } catch {
      setError(OV.invalidOtp);
      setOtpCells(emptyOtpCells());
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendOtp() {
    if (isLoading || isResending) return;
    setIsResending(true);
    setError(null);
    try {
      if (contactType === OTP_CONTACT_TYPE_EMAIL) {
        await resendOtp({ email: contact });
      } else {
        await resendOtp({
          mobile_number: contact,
          country_code: (mobileCountryCode ?? DEFAULT_COUNTRY_CALLING_CODE).replace("+", ""),
        });
      }
      setOtpCells(emptyOtpCells());
    } catch {
      setError(OV.resendError);
    } finally {
      setIsResending(false);
    }
  }

  const maskedContact =
    contactType === OTP_CONTACT_TYPE_MOBILE
      ? contact.replace(/(\d{2})\d{6}(\d{2})/, "$1xxxxxx$2")
      : contact.replace(/^(.{2}).*(@.*)$/, "$1****$2");

  return (
    <div className={LS.shellClassName}>
      <LoginBackButton onNavigateBack={onBack} />

      <div className="relative mx-auto flex w-full max-w-md flex-col px-6 pb-10 pt-16">
        <div className="mb-10 flex flex-col items-center text-center">
          <BrandLoginLogo widthPx={LS.brandLogoWidthPx} className="mb-4" />
          <h1 className="mb-2 text-2xl font-bold text-neutral-900">{OV.heading}</h1>
          <p className="text-sm text-neutral-500">
            {OV.sentBeforeDigits}
            {OTP_LENGTH}
            {OV.sentAfterDigits}{" "}
            <span className="font-semibold text-neutral-800">{maskedContact}</span>
          </p>
        </div>

        <OtpInput
          value={otpCells}
          onChange={(next) => {
            setOtpCells(next);
            if (error) setError(null);
          }}
          hasError={!!error}
          className="mb-2"
        />

        {error && (
          <p className="mb-4 mt-2 text-center text-sm font-semibold text-[var(--color-brand-error)]">
            {error}
          </p>
        )}

        <Button
          onClick={handleVerify}
          disabled={!isComplete || isLoading}
          className={cn(
            "mt-6 h-14 w-full rounded-full text-lg font-medium",
            isComplete && "bg-[var(--color-brand-primary)] text-white hover:opacity-90",
            !isComplete &&
              "cursor-not-allowed bg-[var(--login-email-cta-disabled-bg)] text-[var(--login-email-cta-disabled-text)]"
          )}
        >
          {isLoading ? (
            <Loader variant="inline" size="sm" />
          ) : (
            OV.verifyCta
          )}
        </Button>

        <button
          type="button"
          className="mt-6 text-center text-sm text-neutral-500 transition-colors hover:text-[var(--color-brand-primary)]"
          onClick={handleResendOtp}
          disabled={isLoading || isResending}
        >
          {isResending ? (
            <Loader variant="inline" size="sm" />
          ) : (
            <>
              {OV.resendQuestion}{" "}
              <span className="font-semibold text-[var(--color-brand-primary)]">
                {OV.resendCta}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
