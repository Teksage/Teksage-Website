"use client";

import { useI18nConstants, useT } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteAccountOtpStep } from "@/components/settings/DeleteAccountOtpStep";
import { DeleteAccountReasonRow } from "@/components/settings/DeleteAccountReasonRow";
import { OTP_LENGTH } from "@/lib/constants";
import {
  DELETE_ACCOUNT_LAYOUT,
  DELETE_ACCOUNT_REASONS,
  SETTINGS_DELETE_COPY,
} from "@/lib/constants/settings-delete";
import {
  confirmDeleteAccount,
  requestDeleteAccountOtp,
} from "@/lib/services/settings-delete";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";

type Phase = "reason" | "confirm" | "otp";

export function SettingsDeleteAccountView() {
  const SD = useI18nConstants(SETTINGS_DELETE_COPY);
  const { t } = useT();
  const router = useRouter();
  const { logout } = useAuth();
  const user = useAuthStore((s) => s.user);
  const [phase, setPhase] = useState<Phase>("reason");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contact =
    user?.email?.trim() ||
    (user?.mobile
      ? `${user.countryCode ? `+${user.countryCode} ` : ""}${user.mobile}`
      : "");

  function onSelectReason(option: string) {
    setReason(option);
    setPhase("confirm");
    setError(null);
  }

  function onCancelConfirm() {
    router.back();
  }

  async function onDeleteNow() {
    setBusy(true);
    setError(null);
    try {
      await requestDeleteAccountOtp();
      setPhase("otp");
    } catch {
      setError(SD.failed);
    } finally {
      setBusy(false);
    }
  }

  async function onVerifyOtp(otp: string) {
    if (otp.length !== OTP_LENGTH) {
      setError(SD.invalidOtp);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await confirmDeleteAccount(otp, reason);
      await logout();
      router.push("/login");
    } catch {
      setError(SD.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={DELETE_ACCOUNT_LAYOUT.shell}>
      {phase === "reason" ? (
        <>
          <p className={DELETE_ACCOUNT_LAYOUT.prompt}>{SD.prompt}</p>
          <ul className={DELETE_ACCOUNT_LAYOUT.reasonSpacer}>
            {DELETE_ACCOUNT_REASONS.map((option) => (
              <li key={option}>
                <DeleteAccountReasonRow
                  label={t(option)}
                  onSelect={() => onSelectReason(option)}
                />
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {phase === "confirm" ? (
        <div className={DELETE_ACCOUNT_LAYOUT.confirmBlock}>
          <p className={DELETE_ACCOUNT_LAYOUT.confirmTitle}>{SD.aboutToDelete}</p>
          <p className={DELETE_ACCOUNT_LAYOUT.confirmBody}>{SD.deleteWarning}</p>
          <div className={DELETE_ACCOUNT_LAYOUT.confirmActions}>
            <button
              type="button"
              disabled={busy}
              className={DELETE_ACCOUNT_LAYOUT.deleteNowBtn}
              onClick={() => void onDeleteNow()}
            >
              {SD.deleteAccountNow}
            </button>
            <button
              type="button"
              className={DELETE_ACCOUNT_LAYOUT.cancelBtn}
              onClick={onCancelConfirm}
            >
              {SD.cancelDelete}
            </button>
          </div>
        </div>
      ) : null}

      {phase === "otp" ? (
        <DeleteAccountOtpStep
          contact={contact}
          busy={busy}
          error={error}
          onOtpComplete={(otp) => void onVerifyOtp(otp)}
          onResendError={setError}
        />
      ) : null}

      {phase !== "otp" && error ? (
        <p className="mt-4 text-center text-sm text-[var(--color-brand-error)]">{error}</p>
      ) : null}
    </div>
  );
}
