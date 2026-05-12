"use client";

/**
 * Mobile number login — not used while the web login matches the email-only
 * Flutter `LoginPageMobile` reference. Kept for a future tabbed login.
 *
 * To re-enable: import in `src/app/(auth)/login/page.tsx` and render from tab state.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { cn } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { http } from "@/lib/services/http";

interface MobileLoginFormProps {
  onOtpSent: (mobile: string) => void;
}

export function MobileLoginForm({ onOtpSent }: MobileLoginFormProps) {
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = /^[1-9]\d{9}$/.test(mobile);
  const canSubmit = isValid && !isLoading;

  function handleMobileChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setMobile(digits);
    if (digits && !/^[1-9]\d{9}$/.test(digits)) {
      setError("Enter a valid 10-digit mobile number");
    } else {
      setError(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setIsLoading(true);
    setError(null);
    try {
      await http.post(API_ENDPOINTS.sendOtp, {
        mobile_number: mobile,
        country_code: countryCode.replace("+", ""),
      });
      onOtpSent(mobile);
    } catch {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2">
          <div
            className={cn(
              "flex h-14 min-w-[72px] shrink-0 items-center justify-center rounded-[14px] border border-neutral-300 bg-white px-2 text-base font-bold"
            )}
          >
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full border-none bg-transparent text-sm font-bold outline-none"
              aria-label="Country code"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
            </select>
          </div>
          <Input
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => handleMobileChange(e.target.value)}
            maxLength={10}
            inputMode="numeric"
            className={cn(
              "h-14 flex-1 rounded-[14px] border-neutral-300 bg-white px-4 text-base font-semibold shadow-sm ring-1 ring-inset ring-neutral-300 focus-visible:ring-0",
              error
                ? "border-[var(--color-brand-error)] focus-visible:border-[var(--color-brand-error)]"
                : "focus-visible:border-[var(--color-brand-primary)]"
            )}
          />
        </div>
        {error && (
          <p className="text-center text-sm font-semibold text-[var(--color-brand-error)]">
            {error}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!canSubmit}
        className={cn(
          "h-14 w-full rounded-full text-lg font-medium transition-all",
          canSubmit
            ? "bg-[#10B100] text-white hover:bg-[#0ea000]"
            : "cursor-not-allowed bg-[#E4F0E2] text-[#4a9c45]"
        )}
      >
        {isLoading ? (
          <LoadingSpinner size="sm" className="border-t-white" />
        ) : (
          "Continue"
        )}
      </Button>
    </form>
  );
}
