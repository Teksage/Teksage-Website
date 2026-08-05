"use client";

import { Suspense, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";
import { ProfileContactActionButton } from "@/components/settings/ProfileContactActionButton";
import { PARTNER_REFERRAL_UI } from "@/lib/constants/partner-referral";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { http } from "@/lib/services/http";
import {
  clearPartnerRefCode,
  readPartnerRefCode,
} from "@/lib/partner-ref-storage";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import { cn } from "@/lib/utils";
import type { PartnerReferralCodeSectionProps } from "@/types/ui/partner-referral";

function PartnerReferralCodeSectionInner({
  show,
  onApplied,
}: PartnerReferralCodeSectionProps) {
  const copy = useI18nConstants(PARTNER_REFERRAL_UI);
  const [code, setCode] = useState(() => readPartnerRefCode() || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!show) return null;

  const applied = Boolean(success);
  const canEdit = !busy && !applied;

  async function onApply() {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      const { data } = await http.post(API_ENDPOINTS.partnerCodeRedeem, {
        code: trimmed,
      });
      clearPartnerRefCode();
      const days = data?.days_left ?? data?.valid_days;
      setSuccess(
        days ? `${copy.successTitle} (${days} days)` : copy.successTitle
      );
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.referralCodeApplied, {
        position: "top",
      });
      onApplied?.();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : copy.invalid;
      setError(message);
      showErrorAppSnackBar(message, { position: "top" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-[var(--color-brand-black)]">
        {copy.fieldLabel}
      </span>
      <div
        className={cn(
          "flex h-12 items-stretch overflow-hidden rounded-xl border bg-neutral-100",
          "transition-colors focus-within:border-[var(--color-brand-primary)]",
          error ? "border-[var(--color-brand-error)]" : "border-black/15",
          !canEdit && "opacity-90"
        )}
      >
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          disabled={!canEdit}
          placeholder={copy.placeholder}
          className={cn(
            "h-12 min-w-0 flex-1 rounded-none border-0 bg-transparent px-4 text-sm font-medium shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            !canEdit && "cursor-not-allowed"
          )}
        />
        {!applied ? (
          <ProfileContactActionButton
            label={busy ? copy.applying : copy.apply}
            onClick={() => void onApply()}
            disabled={busy || !code.trim()}
            busy={busy}
            busySlot={<Loader variant="inline" size="sm" />}
          />
        ) : null}
      </div>
      {success ? (
        <p className="text-xs font-semibold text-[var(--color-brand-primary)]">
          {success}
        </p>
      ) : null}
      {error ? (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function PartnerReferralCodeSection(props: PartnerReferralCodeSectionProps) {
  return (
    <Suspense fallback={null}>
      <PartnerReferralCodeSectionInner {...props} />
    </Suspense>
  );
}
