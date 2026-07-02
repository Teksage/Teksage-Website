"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { PROFILE_DETAILS } from "@/lib/constants/profile-details";
import {
  PROFILE_REFERRAL_UI,
  REFERRAL_SOURCE_OPTIONS,
} from "@/lib/constants/profile-referral";
import { cn } from "@/lib/utils";

type ProfileReferralSourceFieldProps = {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  hasError?: boolean;
  errorMessage?: string;
};

export function ProfileReferralSourceField({
  value,
  onChange,
  isEditing,
  hasError,
  errorMessage,
}: ProfileReferralSourceFieldProps) {
  const PD = useI18nConstants(PROFILE_DETAILS);
  const PR = useI18nConstants(PROFILE_REFERRAL_UI);
  const { t } = useT();

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-[var(--color-brand-black)]">
        {PD.referralSource}
        <span className="text-[var(--color-brand-error)]">*</span>
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={!isEditing}
          className={cn(
            "h-12 w-full appearance-none rounded-xl border bg-neutral-100 px-4 pr-11 text-sm font-medium",
            "text-[var(--color-brand-black)] outline-none transition-colors",
            "focus:border-[var(--color-brand-primary)]",
            hasError
              ? "border-[var(--color-brand-error)]"
              : "border-black/15",
            !isEditing && "cursor-not-allowed opacity-90"
          )}
        >
          <option value="">{PR.placeholder}</option>
          {REFERRAL_SOURCE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {t(opt)}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-black/70"
        >
          <path
            d="M5.5 7.5 10 12l4.5-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {hasError && errorMessage ? (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
