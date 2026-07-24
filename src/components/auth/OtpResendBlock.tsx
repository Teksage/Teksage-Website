"use client";

import { Loader } from "@/components/common/Loader";
import { TurnstileField } from "@/components/auth/TurnstileField";
import { cn } from "@/lib/utils";
import type { OtpResendBlockProps } from "@/types";

export function OtpResendBlock({
  canResend,
  isResending,
  resendSecondsLeft,
  showCaptcha,
  turnstileKey,
  onTokenChange,
  onResend,
  labels,
}: OtpResendBlockProps) {
  return (
    <>
      {showCaptcha && resendSecondsLeft <= 0 ? (
        <div className="mt-4">
          <TurnstileField remountKey={turnstileKey} onTokenChange={onTokenChange} />
        </div>
      ) : null}
      <button
        type="button"
        className={cn(
          "mt-6 text-center text-sm text-neutral-500 transition-colors",
          canResend
            ? "hover:text-[var(--color-brand-primary)]"
            : "cursor-not-allowed opacity-60"
        )}
        onClick={onResend}
        disabled={!canResend}
      >
        {isResending ? (
          <Loader variant="inline" size="sm" />
        ) : resendSecondsLeft > 0 ? (
          <>
            {labels.resendWaitPrefix}
            {resendSecondsLeft}
            {labels.resendWaitSuffix}
          </>
        ) : (
          <>
            {labels.resendQuestion}{" "}
            <span className="font-semibold text-[var(--color-brand-primary)]">
              {labels.resendCta}
            </span>
          </>
        )}
      </button>
    </>
  );
}
