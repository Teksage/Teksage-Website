"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Label } from "@/components/ui/label";
import { ProfileBirthDateCalendar } from "@/components/settings/ProfileBirthDateCalendar";
import { useI18nConstants } from "@/hooks/useT";
import {
  PROFILE_DATE_PICKER,
  PROFILE_DATE_PICKER_LAYOUT,
} from "@/lib/constants/profile-date-picker";
import {
  formatProfileDobForDisplay,
  formatProfileDobToIso,
  parseProfileDobIsoToDate,
} from "@/lib/profile-birth-date-format";
import { startOfDay } from "@/lib/profile-birth-calendar";
import { cn } from "@/lib/utils";
import type { ProfileDateOfBirthFieldProps } from "@/types";

export function ProfileDateOfBirthField({
  label,
  value = "",
  onChange,
  isEditable = true,
  required = false,
  hasError = false,
  errorMessage,
  className,
  onBlurCommit,
  onFocusAttempt,
}: ProfileDateOfBirthFieldProps) {
  const P = useI18nConstants(PROFILE_DATE_PICKER);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const today = startOfDay(new Date());
  const selected = parseProfileDobIsoToDate(value) ?? today;
  const [focusedMonth, setFocusedMonth] = useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1),
  );

  useEffect(() => setMounted(true), []);

  const display = formatProfileDobForDisplay(value);
  const disabled = !isEditable;

  function handleOpen() {
    if (disabled) return;
    if (onFocusAttempt && !onFocusAttempt()) return;
    const parsed = parseProfileDobIsoToDate(value);
    const base = parsed ?? today;
    setFocusedMonth(new Date(base.getFullYear(), base.getMonth(), 1));
    setOpen(true);
  }

  function handleSelect(date: Date) {
    onChange?.(formatProfileDobToIso(date));
    setOpen(false);
    onBlurCommit?.();
  }

  const dialog =
    open && mounted
      ? createPortal(
          <div
            className={PROFILE_DATE_PICKER_LAYOUT.overlay}
            role="dialog"
            aria-modal
            aria-labelledby="profile-dob-picker-title"
            onClick={() => setOpen(false)}
          >
            <div
              className={PROFILE_DATE_PICKER_LAYOUT.sheet}
              onClick={(e) => e.stopPropagation()}
            >
              <p
                id="profile-dob-picker-title"
                className={PROFILE_DATE_PICKER_LAYOUT.title}
              >
                {P.dialogTitle}
              </p>
              <ProfileBirthDateCalendar
                focusedMonth={focusedMonth}
                selectedDate={selected}
                today={today}
                onFocusedMonthChange={setFocusedMonth}
                onSelectDate={handleSelect}
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <Label className="text-sm font-medium text-[var(--color-brand-black)]">
          {label}
          {required ? (
            <span className="text-[var(--color-brand-error)]">*</span>
          ) : null}
        </Label>
      ) : null}
      <button
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        className={cn(
          PROFILE_DATE_PICKER_LAYOUT.fieldBtn,
          disabled
            ? PROFILE_DATE_PICKER_LAYOUT.fieldBtnDisabled
            : PROFILE_DATE_PICKER_LAYOUT.fieldBtnEditable,
          hasError && "border-[var(--color-brand-error)]",
        )}
      >
        <span
          className={cn(!display && PROFILE_DATE_PICKER_LAYOUT.fieldPlaceholder)}
        >
          {display || P.placeholder}
        </span>
      </button>
      {hasError && errorMessage ? (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">
          {errorMessage}
        </p>
      ) : null}
      {dialog}
    </div>
  );
}
