"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";
import { OTP_LENGTH } from "@/lib/constants";
import { PROFILE_DETAILS } from "@/lib/constants/profile-details";
import { useI18nConstants } from "@/hooks/useT";
import { cn } from "@/lib/utils";
import type { ProfilePhoneOtpPanelProps } from "@/types/ui/settings";

export function ProfilePhoneOtpPanel({
  otp,
  onOtpChange,
  verifyBusy,
  onConfirm,
}: ProfilePhoneOtpPanelProps) {
  const PD = useI18nConstants(PROFILE_DETAILS);
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-black/15 bg-neutral-50 px-3 py-3">
      <p className="text-xs font-medium text-neutral-700">{PD.otpHint}</p>
      <Input
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={OTP_LENGTH}
        value={otp}
        onChange={(e) =>
          onOtpChange(e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))
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
        onClick={onConfirm}
        className="h-11 rounded-full bg-[var(--color-brand-primary)] font-semibold text-white hover:bg-[var(--color-brand-primary)]/90"
      >
        {verifyBusy ? <Loader variant="inline" size="sm" /> : PD.confirmOtp}
      </Button>
      <p className="text-xs text-neutral-500">{PD.resentPrompt}</p>
    </div>
  );
}
