"use client";

import { cn } from "@/lib/utils";

type SettingsToggleProps = {
  checked: boolean;
  disabled?: boolean;
  onCheckedChange: (value: boolean) => void;
  label: string;
  className?: string;
};

/** Flutter `pushNotification.dart` — label left, switch right; green track + white thumb when on. */
export function SettingsToggle({
  checked,
  disabled,
  onCheckedChange,
  label,
  className,
}: SettingsToggleProps) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 items-center justify-between gap-4",
        className
      )}
    >
      <span
        className={cn(
          "min-w-0 text-base font-medium leading-snug",
          checked ? "text-[var(--color-brand-black)]" : "text-black/60"
        )}
      >
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative h-8 w-[51px] shrink-0 rounded-full transition-colors",
          checked
            ? "bg-[var(--color-brand-primary)]"
            : "border border-[#c7c7c7] bg-white",
          disabled && "opacity-50"
        )}
      >
        <span
          className={cn(
            "pointer-events-none absolute top-1/2 size-[26px] -translate-y-1/2 rounded-full transition-[left] duration-200",
            checked
              ? "left-[22px] bg-white shadow-sm"
              : "left-0.5 bg-[#c7c7c7]"
          )}
        />
      </button>
    </div>
  );
}
