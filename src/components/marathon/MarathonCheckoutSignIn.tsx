"use client";

import { useState } from "react";
import { EmailLoginForm } from "@/components/auth/EmailLoginForm";
import { LoginMethodTabs } from "@/components/auth/LoginMethodTabs";
import { MobileLoginForm } from "@/components/auth/MobileLoginForm";
import { MarathonCheckoutLoginOtp } from "@/components/marathon/MarathonCheckoutLoginOtp";
import { useI18nConstants } from "@/hooks/useT";
import { AUTH_SCREEN, LOGIN_SCREEN, OTP_LENGTH } from "@/lib/constants";
import { DEFAULT_COUNTRY_CALLING_CODE } from "@/lib/constants/default-region";
import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";
import { marathonProfileReady } from "@/lib/marathon-display";
import { verifyOtp } from "@/lib/services/auth";
import { fetchProfile } from "@/lib/services/profile";
import { useAuthStore } from "@/store/auth.store";
import type { LoginMethodTab } from "@/types/login-flow";
import type { MarathonCheckoutSignInProps } from "@/types/marathon";

export function MarathonCheckoutSignIn({ onComplete }: MarathonCheckoutSignInProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const ui = MARATHON_PAGE;
  const setAuth = useAuthStore((s) => s.setAuth);
  const [tab, setTab] = useState<LoginMethodTab>(LOGIN_SCREEN.showMobileLoginTab ? "mobile" : "email");
  const [contact, setContact] = useState("");
  const [countryCode, setCountryCode] = useState<string>(DEFAULT_COUNTRY_CALLING_CODE);
  const [showOtp, setShowOtp] = useState(false);
  const [otpKey, setOtpKey] = useState(0);
  const [error, setError] = useState("");

  function sent(value: string, dial?: string) {
    setContact(value);
    if (dial) setCountryCode(dial);
    setError("");
    setOtpKey((key) => key + 1);
    setShowOtp(true);
  }

  async function confirmOtp(code: string) {
    setError("");
    if (code.length < OTP_LENGTH) {
      setError(copy.otp);
      return;
    }
    try {
      const auth = tab === "email"
        ? await verifyOtp({ email: contact.trim(), otp: code })
        : await verifyOtp({ mobile: contact.trim(), countryCode, otp: code });
      setAuth(auth.user, auth.token);
      const profile = await fetchProfile();
      onComplete(marathonProfileReady(profile) ? 3 : 2);
    } catch {
      setError(copy.otpInvalid);
    }
  }

  const form = MARATHON_CHECKOUT;
  return (
    <>
      <p className={form.stepTitle}>{copy.login}</p>
      {error ? <p className={ui.bookError}>{error}</p> : null}
      {LOGIN_SCREEN.showMobileLoginTab ? (
        <LoginMethodTabs
          active={tab}
          onChange={(next) => {
            setTab(next);
            setShowOtp(false);
            setError("");
          }}
        />
      ) : null}
      <div key={tab} className={AUTH_SCREEN.tabPanelClassName}>
        {tab === "mobile" ? (
          <MobileLoginForm locked={showOtp} onOtpSent={(mobile, dial) => sent(mobile, dial)} />
        ) : (
          <EmailLoginForm locked={showOtp} onOtpSent={(email) => sent(email)} />
        )}
      </div>
      {showOtp ? (
        <MarathonCheckoutLoginOtp
          key={otpKey}
          contact={contact}
          tab={tab}
          countryCode={countryCode}
          error={error}
          onConfirm={(code) => void confirmOtp(code)}
        />
      ) : null}
    </>
  );
}
