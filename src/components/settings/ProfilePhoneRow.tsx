"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/common/Loader";
import { CountryDialPicker } from "@/components/common/CountryDialPicker";
import { ProfileContactActionButton } from "@/components/settings/ProfileContactActionButton";
import { ProfilePhoneOtpPanel } from "@/components/settings/ProfilePhoneOtpPanel";
import { PROFILE_DETAILS, PROFILE_FIELD_UI as FU } from "@/lib/constants/profile-details";
import {
  OTP_LENGTH,
  DEFAULT_COUNTRY_CODE_NUMERIC,
  LOGIN_MOBILE_FORM,
} from "@/lib/constants";
import { buildChangeContactPath } from "@/lib/constants/settings-change-contact";
import {
  sendAuthenticatedOtp,
  verifyAuthenticatedOtp,
} from "@/lib/services/profile-verify";
import { fetchCountries, findCountryByDial } from "@/lib/services/countries";
import {
  isValidNationalMobile,
  nationalMobileMaxLength,
} from "@/lib/mobile-validation";
import { cn } from "@/lib/utils";
import type { ProfilePhoneRowProps } from "@/types";

export function ProfilePhoneRow({
  countryCode,
  mobile,
  onCountryCodeChange,
  onMobileChange,
  isMobileVerified,
  isEditing,
  onVerificationSuccess,
  hasError,
  errorMessage,
}: ProfilePhoneRowProps) {
  const PD = useI18nConstants(PROFILE_DETAILS);
  const router = useRouter();
  const [otpPhase, setOtpPhase] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendBusy, setSendBusy] = useState(false);
  const [verifyBusy, setVerifyBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [mobileLength, setMobileLength] = useState(10);

  const cc =
    (countryCode || DEFAULT_COUNTRY_CODE_NUMERIC).replace(/\D/g, "") ||
    DEFAULT_COUNTRY_CODE_NUMERIC;
  const digits = mobile.replace(/\D/g, "");
  const maxDigits = nationalMobileMaxLength(mobileLength);
  const canEdit = isEditing && !isMobileVerified;
  const showChange = Boolean(isMobileVerified) && isEditing;

  useEffect(() => {
    void fetchCountries().then(() => {
      const matched = findCountryByDial(cc);
      if (matched?.mobile_number_length) {
        setMobileLength(matched.mobile_number_length);
      }
    });
  }, [cc]);

  async function handleSendOtp() {
    setFeedback(null);
    if (!isValidNationalMobile(digits, mobileLength)) {
      setFeedback(LOGIN_MOBILE_FORM.invalidMobile);
      return;
    }
    setSendBusy(true);
    try {
      await sendAuthenticatedOtp({ mobile_number: digits, country_code: cc });
      setOtpPhase(true);
      setOtp("");
    } catch (e) {
      setFeedback(e instanceof Error ? e.message : "Could not send OTP.");
    } finally {
      setSendBusy(false);
    }
  }

  async function handleConfirmOtp() {
    setFeedback(null);
    const clean = otp.replace(/\D/g, "");
    if (clean.length !== OTP_LENGTH) {
      setFeedback(`Enter the ${OTP_LENGTH}-digit OTP.`);
      return;
    }
    setVerifyBusy(true);
    try {
      const res = await verifyAuthenticatedOtp(
        { mobile_number: digits, country_code: cc, otp: clean },
        { update: false }
      );
      if (res.error) {
        setFeedback(res.error);
        return;
      }
      setOtpPhase(false);
      setOtp("");
      await onVerificationSuccess?.();
    } catch (e) {
      setFeedback(e instanceof Error ? e.message : "Verification failed.");
    } finally {
      setVerifyBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className={FU.label}>{PD.phone}</span>
      <div
        className={cn(
          FU.shell,
          "transition-colors focus-within:border-[var(--color-brand-primary)] focus-within:bg-white",
          hasError && FU.shellError,
          !canEdit && !showChange && "opacity-90"
        )}
      >
        <div className="flex w-[5.5rem] shrink-0 items-center justify-center border-r border-black/[0.08] text-sm font-semibold text-neutral-800">
          {isEditing && !isMobileVerified ? (
            <CountryDialPicker
              valueDial={`+${cc}`}
              ariaLabel={LOGIN_MOBILE_FORM.countryCodeAria}
              onSelect={(country) => {
                onCountryCodeChange(
                  country.dial_code.replace(/\D/g, "") ||
                    DEFAULT_COUNTRY_CODE_NUMERIC
                );
                setMobileLength(country.mobile_number_length);
                onMobileChange("");
              }}
            />
          ) : (
            `+${cc}`
          )}
        </div>
        <Input
          type="tel"
          value={mobile}
          onChange={(e) =>
            onMobileChange(e.target.value.replace(/\D/g, "").slice(0, maxDigits))
          }
          disabled={!canEdit}
          placeholder="Mobile"
          maxLength={maxDigits}
          className={cn(
            "h-12 min-w-0 flex-1 rounded-none border-0 bg-transparent px-4 text-sm font-medium shadow-none",
            "focus-visible:ring-0 focus-visible:ring-offset-0",
            !canEdit && "cursor-not-allowed"
          )}
        />
        {canEdit ? (
          <ProfileContactActionButton
            label={PD.verify}
            onClick={handleSendOtp}
            disabled={sendBusy}
            busy={sendBusy}
            busySlot={<Loader variant="inline" size="sm" />}
          />
        ) : null}
        {showChange ? (
          <ProfileContactActionButton
            label={PD.change}
            onClick={() => router.push(buildChangeContactPath("mobile"))}
          />
        ) : null}
      </div>
      {canEdit && otpPhase ? (
        <ProfilePhoneOtpPanel
          otp={otp}
          onOtpChange={setOtp}
          verifyBusy={verifyBusy}
          onConfirm={handleConfirmOtp}
        />
      ) : null}
      {hasError && errorMessage ? (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">
          {errorMessage}
        </p>
      ) : null}
      {feedback ? (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">
          {feedback}
        </p>
      ) : null}
    </div>
  );
}
