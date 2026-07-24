"use client";

import { useI18nConstants } from "@/hooks/useT";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/auth/OtpInput";
import { OtpResendBlock } from "@/components/auth/OtpResendBlock";
import { Loader } from "@/components/common/Loader";
import { BrandLoginLogo } from "@/components/common/BrandLoginLogo";
import { LoginBackButton } from "@/components/auth/LoginChrome";
import { cn } from "@/lib/utils";
import {
  OTP_LENGTH,
  LOGIN_SCREEN,
  OTP_VERIFY_SCREEN,
} from "@/lib/constants";
import { isTurnstileConfigured } from "@/lib/env";
import { useOtpVerifyFlow } from "@/hooks/useOtpVerifyFlow";
import { maskNationalMobile } from "@/lib/otp-verify-helpers";
import type { OtpVerifyViewProps } from "@/types";
import { OTP_CONTACT_TYPE_MOBILE } from "@/types";

export function OtpVerifyView({
  contact,
  contactType,
  mobileCountryCode,
  onBack,
}: OtpVerifyViewProps) {
  const LS = useI18nConstants(LOGIN_SCREEN);
  const OV = useI18nConstants(OTP_VERIFY_SCREEN);
  const flow = useOtpVerifyFlow({
    contact,
    contactType,
    mobileCountryCode,
    copy: OTP_VERIFY_SCREEN,
  });
  const isComplete = flow.otpCells.join("").length === OTP_LENGTH;
  const maskedContact =
    contactType === OTP_CONTACT_TYPE_MOBILE
      ? maskNationalMobile(contact)
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
          value={flow.otpCells}
          onChange={(next) => {
            flow.setOtpCells(next);
            if (flow.error) flow.setError(null);
          }}
          hasError={!!flow.error}
          className="mb-2"
        />

        {flow.error ? (
          <p className="mb-4 mt-2 text-center text-sm font-semibold text-[var(--color-brand-error)]">
            {flow.error}
          </p>
        ) : null}

        <Button
          onClick={() => void flow.handleVerify(isComplete)}
          disabled={!isComplete || flow.isLoading}
          className={cn(
            "mt-6 h-14 w-full rounded-full text-lg font-medium",
            isComplete && "bg-[var(--color-brand-primary)] text-white hover:opacity-90",
            !isComplete &&
              "cursor-not-allowed bg-[var(--login-email-cta-disabled-bg)] text-[var(--login-email-cta-disabled-text)]"
          )}
        >
          {flow.isLoading ? <Loader variant="inline" size="sm" /> : OV.verifyCta}
        </Button>

        <OtpResendBlock
          canResend={flow.canResend}
          isResending={flow.isResending}
          resendSecondsLeft={flow.resendSecondsLeft}
          showCaptcha={isTurnstileConfigured()}
          turnstileKey={flow.turnstileKey}
          onTokenChange={flow.setTurnstileToken}
          onResend={() => void flow.handleResendOtp()}
          labels={{
            resendWaitPrefix: OV.resendWaitPrefix,
            resendWaitSuffix: OV.resendWaitSuffix,
            resendQuestion: OV.resendQuestion,
            resendCta: OV.resendCta,
          }}
        />
      </div>
    </div>
  );
}
