"use client";

import { useI18nConstants } from "@/hooks/useT";
import { SETTINGS_SUBSCRIPTIONS_AUTO_PAY } from "@/lib/constants/settings-subscriptions";
import { cn } from "@/lib/utils";

type SubscriptionAutoPayToggleProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export function SubscriptionAutoPayToggle({
  enabled,
  onChange,
  disabled,
  className,
}: SubscriptionAutoPayToggleProps) {
  const copy = useI18nConstants(SETTINGS_SUBSCRIPTIONS_AUTO_PAY);

  return (
    <label
      className={cn(
        "mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
    >
      <input
        type="checkbox"
        checked={enabled}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 size-4 shrink-0 accent-[var(--color-brand-primary)]"
      />
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-white">{copy.toggleLabel}</span>
        <span className="mt-1 block text-xs leading-snug text-white/60">
          {copy.toggleHint}
        </span>
      </span>
    </label>
  );
}
