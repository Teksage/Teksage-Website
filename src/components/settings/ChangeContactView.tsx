"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";
import { OTP_LENGTH, ROUTES, SETTINGS_CHANGE_CONTACT } from "@/lib/constants";
import { sendAuthenticatedOtp, verifyAuthenticatedOtp } from "@/lib/services/profile-verify";
import { useProfile } from "@/hooks/useProfile";
import { cn } from "@/lib/utils";
import type { ChangeContactMode } from "@/types";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function ChangeContactView() {
  const router = useRouter();
  const { refetchProfile } = useProfile();
  const [mode, setMode] = useState<ChangeContactMode>("email");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  function resetProgress(nextMode: ChangeContactMode) {
    setMode(nextMode);
    setOtpSent(false);
    setOtp("");
    setFeedback(null);
    setIsError(false);
  }
  async function handleSendOtp() {
    setFeedback(null);
    setIsError(false);
    const cleanMobile = mobile.replace(/\D/g, "");
    const cleanEmail = email.trim();
    if (mode === "email" && !EMAIL_REGEX.test(cleanEmail)) {
      setIsError(true);
      setFeedback(SETTINGS_CHANGE_CONTACT.invalidEmail);
      return;
    }
    if (mode === "mobile" && cleanMobile.length !== 10) {
      setIsError(true);
      setFeedback(SETTINGS_CHANGE_CONTACT.invalidMobile);
      return;
    }
    setSending(true);
    try {
      await sendAuthenticatedOtp(
        mode === "email"
          ? { email: cleanEmail }
          : {
              mobile_number: cleanMobile,
              country_code: countryCode.replace(/\D/g, "") || "91",
            }
      );
      setOtpSent(true);
    } catch (error) {
      setIsError(true);
      setFeedback(error instanceof Error ? error.message : "Could not send OTP.");
    } finally {
      setSending(false);
    }
  }
  async function handleVerifyAndUpdate() {
    setFeedback(null);
    setIsError(false);
    const cleanOtp = otp.replace(/\D/g, "");
    if (cleanOtp.length !== OTP_LENGTH) {
      setIsError(true);
      setFeedback(SETTINGS_CHANGE_CONTACT.invalidOtp);
      return;
    }
    setVerifying(true);
    try {
      const response = await verifyAuthenticatedOtp(
        mode === "email"
          ? { email: email.trim(), otp: cleanOtp }
          : {
              mobile_number: mobile.replace(/\D/g, ""),
              country_code: countryCode.replace(/\D/g, "") || "91",
              otp: cleanOtp,
            },
        { update: true }
      );
      if (response.error) {
        setIsError(true);
        setFeedback(response.error);
        return;
      }
      await refetchProfile();
      router.replace(ROUTES.profile);
    } catch (error) {
      setIsError(true);
      setFeedback(error instanceof Error ? error.message : "Verification failed.");
    } finally {
      setVerifying(false);
    }
  }
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-4 px-5 pb-6 pt-5">
      <p className="text-sm text-black/60">{SETTINGS_CHANGE_CONTACT.subtitle}</p>
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/5 p-1">
        <button
          type="button"
          onClick={() => resetProgress("email")}
          className={cn(
            "h-10 rounded-lg text-sm font-semibold transition-colors",
            mode === "email" ? "bg-white text-black shadow-sm" : "text-black/60"
          )}
        >
          {SETTINGS_CHANGE_CONTACT.modeEmail}
        </button>
        <button
          type="button"
          onClick={() => resetProgress("mobile")}
          className={cn(
            "h-10 rounded-lg text-sm font-semibold transition-colors",
            mode === "mobile" ? "bg-white text-black shadow-sm" : "text-black/60"
          )}
        >
          {SETTINGS_CHANGE_CONTACT.modeMobile}
        </button>
      </div>
      {mode === "email" ? (
        <Input
          type="email"
          value={email}
          placeholder={SETTINGS_CHANGE_CONTACT.emailLabel}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-xl border-black/15 bg-neutral-100"
        />
      ) : (
        <div className="flex gap-2">
          <Input
            value={countryCode}
            placeholder={SETTINGS_CHANGE_CONTACT.countryCodeLabel}
            onChange={(e) => setCountryCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
            className="h-12 w-28 rounded-xl border-black/15 bg-neutral-100"
          />
          <Input
            type="tel"
            value={mobile}
            placeholder={SETTINGS_CHANGE_CONTACT.mobileLabel}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
            className="h-12 rounded-xl border-black/15 bg-neutral-100"
          />
        </div>
      )}
      <Button
        type="button"
        onClick={handleSendOtp}
        disabled={sending}
        className="h-11 rounded-full bg-[var(--color-brand-primary)] font-semibold text-white hover:bg-[var(--color-brand-primary)]/90"
      >
        {sending ? <Loader variant="inline" size="sm" /> : SETTINGS_CHANGE_CONTACT.sendOtp}
      </Button>
      {otpSent ? (
        <div className="flex flex-col gap-2 rounded-xl border border-black/15 bg-neutral-50 p-3">
          <p className="text-xs text-black/60">
            {mode === "email"
              ? SETTINGS_CHANGE_CONTACT.otpHintEmail
              : SETTINGS_CHANGE_CONTACT.otpHintMobile}
          </p>
          <Input
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={OTP_LENGTH}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))
            }
            placeholder={SETTINGS_CHANGE_CONTACT.otpLabel}
            className="h-12 rounded-xl border-black/15 bg-white text-center text-base font-semibold tracking-widest"
          />
          <Button
            type="button"
            onClick={handleVerifyAndUpdate}
            disabled={verifying}
            className="h-11 rounded-full bg-[var(--color-brand-primary)] font-semibold text-white hover:bg-[var(--color-brand-primary)]/90"
          >
            {verifying ? <Loader variant="inline" size="sm" /> : SETTINGS_CHANGE_CONTACT.verifyAndUpdate}
          </Button>
        </div>
      ) : null}
      {feedback ? (
        <p className={cn("text-sm font-semibold", isError ? "text-[var(--color-brand-error)]" : "text-emerald-700")}>
          {feedback}
        </p>
      ) : null}
    </main>
  );
}
