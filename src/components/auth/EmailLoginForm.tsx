"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { cn } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { http } from "@/lib/services/http";

const EMAIL_REGEX = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

interface EmailLoginFormProps {
  onOtpSent: (email: string) => void;
}

export function EmailLoginForm({ onOtpSent }: EmailLoginFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = EMAIL_REGEX.test(email.trim());
  const canSubmit = isValid && !isLoading;

  function handleChange(value: string) {
    const lower = value.toLowerCase().replace(/\s/g, "");
    setEmail(lower);
    if (lower && !EMAIL_REGEX.test(lower)) {
      setError("Enter a valid email address");
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
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <Input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => handleChange(e.target.value)}
          autoComplete="email"
          maxLength={50}
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
