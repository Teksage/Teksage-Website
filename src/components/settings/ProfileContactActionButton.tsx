"use client";

import { cn } from "@/lib/utils";

import type { ProfileContactActionButtonProps } from "@/types/ui/settings";

/** Shared Verify / Change action on profile email & phone rows. */
export function ProfileContactActionButton({
  label,
  onClick,
  disabled,
  busy,
  busySlot,
}: ProfileContactActionButtonProps) {
  return (
    <>
      <div className="w-px shrink-0 self-stretch bg-black/15" aria-hidden />
      <button
        type="button"
        disabled={disabled}
        className={cn(
          "flex shrink-0 items-center gap-1.5 px-3.5 text-sm font-semibold text-[var(--color-brand-primary)]",
          "hover:bg-black/[0.04] disabled:opacity-60"
        )}
        onClick={onClick}
      >
        {busy ? busySlot : null}
        {label}
      </button>
    </>
  );
}
