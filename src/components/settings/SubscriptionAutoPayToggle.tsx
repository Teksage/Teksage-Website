"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  SETTINGS_SUBSCRIPTIONS_AUTO_PAY,
  SUBSCRIPTION_AUTO_PAY_CHECKBOX_UI,
  SUBSCRIPTION_AUTO_PAY_DEFAULT_ENABLED,
} from "@/lib/constants/settings-subscriptions";
import { cn } from "@/lib/utils";
import type { SubscriptionAutoPayToggleProps } from "@/types/ui/subscription-auto-pay";

/** Mirrors Flutter subscription checkbox — default on; uncheck for one-time pay. */
export function SubscriptionAutoPayToggle({
  enabled = SUBSCRIPTION_AUTO_PAY_DEFAULT_ENABLED,
  onChange,
  disabled = false,
  className,
}: SubscriptionAutoPayToggleProps) {
  const copy = useI18nConstants(SETTINGS_SUBSCRIPTIONS_AUTO_PAY);
  const U = SUBSCRIPTION_AUTO_PAY_CHECKBOX_UI;

  return (
    <div className={cn(U.wrap, className)}>
      <label className={U.row}>
        <input
          type="checkbox"
          checked={enabled}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className={U.checkbox}
        />
        <span className={U.label}>{copy.toggleLabel}</span>
      </label>
      <p className={U.hint}>{copy.cancelAnytimeNote}</p>
    </div>
  );
}
