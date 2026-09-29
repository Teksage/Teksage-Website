"use client";

import { useI18nConstants } from "@/hooks/useT";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/auth/OtpInput";
import { OtpResendBlock } from "@/components/auth/OtpResendBlock";
import { AuthScreenShell } from "@/components/auth/AuthScreenShell";
import { Loader } from "@/components/common/Loader";
import { cn } from "@/lib/utils";
import {
  AUTH_SCREEN,
  OTP_LENGTH,
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
    <AuthScreenShell onBack={onBack}>
      <div className="flex flex-col items-center text-center">
        <h1 className={cn(AUTH_SCREEN.headingClassName, "mb-2")}>{OV.heading}</h1>
        <p className={AUTH_SCREEN.subtextClassName}>
          {OV.sentBeforeDigits}
          {OTP_LENGTH}
          {OV.sentAfterDigits}{" "}
          <span className={AUTH_SCREEN.contactEmphasisClassName}>{maskedContact}</span>
        </p>
      </div>

      <OtpInput
        value={flow.otpCells}
        onChange={(next) => {
          flow.setOtpCells(next);
          if (flow.error) flow.setError(null);
        }}
        hasError={!!flow.error}
      />

      {flow.error ? <p className={AUTH_SCREEN.errorClassName}>{flow.error}</p> : null}

      <div className={AUTH_SCREEN.otpCtaWrapClassName}>
        <Button
          onClick={() => void flow.handleVerify(isComplete)}
          disabled={!isComplete || flow.isLoading}
          className={cn(
            AUTH_SCREEN.otpCtaClassName,
            isComplete ? AUTH_SCREEN.ctaReadyClassName : AUTH_SCREEN.ctaDisabledClassName
          )}
        >
          {flow.isLoading ? <Loader variant="onBrand" size="sm" /> : OV.verifyCta}
        </Button>
      </div>

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
    </AuthScreenShell>
  );
}
