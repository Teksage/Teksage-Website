"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";
import { PROFILE_DETAILS } from "@/lib/constants/profile-details";
import { OTP_LENGTH } from "@/lib/constants";
import {
  sendAuthenticatedOtp,
  verifyAuthenticatedOtp,
} from "@/lib/services/profile-verify";
import { cn } from "@/lib/utils";
import type { ProfilePhoneRowProps } from "@/types";

export function ProfilePhoneRow({
  countryCode,
  mobile,
  onMobileChange,
  isMobileVerified,
  isEditing,
  onVerificationSuccess,
}: ProfilePhoneRowProps) {
  const PD = useI18nConstants(PROFILE_DETAILS);
  const [otpPhase, setOtpPhase] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendBusy, setSendBusy] = useState(false);
  const [verifyBusy, setVerifyBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const cc = (countryCode || "91").replace(/\D/g, "") || "91";
  const digits = mobile.replace(/\D/g, "");

  async function handleSendOtp() {
    setFeedback(null);
    if (digits.length < 10) {
      setFeedback("Enter a valid 10-digit mobile number to verify.");
      return;
    }
    setSendBusy(true);
    try {
      await sendAuthenticatedOtp({
        mobile_number: digits,
        country_code: cc,
      });
      setOtpPhase(true);
      setOtp("");
    } catch (e) {
      setFeedback(e instanceof Error ? e.message : "Could not send OTP.");
    } finally {
      setSendBusy(false);
    }
  }

  async function handleConfirmOtp() {
    setFeedback(null);
    const clean = otp.replace(/\D/g, "");
    if (clean.length !== OTP_LENGTH) {
      setFeedback(`Enter the ${OTP_LENGTH}-digit OTP.`);
      return;
    }
    setVerifyBusy(true);
    try {
      const res = await verifyAuthenticatedOtp(
        {
          mobile_number: digits,
          country_code: cc,
          otp: clean,
        },
        { update: false }
      );
      if (res.error) {
        setFeedback(res.error);
        return;
      }
      setOtpPhase(false);
      setOtp("");
      await onVerificationSuccess?.();
    } catch (e) {
      setFeedback(e instanceof Error ? e.message : "Verification failed.");
    } finally {
      setVerifyBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-[var(--color-brand-black)]">
        {PD.phone}
      </span>
      <div
        className={cn(
          "flex h-12 items-stretch overflow-hidden rounded-xl border border-black/15 bg-neutral-100",
          "transition-colors focus-within:border-[var(--color-brand-primary)]",
          !isEditing && "opacity-90"
        )}
      >
        <div
          className={cn(
            "flex w-[4.5rem] shrink-0 items-center justify-center border-r border-black/15",
            "text-sm font-semibold text-neutral-800"
          )}
        >
          +{cc}
        </div>
        <Input
          type="tel"
          value={mobile}
          onChange={(e) =>
            onMobileChange(e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          disabled={!isEditing}
          placeholder="Mobile"
          className={cn(
            "h-12 min-w-0 flex-1 rounded-none border-0 bg-transparent px-4 text-sm font-medium shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            !isEditing && "cursor-not-allowed"
          )}
        />
        {!isMobileVerified ? (
          <>
            <div className="w-px shrink-0 self-stretch bg-black/15" aria-hidden />
            <button
              type="button"
              disabled={sendBusy}
              className={cn(
                "flex shrink-0 items-center gap-1.5 px-3.5 text-sm font-semibold text-[var(--color-brand-primary)]",
                "hover:bg-black/[0.04] disabled:opacity-60"
              )}
              onClick={handleSendOtp}
            >
              {sendBusy ? (
                <Loader variant="inline" size="sm" />
              ) : null}
              {PD.verify}
            </button>
          </>
        ) : null}
      </div>

      {!isMobileVerified && otpPhase ? (
        <div className="flex flex-col gap-2 rounded-xl border border-black/15 bg-neutral-50 px-3 py-3">
          <p className="text-xs font-medium text-neutral-700">{PD.otpHint}</p>
          <Input
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={OTP_LENGTH}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))
            }
            placeholder={PD.otpLabel}
            disabled={verifyBusy}
            className={cn(
              "h-11 rounded-xl border border-black/15 bg-white px-3 text-center text-base font-semibold tracking-widest",
              "focus-visible:border-[var(--color-brand-primary)] focus-visible:ring-0"
            )}
          />
          <Button
            type="button"
            disabled={verifyBusy}
            onClick={handleConfirmOtp}
            className="h-11 rounded-full bg-[var(--color-brand-primary)] font-semibold text-white hover:bg-[var(--color-brand-primary)]/90"
          >
            {verifyBusy ? (
              <Loader variant="inline" size="sm" />
            ) : (
              PD.confirmOtp
            )}
          </Button>
          <p className="text-xs text-neutral-500">{PD.resentPrompt}</p>
        </div>
      ) : null}

      {feedback ? (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">{feedback}</p>
      ) : null}
    </div>
  );
}

