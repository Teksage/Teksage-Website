"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";
import { OTP_LENGTH, SETTINGS_CHANGE_CONTACT } from "@/lib/constants";
import type { ChangeContactOtpBlockProps } from "@/types/ui/change-contact";

export function ChangeContactOtpBlock({
  otp,
  onOtpChange,
  verifying,
  onConfirm,
  confirmLabel,
  hint,
  onResend,
  resendLabel,
  resending,
}: ChangeContactOtpBlockProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-black/60">{hint}</p>
      <Input
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={OTP_LENGTH}
        value={otp}
        onChange={(e) =>
          onOtpChange(e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))
        }
        placeholder={SETTINGS_CHANGE_CONTACT.otpLabel}
        className="h-12 rounded-xl border-black/15 bg-white text-center text-base font-semibold tracking-widest"
      />
      <Button
        type="button"
        onClick={onConfirm}
        disabled={verifying}
        className="h-11 rounded-full bg-[var(--color-brand-primary)] font-semibold text-white hover:bg-[var(--color-brand-primary)]/90"
      >
        {verifying ? <Loader variant="inline" size="sm" /> : confirmLabel}
      </Button>
      {onResend ? (
        <button
          type="button"
          disabled={resending || verifying}
          onClick={onResend}
          className="text-sm font-semibold text-[var(--color-brand-primary)] disabled:opacity-50"
        >
          {resending ? <Loader variant="inline" size="sm" /> : resendLabel}
        </button>
      ) : null}
    </div>
  );
}
