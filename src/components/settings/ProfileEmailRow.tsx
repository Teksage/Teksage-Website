"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";
import { ProfileContactActionButton } from "@/components/settings/ProfileContactActionButton";
import { PROFILE_DETAILS, PROFILE_FIELD_UI as FU } from "@/lib/constants/profile-details";
import { PROFILE_FORM_VALIDATION } from "@/lib/constants/profile-form-validation";
import { buildChangeContactPath } from "@/lib/constants/settings-change-contact";
import { OTP_LENGTH } from "@/lib/constants";
import { LOGIN_EMAIL_REGEX } from "@/lib/constants/validation-patterns";
import {
  sendAuthenticatedOtp,
  verifyAuthenticatedOtp,
} from "@/lib/services/profile-verify";
import { cn } from "@/lib/utils";
import type { ProfileEmailRowProps } from "@/types";

export function ProfileEmailRow({
  email,
  onEmailChange,
  isEmailVerified,
  isEditing,
  onVerificationSuccess,
  hasError,
  errorMessage,
  required = true,
}: ProfileEmailRowProps) {
  const PD = useI18nConstants(PROFILE_DETAILS);
  const router = useRouter();
  const [otpPhase, setOtpPhase] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendBusy, setSendBusy] = useState(false);
  const [verifyBusy, setVerifyBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const cleanEmail = email.trim().toLowerCase();
  const canEdit = isEditing && !isEmailVerified;
  const showChange = Boolean(isEmailVerified) && isEditing;

  async function handleSendOtp() {
    setFeedback(null);
    if (!LOGIN_EMAIL_REGEX.test(cleanEmail)) {
      setFeedback(PROFILE_FORM_VALIDATION.emailInvalid);
      return;
    }
    setSendBusy(true);
    try {
      await sendAuthenticatedOtp({ email: cleanEmail });
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
    const cleanOtp = otp.replace(/\D/g, "");
    if (cleanOtp.length !== OTP_LENGTH) {
      setFeedback(`Enter the ${OTP_LENGTH}-digit OTP.`);
      return;
    }
    setVerifyBusy(true);
    try {
      const res = await verifyAuthenticatedOtp(
        { email: cleanEmail, otp: cleanOtp },
        { update: true }
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
      <span className={FU.label}>
        {PD.email}
        {required ? <span className={FU.labelRequired}>*</span> : null}
      </span>
      <div
        className={cn(
          FU.shell,
          "transition-colors focus-within:border-[var(--color-brand-primary)] focus-within:bg-white",
          hasError && FU.shellError,
          !canEdit && !showChange && "opacity-90"
        )}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          disabled={!canEdit}
          placeholder="Email"
          className={cn(
            "h-12 min-w-0 flex-1 rounded-none border-0 bg-transparent px-4 text-sm font-medium shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            !canEdit && "cursor-not-allowed"
          )}
        />
        {canEdit ? (
          <ProfileContactActionButton
            label={PD.verify}
            onClick={handleSendOtp}
            disabled={sendBusy}
            busy={sendBusy}
            busySlot={<Loader variant="inline" size="sm" />}
          />
        ) : null}
        {showChange ? (
          <ProfileContactActionButton
            label={PD.change}
            onClick={() => router.push(buildChangeContactPath("email"))}
          />
        ) : null}
      </div>

      {canEdit && otpPhase ? (
        <div className="flex flex-col gap-2 rounded-xl border border-black/15 bg-neutral-50 px-3 py-3">
          <p className="text-xs font-medium text-neutral-700">{PD.otpHintEmail}</p>
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

      {hasError && errorMessage ? (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">
          {errorMessage}
        </p>
      ) : null}
      {feedback ? (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">{feedback}</p>
      ) : null}
    </div>
  );
}
