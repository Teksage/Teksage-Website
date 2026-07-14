import {
  DEFAULT_COUNTRY_CODE_NUMERIC,
  OTP_LENGTH,
  SETTINGS_CHANGE_CONTACT,
} from "@/lib/constants";
import {
  sendAuthenticatedOtp,
  verifyAuthenticatedOtp,
} from "@/lib/services/profile-verify";
import { LOGIN_EMAIL_REGEX } from "@/lib/constants/validation-patterns";
import { isValidNationalMobile } from "@/lib/mobile-validation";
import type { ChangeContactMode } from "@/types";

export function parseChangeContactMode(raw: string | null): ChangeContactMode {
  return raw === SETTINGS_CHANGE_CONTACT.modeQueryMobile ? "mobile" : "email";
}

export function maskEmailForChange(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain || !local) return email;
  return `${local.slice(0, Math.min(2, local.length))}****@${domain}`;
}

export function resolveProfileCc(countryCode?: string | null): string {
  return (
    (countryCode ?? DEFAULT_COUNTRY_CODE_NUMERIC).replace(/\D/g, "") ||
    DEFAULT_COUNTRY_CODE_NUMERIC
  );
}

export async function sendExistingContactOtp(args: {
  isEmail: boolean;
  email: string;
  mobile: string;
  countryCode: string;
}): Promise<void> {
  if (args.isEmail) {
    if (!args.email) throw new Error(SETTINGS_CHANGE_CONTACT.missingProfileContact);
    await sendAuthenticatedOtp({ email: args.email });
    return;
  }
  if (!args.mobile) throw new Error(SETTINGS_CHANGE_CONTACT.missingProfileContact);
  await sendAuthenticatedOtp({
    mobile_number: args.mobile,
    country_code: args.countryCode,
  });
}

export async function verifyExistingContactOtp(args: {
  isEmail: boolean;
  email: string;
  mobile: string;
  countryCode: string;
  otp: string;
}): Promise<string | null> {
  const cleanOtp = args.otp.replace(/\D/g, "");
  if (cleanOtp.length !== OTP_LENGTH) {
    return SETTINGS_CHANGE_CONTACT.invalidOtp;
  }
  const res = await verifyAuthenticatedOtp(
    args.isEmail
      ? { email: args.email, otp: cleanOtp }
      : {
          mobile_number: args.mobile,
          country_code: args.countryCode,
          otp: cleanOtp,
        },
    { update: false }
  );
  return res.error ?? null;
}

export function validateNewContact(args: {
  isEmail: boolean;
  email: string;
  mobile: string;
  mobileLength: number;
}): string | null {
  if (args.isEmail && !LOGIN_EMAIL_REGEX.test(args.email.trim())) {
    return SETTINGS_CHANGE_CONTACT.invalidEmail;
  }
  if (
    !args.isEmail &&
    !isValidNationalMobile(args.mobile.replace(/\D/g, ""), args.mobileLength)
  ) {
    return SETTINGS_CHANGE_CONTACT.invalidMobile;
  }
  return null;
}

export async function sendNewContactOtp(args: {
  isEmail: boolean;
  email: string;
  mobile: string;
  countryCode: string;
}): Promise<void> {
  if (args.isEmail) {
    await sendAuthenticatedOtp({ email: args.email.trim().toLowerCase() });
    return;
  }
  await sendAuthenticatedOtp({
    mobile_number: args.mobile.replace(/\D/g, ""),
    country_code: args.countryCode,
  });
}

export async function verifyNewContactOtp(args: {
  isEmail: boolean;
  email: string;
  mobile: string;
  countryCode: string;
  otp: string;
}): Promise<string | null> {
  const cleanOtp = args.otp.replace(/\D/g, "");
  if (cleanOtp.length !== OTP_LENGTH) {
    return SETTINGS_CHANGE_CONTACT.invalidOtp;
  }
  const res = await verifyAuthenticatedOtp(
    args.isEmail
      ? { email: args.email.trim().toLowerCase(), otp: cleanOtp }
      : {
          mobile_number: args.mobile.replace(/\D/g, ""),
          country_code: args.countryCode,
          otp: cleanOtp,
        },
    { update: true }
  );
  return res.error ?? null;
}

export function changeContactHeaderTitle(
  step: "verify-existing" | "enter-new" | "verify-new",
  isEmail: boolean
): string {
  if (step === "verify-existing") {
    return isEmail
      ? SETTINGS_CHANGE_CONTACT.titleChangeEmail
      : SETTINGS_CHANGE_CONTACT.titleChangePhone;
  }
  return isEmail
    ? SETTINGS_CHANGE_CONTACT.titleVerifyEmail
    : SETTINGS_CHANGE_CONTACT.titleVerifyPhone;
}

export function failMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}
