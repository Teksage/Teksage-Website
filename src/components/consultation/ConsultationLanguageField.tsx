"use client";

import { useI18nConstants } from "@/hooks/useT";
import Image from "next/image";
import { useState } from "react";
import {
  CONSULTATION_ASSETS,
  CONSULTATION_LAYOUT,
  CONSULTATION_SCREEN,
  consultationLanguageLabel,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ConsultationLanguageFieldProps } from "@/types/ui/consultation";

export function ConsultationLanguageField({
  title,
  value,
  options,
  enabled,
  error,
  compact = false,
  onChange,
}: ConsultationLanguageFieldProps) {
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const [open, setOpen] = useState(false);
  const filled = Boolean(value);
  const displayLabel = filled ? consultationLanguageLabel(value) : "";

  function pick(languageId: string) {
    onChange(languageId);
    setOpen(false);
  }

  return (
    <div className="min-w-0">
      <p
        className={
          compact ? CONSULTATION_LAYOUT.langFieldLabelCompact : CONSULTATION_LAYOUT.langFieldLabel
        }
      >
        {title}
      </p>
      <button
        type="button"
        disabled={!enabled}
        onClick={() => {
          if (!enabled) return;
          setOpen(true);
        }}
        className={cn(
          compact ? CONSULTATION_LAYOUT.langFieldCompact : CONSULTATION_LAYOUT.langField,
          filled ? CONSULTATION_LAYOUT.langFieldFilled : CONSULTATION_LAYOUT.langFieldEmpty
        )}
      >
        <span className="flex min-w-0 flex-1 items-center">
          <Image
            src={CONSULTATION_ASSETS.categoryLanguage}
            alt=""
            width={compact ? 16 : 20}
            height={compact ? 16 : 20}
            unoptimized
            className={
              compact ? CONSULTATION_LAYOUT.langIconCompact : CONSULTATION_LAYOUT.langIcon
            }
            aria-hidden
          />
          <span
            className={cn(
              compact ? CONSULTATION_LAYOUT.langFieldTextCompact : CONSULTATION_LAYOUT.langFieldText,
              filled
                ? CONSULTATION_LAYOUT.langFieldValue
                : CONSULTATION_LAYOUT.langFieldPlaceholder
            )}
          >
            {filled ? displayLabel : C.languagePlaceholder}
          </span>
        </span>
        <Image
          src={CONSULTATION_ASSETS.dropDownArrow}
          alt=""
          width={compact ? 14 : 16}
          height={compact ? 14 : 16}
          unoptimized
          className="shrink-0"
          aria-hidden
        />
      </button>
      {error ? (
        <p className="mt-1 text-nav font-medium text-[var(--color-brand-error)]">
          {error} *
        </p>
      ) : null}
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-3 pt-16"
          role="dialog"
          aria-modal
          onClick={() => setOpen(false)}
        >
          <div
            className={CONSULTATION_LAYOUT.langModal}
            onClick={(e) => e.stopPropagation()}
          >
            <p className={CONSULTATION_LAYOUT.langModalTitle}>{title}</p>
            <ul className={CONSULTATION_LAYOUT.langList}>
              {options.map((lang) => (
                <li key={lang.id}>
                  <button
                    type="button"
                    className={CONSULTATION_LAYOUT.langListItem}
                    onClick={() => pick(lang.id)}
                  >
                    {lang.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
