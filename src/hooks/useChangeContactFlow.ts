"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  DEFAULT_COUNTRY_CODE_NUMERIC,
  ROUTES,
  SETTINGS_CHANGE_CONTACT,
} from "@/lib/constants";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import { showErrorAppSnackBar, showSuccessAppSnackBar } from "@/lib/app-snackbar";
import { useProfile } from "@/hooks/useProfile";
import { fetchCountries, findCountryByDial } from "@/lib/services/countries";
import { nationalMobileMaxLength } from "@/lib/mobile-validation";
import { maskPhoneForDisplay } from "@/lib/whatsapp-consent-resend";
import {
  changeContactHeaderTitle,
  failMessage,
  maskEmailForChange,
  parseChangeContactMode,
  resolveProfileCc,
  sendExistingContactOtp,
  sendNewContactOtp,
  validateNewContact,
  verifyExistingContactOtp,
  verifyNewContactOtp,
} from "@/lib/change-contact-api";
import type { ChangeContactStep } from "@/types/ui/change-contact";

export function useChangeContactFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, refetchProfile } = useProfile();
  const mode = parseChangeContactMode(
    searchParams.get(SETTINGS_CHANGE_CONTACT.modeQuery)
  );
  const isEmail = mode === "email";

  const [step, setStep] = useState<ChangeContactStep>("verify-existing");
  const [otp, setOtp] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE_NUMERIC);
  const [mobileLength, setMobileLength] = useState(10);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [existingOtpSent, setExistingOtpSent] = useState(false);

  const profileEmail = (user?.email ?? "").trim();
  const profileMobile = (user?.mobile ?? "").replace(/\D/g, "");
  const profileCc = resolveProfileCc(user?.countryCode);
  const newCc = countryCode.replace(/\D/g, "") || profileCc;

  useEffect(() => {
    void fetchCountries().then(() => {
      const matched = findCountryByDial(countryCode);
      if (matched?.mobile_number_length) setMobileLength(matched.mobile_number_length);
    });
  }, [countryCode]);

  useEffect(() => {
    if (step !== "verify-existing" || existingOtpSent || !user) return;
    void sendExistingOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, user, mode]);

  function setFail(message: string) {
    setIsError(true);
    setFeedback(message);
  }

  async function sendExistingOtp() {
    setFeedback(null);
    setIsError(false);
    setSending(true);
    try {
      await sendExistingContactOtp({
        isEmail,
        email: profileEmail,
        mobile: profileMobile,
        countryCode: profileCc,
      });
      setExistingOtpSent(true);
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.contactOtpSent, { position: "top" });
    } catch (error) {
      const msg = failMessage(error, SETTINGS_CHANGE_CONTACT.sendOtpError);
      setFail(msg);
      showErrorAppSnackBar(msg, { position: "top" });
    } finally {
      setSending(false);
    }
  }

  async function confirmExistingOtp() {
    setFeedback(null);
    setIsError(false);
    setVerifying(true);
    try {
      const err = await verifyExistingContactOtp({
        isEmail,
        email: profileEmail,
        mobile: profileMobile,
        countryCode: profileCc,
        otp,
      });
      if (err) return setFail(err);
      setOtp("");
      setStep("enter-new");
    } catch (error) {
      setFail(failMessage(error, "Verification failed."));
    } finally {
      setVerifying(false);
    }
  }

  async function continueWithNewContact() {
    setFeedback(null);
    setIsError(false);
    const validationError = validateNewContact({
      isEmail,
      email: newEmail,
      mobile: newMobile,
      mobileLength,
    });
    if (validationError) return setFail(validationError);
    setSending(true);
    try {
      await sendNewContactOtp({
        isEmail,
        email: newEmail,
        mobile: newMobile,
        countryCode: newCc,
      });
      setOtp("");
      setStep("verify-new");
      showSuccessAppSnackBar(APP_SNACKBAR_MESSAGES.contactOtpSent, { position: "top" });
    } catch (error) {
      setFail(failMessage(error, SETTINGS_CHANGE_CONTACT.sendOtpError));
    } finally {
      setSending(false);
    }
  }

  async function confirmNewOtp() {
    setFeedback(null);
    setIsError(false);
    setVerifying(true);
    try {
      const err = await verifyNewContactOtp({
        isEmail,
        email: newEmail,
        mobile: newMobile,
        countryCode: newCc,
        otp,
      });
      if (err) return setFail(err);
      await refetchProfile();
      showSuccessAppSnackBar(SETTINGS_CHANGE_CONTACT.success, { position: "top" });
      router.replace(ROUTES.profile);
    } catch (error) {
      setFail(failMessage(error, "Verification failed."));
    } finally {
      setVerifying(false);
    }
  }

  return {
    router,
    mode,
    isEmail,
    step,
    otp,
    setOtp,
    newEmail,
    setNewEmail,
    newMobile,
    setNewMobile,
    setCountryCode,
    setMobileLength,
    sending,
    verifying,
    feedback,
    isError,
    headerTitle: changeContactHeaderTitle(step, isEmail),
    maskedExisting: isEmail
      ? maskEmailForChange(profileEmail)
      : maskPhoneForDisplay(profileCc, profileMobile),
    maxDigits: nationalMobileMaxLength(mobileLength),
    dialValue: `+${countryCode}`,
    sendExistingOtp,
    confirmExistingOtp,
    continueWithNewContact,
    confirmNewOtp,
  };
}
