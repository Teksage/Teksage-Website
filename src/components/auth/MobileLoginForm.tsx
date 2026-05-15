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
import { Loader } from "@/components/common/Loader";
import { cn } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/constants/api";
import {
  DEFAULT_COUNTRY_CALLING_CODE,
  LOGIN_MOBILE_COUNTRY_DIAL_OPTIONS,
  LOGIN_MOBILE_DIGITS_REGEX,
  LOGIN_MOBILE_FORM,
  MOBILE_INPUT_MAX_DIGITS,
} from "@/lib/constants";
import { http } from "@/lib/services/http";
import type { MobileLoginFormProps } from "@/types";

export function MobileLoginForm({ onOtpSent }: MobileLoginFormProps) {
  const [countryCode, setCountryCode] = useState<string>(DEFAULT_COUNTRY_CALLING_CODE);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = LOGIN_MOBILE_DIGITS_REGEX.test(mobile);
  const canSubmit = isValid && !isLoading;

  function handleMobileChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, MOBILE_INPUT_MAX_DIGITS);
    setMobile(digits);
    if (digits && !LOGIN_MOBILE_DIGITS_REGEX.test(digits)) {
      setError(LOGIN_MOBILE_FORM.invalidMobile);
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
      setError(LOGIN_MOBILE_FORM.sendOtpError);
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
              aria-label={LOGIN_MOBILE_FORM.countryCodeAria}
            >
              {LOGIN_MOBILE_COUNTRY_DIAL_OPTIONS.map((o) => (
                <option key={o.dial} value={o.dial}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <Input
            type="tel"
            placeholder={LOGIN_MOBILE_FORM.placeholder}
            value={mobile}
            onChange={(e) => handleMobileChange(e.target.value)}
            maxLength={MOBILE_INPUT_MAX_DIGITS}
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
          "h-14 w-full rounded-full text-lg font-medium",
          canSubmit && "bg-[var(--color-brand-primary)] text-white hover:opacity-90",
          !canSubmit &&
            "cursor-not-allowed bg-[var(--login-email-cta-disabled-bg)] text-[var(--login-email-cta-disabled-text)]"
        )}
      >
        {isLoading ? (
          <Loader variant="spinner" size="sm" className="border-t-white" />
        ) : (
          LOGIN_MOBILE_FORM.submitCta
        )}
      </Button>
    </form>
  );
}
