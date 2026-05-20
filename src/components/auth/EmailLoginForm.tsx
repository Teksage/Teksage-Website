"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";
import { cn } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { LOGIN_EMAIL_FORM, LOGIN_EMAIL_REGEX } from "@/lib/constants";
import { http } from "@/lib/services/http";
import type { EmailLoginFormProps } from "@/types";

export function EmailLoginForm({ onOtpSent }: EmailLoginFormProps) {
  const LOG = useI18nConstants(LOGIN_EMAIL_FORM);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = LOGIN_EMAIL_REGEX.test(email.trim());
  const canSubmit = isValid && !isLoading;

  function handleChange(value: string) {
    const lower = value.toLowerCase().replace(/\s/g, "");
    setEmail(lower);
    if (lower && !LOGIN_EMAIL_REGEX.test(lower)) {
      setError(LOGIN_EMAIL_FORM.invalidEmail);
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
      await http.post(API_ENDPOINTS.sendOtp, { email: email.trim() });
      onOtpSent(email.trim());
    } catch {
      setError(LOGIN_EMAIL_FORM.sendOtpError);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <Input
          type="email"
          placeholder={LOGIN_EMAIL_FORM.placeholder}
          value={email}
          onChange={(e) => handleChange(e.target.value)}
          autoComplete="email"
          maxLength={LOGIN_EMAIL_FORM.maxLength}
          className={cn(
            "h-14 rounded-[14px] border-0 bg-white px-4 text-base font-semibold shadow-sm",
            "ring-1 ring-inset ring-neutral-300 focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]",
            error &&
              "ring-[var(--color-brand-error)] focus-visible:ring-[var(--color-brand-error)]"
          )}
        />
        {error && (
          <p className="text-sm font-semibold text-center text-[var(--color-brand-error)]">
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
          !canSubmit && "cursor-not-allowed bg-[var(--login-email-cta-disabled-bg)] text-[var(--login-email-cta-disabled-text)]"
        )}
      >
        {isLoading ? (
          <Loader variant="spinner" size="sm" className="border-t-white" />
        ) : (
          LOGIN_EMAIL_FORM.submitCta
        )}
      </Button>
    </form>
  );
}
