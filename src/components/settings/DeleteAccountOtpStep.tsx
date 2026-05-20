"use client";

import { useEffect, useState } from "react";
import { OtpInput } from "@/components/auth/OtpInput";
import { OTP_LENGTH } from "@/lib/constants";
import {
  DELETE_ACCOUNT_LAYOUT,
  SETTINGS_DELETE_COPY,
} from "@/lib/constants/settings-delete";
import { useI18nConstants } from "@/hooks/useT";
import { requestDeleteAccountOtp } from "@/lib/services/settings-delete";

const RESEND_SECONDS = 30;

type DeleteAccountOtpStepProps = {
  contact: string;
  busy: boolean;
  error: string | null;
  onOtpComplete: (otp: string) => void;
  onResendError: (message: string) => void;
};

export function DeleteAccountOtpStep({
  contact,
  busy,
  error,
  onOtpComplete,
  onResendError,
}: DeleteAccountOtpStepProps) {
  const SD = useI18nConstants(SETTINGS_DELETE_COPY);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [resendBusy, setResendBusy] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;
    const id = window.setInterval(() => {
      setTimer((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timer]);

  function onOtpChange(digits: string[]) {
    const joined = digits.join("");
    setOtp(joined);
    if (joined.length === OTP_LENGTH && !busy) {
      onOtpComplete(joined);
    }
  }

  async function onResend() {
    if (timer > 0 || resendBusy) return;
    setResendBusy(true);
    try {
      await requestDeleteAccountOtp();
      setTimer(RESEND_SECONDS);
    } catch {
      onResendError(SD.failed);
    } finally {
      setResendBusy(false);
    }
  }

  const resendLabel =
    timer > 0
      ? SD.resendOtpInSeconds.replace("{seconds}", String(timer))
      : SD.resendOtp;

  return (
    <div className={DELETE_ACCOUNT_LAYOUT.otpBlock}>
      <p className={DELETE_ACCOUNT_LAYOUT.otpTitle}>{SD.verifyEmail}</p>
      <p className={DELETE_ACCOUNT_LAYOUT.otpLead}>{SD.otpSentTo}</p>
      <p className={DELETE_ACCOUNT_LAYOUT.otpContact}>{contact}</p>
      <div className={DELETE_ACCOUNT_LAYOUT.otpInputWrap}>
        <OtpInput value={otp} onChange={onOtpChange} hasError={Boolean(error)} />
      </div>
      {error ? <p className={DELETE_ACCOUNT_LAYOUT.otpError}>{error}</p> : null}
      {timer > 0 ? (
        <p className={DELETE_ACCOUNT_LAYOUT.otpResend}>{resendLabel}</p>
      ) : (
        <button
          type="button"
          disabled={resendBusy || busy}
          className={DELETE_ACCOUNT_LAYOUT.otpResendBtn}
          onClick={() => void onResend()}
        >
          {resendLabel}
        </button>
      )}
    </div>
  );
}
