"use client";

import { useI18nConstants } from "@/hooks/useT";
import { SETTINGS_SUBSCRIPTIONS_AUTO_PAY } from "@/lib/constants/settings-subscriptions";
import { cn } from "@/lib/utils";

type SubscriptionAutoPayToggleProps = {
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export function SubscriptionAutoPayToggle({
  className,
}: SubscriptionAutoPayToggleProps) {
  const copy = useI18nConstants(SETTINGS_SUBSCRIPTIONS_AUTO_PAY);

  return (
    <div
      className={cn(
        "mt-4 flex flex-col items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-center",
        className
      )}
    >
      <div className="flex items-center justify-center gap-2.5">
        <span className="size-2 shrink-0 rounded-full bg-[var(--color-brand-primary)]" />
        <span className="text-sm font-semibold text-white">
          {copy.autoRenewsEveryMonth}
        </span>
      </div>
      <p className="text-xs font-medium leading-snug text-white/70">
        {copy.cancelAnytimeNote}
      </p>
    </div>
  );
}
