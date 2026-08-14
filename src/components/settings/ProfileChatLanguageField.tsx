"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  CHAT_LANGUAGE_OPTIONS,
  PROFILE_DETAILS,
  PROFILE_FIELD_UI as FU,
} from "@/lib/constants/profile-details";
import { cn } from "@/lib/utils";

type ProfileChatLanguageFieldProps = {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  hasError?: boolean;
  errorMessage?: string;
};

export function ProfileChatLanguageField({
  value,
  onChange,
  isEditing,
  hasError,
  errorMessage,
}: ProfileChatLanguageFieldProps) {
  const PD = useI18nConstants(PROFILE_DETAILS);

  return (
    <div className="flex flex-col gap-1.5">
      <span className={FU.label}>
        {PD.chatLanguage}
        <span className={FU.labelRequired}>*</span>
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={!isEditing}
          className={cn(
            FU.select,
            "text-[var(--color-brand-black)]",
            hasError && FU.shellError,
            !isEditing && "cursor-not-allowed opacity-90"
          )}
        >
          {CHAT_LANGUAGE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-black/40"
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
        <p className={FU.errorText}>{errorMessage}</p>
      ) : null}
    </div>
  );
}
