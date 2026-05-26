"use client";

import { useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { SETTINGS_SUBSCRIPTIONS_AUTO_PAY } from "@/lib/constants/settings-subscriptions";
import { cn } from "@/lib/utils";

type SubscriptionAutoPayManageProps = {
  nextBillingDate?: string;
  onCancel: () => Promise<void>;
  className?: string;
};

function formatBillingDate(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function SubscriptionAutoPayManage({
  nextBillingDate,
  onCancel,
  className,
}: SubscriptionAutoPayManageProps) {
  const copy = useI18nConstants(SETTINGS_SUBSCRIPTIONS_AUTO_PAY);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const billingLabel = formatBillingDate(nextBillingDate);

  async function handleCancel() {
    if (!window.confirm(copy.cancelConfirm)) return;
    setBusy(true);
    setError(null);
    try {
      await onCancel();
    } catch {
      setError(copy.cancelFailed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={cn(
        "mt-4 rounded-lg border border-white/15 bg-white/5 px-4 py-3",
        className
      )}
    >
      <p className="text-sm font-semibold text-white">{copy.activeLabel}</p>
      {billingLabel ? (
        <p className="mt-1 text-xs text-white/60">
          {copy.nextBilling}: {billingLabel}
        </p>
      ) : null}
      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
      <button
        type="button"
        disabled={busy}
        onClick={() => void handleCancel()}
        className="mt-3 w-full rounded-full border border-white/30 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {busy ? "…" : copy.cancelCta}
      </button>
    </div>
  );
}
