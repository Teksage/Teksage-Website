"use client";

import { useI18nConstants } from "@/hooks/useT";
/** Mobile number login — tab on `/login` (Flutter `LoginPageMobile`). */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";
import { CountryDialPicker } from "@/components/common/CountryDialPicker";
import { TurnstileField } from "@/components/auth/TurnstileField";
import { cn } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/constants/api";
import {
  DEFAULT_COUNTRY_CALLING_CODE,
  LOGIN_MOBILE_FORM,
  TURNSTILE,
} from "@/lib/constants";
import { isTurnstileConfigured } from "@/lib/env";
import { fetchCountries, findCountryByDial } from "@/lib/services/countries";
import {
  isValidNationalMobile,
  nationalMobileMaxLength,
} from "@/lib/mobile-validation";
import { http } from "@/lib/services/http";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import type { MobileLoginFormProps } from "@/types";

export function MobileLoginForm({ onOtpSent }: MobileLoginFormProps) {
  const LOG = useI18nConstants(LOGIN_MOBILE_FORM);
  const [countryCode, setCountryCode] = useState<string>(
    DEFAULT_COUNTRY_CALLING_CODE
  );
  const [mobileLength, setMobileLength] = useState(10);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);

  useEffect(() => {
    void fetchCountries().then(() => {
      const matched = findCountryByDial(countryCode);
      if (matched?.mobile_number_length) {
        setMobileLength(matched.mobile_number_length);
      }
    });
  }, [countryCode]);

  const captchaReady = !isTurnstileConfigured() || Boolean(turnstileToken);
  const isValid = isValidNationalMobile(mobile, mobileLength);
  const canSubmit = isValid && !isLoading && captchaReady;
  const maxDigits = nationalMobileMaxLength(mobileLength);

  function handleMobileChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, maxDigits);
    setMobile(digits);
    if (digits && !isValidNationalMobile(digits, mobileLength)) {
      setError(LOGIN_MOBILE_FORM.invalidMobile);
    } else {
      setError(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    if (isTurnstileConfigured() && !turnstileToken) {
      setError(LOGIN_MOBILE_FORM.captchaRequired);
      showErrorAppSnackBar(LOGIN_MOBILE_FORM.captchaRequired);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await http.post(API_ENDPOINTS.sendOtp, {
        mobile_number: mobile,
        country_code: countryCode.replace("+", ""),
        ...(turnstileToken
          ? { [TURNSTILE.tokenField]: turnstileToken }
          : {}),
      });
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.otpSent);
      onOtpSent(mobile, countryCode);
    } catch {
      setError(LOGIN_MOBILE_FORM.sendOtpError);
      showErrorAppSnackBar(LOGIN_MOBILE_FORM.sendOtpError);
      setTurnstileToken(null);
      setTurnstileKey((k) => k + 1);
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
              "flex h-14 min-w-[88px] shrink-0 items-center justify-center rounded-[14px] border border-neutral-300 bg-white px-2 text-base font-bold"
            )}
          >
            <CountryDialPicker
              valueDial={countryCode}
              ariaLabel={LOGIN_MOBILE_FORM.countryCodeAria}
              onSelect={(country) => {
                setCountryCode(country.dial_code);
                setMobileLength(country.mobile_number_length);
                setMobile("");
                setError(null);
              }}
            />
          </div>
          <Input
            type="tel"
            placeholder={LOGIN_MOBILE_FORM.placeholder}
            value={mobile}
            onChange={(e) => handleMobileChange(e.target.value)}
            maxLength={maxDigits}
            inputMode="numeric"
            className={cn(
              "h-14 flex-1 rounded-[14px] border-neutral-300 bg-white px-4 text-base font-semibold shadow-sm ring-1 ring-inset ring-neutral-300 focus-visible:ring-0",
              error
                ? "border-[var(--color-brand-error)] focus-visible:border-[var(--color-brand-error)]"
                : "focus-visible:border-[var(--color-brand-primary)]"
            )}
          />
        </div>
        {error ? (
          <p className="text-sm font-medium text-[var(--color-brand-error)]">
            {error}
          </p>
        ) : null}
      </div>

      <TurnstileField
        remountKey={turnstileKey}
        onTokenChange={setTurnstileToken}
      />

      <Button
        type="submit"
        disabled={!canSubmit}
        className="h-14 w-full rounded-full bg-[var(--color-brand-primary)] text-base font-bold text-white hover:bg-[var(--color-brand-primary)]/90 disabled:opacity-50"
      >
        {isLoading ? <Loader variant="inline" size="sm" /> : LOG.submitCta}
      </Button>
    </form>
  );
}
