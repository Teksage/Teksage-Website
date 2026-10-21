"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { OtpInput } from "@/components/auth/OtpInput";
import { CountryDialPicker } from "@/components/common/CountryDialPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18nConstants } from "@/hooks/useT";
import { AUTH_SCREEN, OTP_LENGTH } from "@/lib/constants";
import { DEFAULT_COUNTRY_CODE_NUMERIC } from "@/lib/constants/default-region";
import { LOGIN_EMAIL_FORM } from "@/lib/constants/login-email-form";
import { LOGIN_MOBILE_FORM } from "@/lib/constants/login-mobile-form";
import { MARATHON_CHECKOUT, MARATHON_CHECKOUT_COPY } from "@/lib/constants/marathon-checkout";
import { MARATHON_ASSETS } from "@/lib/constants/assets";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";
import { PROFILE_DETAILS } from "@/lib/constants/profile-details";
import { PROFILE_FORM_VALIDATION } from "@/lib/constants/profile-form-validation";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import { LOGIN_EMAIL_REGEX } from "@/lib/constants/validation-patterns";
import { showSuccessAppSnackBar } from "@/lib/app-snackbar";
import { sendAuthenticatedOtp, verifyAuthenticatedOtp } from "@/lib/services/profile-verify";
import { cn } from "@/lib/utils";
import { maskNationalMobile } from "@/lib/otp-verify-helpers";
import type { MarathonCheckoutContactProps } from "@/types/marathon";

export function MarathonCheckoutContact({
  mode,
  clarifyOwner = false,
  initialValue = "",
  initialDial = "",
  alreadyVerified = false,
  onVerified,
}: MarathonCheckoutContactProps) {
  const details = useI18nConstants(PROFILE_DETAILS);
  const rules = useI18nConstants(PROFILE_FORM_VALIDATION);
  const log = useI18nConstants(LOGIN_EMAIL_FORM);
  const mobileCopy = useI18nConstants(LOGIN_MOBILE_FORM);
  const copy = useI18nConstants(MARATHON_COPY);
  const note = useI18nConstants(MARATHON_CHECKOUT_COPY);
  const form = MARATHON_CHECKOUT;
  const ui = MARATHON_PAGE;
  const [value, setValue] = useState(initialValue);
  const [dial, setDial] = useState<string>(initialDial || DEFAULT_COUNTRY_CODE_NUMERIC);
  const [otpCells, setOtpCells] = useState<string[]>(() => Array.from({ length: OTP_LENGTH }, () => ""));
  const [showOtp, setShowOtp] = useState(false);
  const [verified, setVerified] = useState(alreadyVerified);
  const [error, setError] = useState("");
  const appliedVerified = useRef(alreadyVerified);

  useEffect(() => {
    if (appliedVerified.current || !alreadyVerified || !initialValue.trim()) return;
    appliedVerified.current = true;
    setValue(initialValue.trim());
    if (initialDial) setDial(initialDial);
    setVerified(true);
    onVerified();
  }, [alreadyVerified, initialDial, initialValue, onVerified]);

  async function send() {
    setError("");
    if (mode === "email" && !LOGIN_EMAIL_REGEX.test(value.trim())) {
      setError(rules.emailInvalid);
      return;
    }
    const digits = value.replace(/\D/g, "");
    if (mode === "mobile" && digits.length < 10) {
      setError(rules.mobileInvalid);
      return;
    }
    try {
      if (mode === "email") await sendAuthenticatedOtp({ email: value.trim().toLowerCase() });
      else await sendAuthenticatedOtp({ mobile_number: digits, country_code: dial });
      setShowOtp(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : log.sendOtpError);
    }
  }

  async function confirm() {
    setError("");
    const code = otpCells.join("");
    if (code.length < OTP_LENGTH) {
      setError(copy.otp);
      return;
    }
    try {
      const res = mode === "email"
        ? await verifyAuthenticatedOtp({ email: value.trim().toLowerCase(), otp: code }, { update: true })
        : await verifyAuthenticatedOtp(
            { mobile_number: value.replace(/\D/g, ""), country_code: dial, otp: code },
            { update: true }
          );
      if (res.error) {
        setError(res.error);
        return;
      }
      setVerified(true);
      setShowOtp(false);
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.otpVerified);
      onVerified();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : rules.emailNotVerified);
    }
  }

  return (
    <div className={form.contactCell}>
      <div className={form.fieldStack}>
        <span className={form.label}>
          {mode === "email"
            ? clarifyOwner ? note.yourEmail : details.email
            : clarifyOwner ? note.yourPhone : details.phone}
        </span>
        <div className={form.contactRow}>
          {mode === "mobile" ? (
            <div className={form.dial}>
              <CountryDialPicker
                valueDial={`+${dial}`}
                disabled={verified}
                ariaLabel={mobileCopy.countryCodeAria}
                onSelect={(country) => setDial(country.dial_code.replace(/\D/g, "") || DEFAULT_COUNTRY_CODE_NUMERIC)}
              />
            </div>
          ) : null}
          <Input className={cn(form.field, form.contactInput)} value={value} disabled={verified} onChange={(e) => setValue(e.target.value)} />
          {verified ? (
            <Image src={MARATHON_ASSETS.verified} alt="" width={28} height={28} unoptimized className={form.verifiedMark} />
          ) : (
            <Button type="button" className={cn(form.verify, AUTH_SCREEN.ctaReadyClassName)} onClick={() => void send()}>
              {details.verify}
            </Button>
          )}
        </div>
        <p className={form.note}>{mode === "email" ? note.emailRequired : note.phoneOptional}</p>
      </div>
      {error ? <p className={ui.bookError}>{error}</p> : null}
      {showOtp && !verified ? (
        <div className={form.otpBlock}>
          <p className={form.otpNote}>
            {note.otpSentTo}{" "}
            <span className={form.otpContact}>
              {mode === "email"
                ? value.trim().replace(/^(.{2}).*(@.*)$/, "$1****$2")
                : `+${dial} ${maskNationalMobile(value)}`}
            </span>
          </p>
          <p className={form.otpNote}>{note.otpValid}</p>
          <div className={form.otpRow}>
            <OtpInput
              value={otpCells}
              onChange={setOtpCells}
              hasError={Boolean(error)}
              className={form.otpBoxes}
              cellClassName={form.otpCell}
            />
            <Button type="button" className={cn(form.verify, AUTH_SCREEN.ctaReadyClassName)} onClick={() => void confirm()}>
              {details.confirmOtp}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
