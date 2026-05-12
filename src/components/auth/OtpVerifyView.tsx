"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/auth/OtpInput";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { BrandLoginLogo } from "@/components/common/BrandLoginLogo";
import { LoginBackButton } from "@/components/auth/LoginChrome";
import { useAuthStore } from "@/store/auth.store";
import { verifyOtp } from "@/lib/services/auth";
import { cn } from "@/lib/utils";
import { OTP_LENGTH } from "@/lib/constants";

function emptyOtpCells(): string[] {
  return Array.from({ length: OTP_LENGTH }, () => "");
}

interface OtpVerifyViewProps {
  contact: string;
  contactType: "mobile" | "email";
  onBack: () => void;
}

export function OtpVerifyView({ contact, contactType, onBack }: OtpVerifyViewProps) {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [otpCells, setOtpCells] = useState<string[]>(emptyOtpCells);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const otpDigits = otpCells.join("");
  const isComplete = otpDigits.length === OTP_LENGTH;

  async function handleVerify() {
    if (!isComplete || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await verifyOtp(
        contactType === "email"
          ? { email: contact, otp: otpDigits }
          : { mobile: contact, otp: otpDigits }
      );
      setAuth(response.user, response.token);
      router.push("/home");
    } catch {
      setError("Invalid OTP. Please try again.");
      setOtpCells(emptyOtpCells());
    } finally {
      setIsLoading(false);
    }
  }

  const maskedContact =
    contactType === "mobile"
      ? contact.replace(/(\d{2})\d{6}(\d{2})/, "$1xxxxxx$2")
      : contact.replace(/^(.{2}).*(@.*)$/, "$1****$2");

  return (
    <div
      className={
        "relative flex min-h-dvh flex-col " +
        "bg-[linear-gradient(180deg,#C2EDC0_0%,#eef8ed_42%,#ffffff_100%)]"
      }
    >
      <LoginBackButton onNavigateBack={onBack} />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-10 pt-16">
        <div className="mb-10 flex flex-col items-center text-center">
          <BrandLoginLogo widthPx={176} className="mb-4" />
          <h1 className="mb-2 text-2xl font-bold text-neutral-900">Enter OTP</h1>
          <p className="text-sm text-neutral-500">
            We sent a 6-digit code to{" "}
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
            "mt-6 h-14 w-full rounded-full text-lg font-medium transition-all",
            isComplete
              ? "bg-[#10B100] text-white hover:bg-[#0ea000]"
              : "cursor-not-allowed bg-[#E4F0E2] text-[#4a9c45]"
          )}
        >
          {isLoading ? (
            <LoadingSpinner size="sm" className="border-t-white" />
          ) : (
            "Verify & Login"
          )}
        </Button>

        <button
          type="button"
          className="mt-6 text-center text-sm text-neutral-500 transition-colors hover:text-[var(--color-brand-primary)]"
          onClick={onBack}
        >
          Didn&apos;t receive OTP?{" "}
          <span className="font-semibold text-[var(--color-brand-primary)]">Resend</span>
        </button>
      </div>
    </div>
  );
}
