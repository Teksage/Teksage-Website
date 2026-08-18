"use client";

import { useState } from "react";
import { SettingsModalDialog } from "@/components/settings/SettingsModalDialog";
import { SubscriptionCancelReasonFields } from "@/components/settings/SubscriptionCancelReasonFields";
import { useI18nConstants } from "@/hooks/useT";
import {
  SETTINGS_SUBSCRIPTIONS_AUTO_PAY,
  SUBSCRIPTION_CANCEL_REASONS,
} from "@/lib/constants/settings-subscriptions";
import { buildAutoPayCancelReason } from "@/lib/subscription-auto-pay";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import { cn } from "@/lib/utils";

type SubscriptionAutoPayManageProps = {
  nextBillingDate?: string;
  onCancel: (reason: string) => Promise<string | undefined>;
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");
  const [reasonError, setReasonError] = useState<string | null>(null);
  const billingLabel = formatBillingDate(nextBillingDate);
  const otherLabel = copy.cancelReasonOther;
  const composedReason = buildAutoPayCancelReason(
    selectedReason,
    otherText,
    otherLabel
  );

  function resetReasonForm() {
    setSelectedReason(null);
    setOtherText("");
    setReasonError(null);
  }

  function selectReason(reason: string) {
    setSelectedReason(reason);
    setReasonError(null);
    if (reason !== otherLabel) setOtherText("");
  }

  async function handleConfirmCancel() {
    if (!selectedReason) {
      setReasonError(copy.cancelReasonRequired);
      return;
    }
    if (!composedReason) {
      setReasonError(copy.cancelReasonOtherRequired);
      return;
    }
    setConfirmOpen(false);
    setBusy(true);
    setError(null);
    setReasonError(null);
    try {
      const accessTill = await onCancel(composedReason);
      const accessLabel = formatBillingDate(accessTill);
      const message = accessLabel
        ? `${copy.accessUntil} ${accessLabel}.`
        : copy.cancelSuccess;
      showSuccessAppSnackBar(message);
      resetReasonForm();
    } catch {
      setError(copy.cancelFailed);
      showErrorAppSnackBar(copy.cancelFailed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
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
          onClick={() => {
            resetReasonForm();
            setConfirmOpen(true);
          }}
          className="mt-3 w-full cursor-pointer rounded-full border border-white/30 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "…" : copy.cancelCta}
        </button>
      </div>

      <SettingsModalDialog
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          resetReasonForm();
        }}
        message={copy.cancelConfirm}
        cancelLabel={copy.cancelConfirmDismiss}
        confirmLabel={copy.cancelConfirmCta}
        confirmDisabled={busy || !composedReason}
        body={
          <SubscriptionCancelReasonFields
            label={copy.cancelReasonLabel}
            reasons={SUBSCRIPTION_CANCEL_REASONS}
            otherLabel={otherLabel}
            selected={selectedReason}
            otherText={otherText}
            otherPlaceholder={copy.cancelReasonPlaceholder}
            error={reasonError}
            onSelect={selectReason}
            onOtherTextChange={(value) => {
              setOtherText(value);
              setReasonError(null);
            }}
          />
        }
        onConfirm={() => void handleConfirmCancel()}
      />
    </>
  );
}
