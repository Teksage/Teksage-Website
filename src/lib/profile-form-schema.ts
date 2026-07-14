import { z } from "zod";
import { PROFILE_FORM_VALIDATION } from "@/lib/constants/profile-form-validation";
import { LOGIN_EMAIL_REGEX } from "@/lib/constants/validation-patterns";
import {
  expectedLengthForCountryCode,
  isValidNationalMobile,
} from "@/lib/mobile-validation";

export function createProfileDetailsFormSchema(
  requireReferralSource: boolean,
  emailOptional = false
) {
  const emailField = emailOptional
    ? z
        .string()
        .trim()
        .refine(
          (value) => !value || LOGIN_EMAIL_REGEX.test(value),
          PROFILE_FORM_VALIDATION.emailInvalid
        )
    : z
        .string()
        .trim()
        .min(1, PROFILE_FORM_VALIDATION.emailRequired)
        .regex(LOGIN_EMAIL_REGEX, PROFILE_FORM_VALIDATION.emailInvalid);

  return z
    .object({
      firstName: z
        .string()
        .trim()
        .min(1, PROFILE_FORM_VALIDATION.firstNameRequired),
      lastName: z
        .string()
        .trim()
        .min(1, PROFILE_FORM_VALIDATION.lastNameRequired),
      email: emailField,
      mobile: z.string(),
      countryCode: z.string(),
      chatLanguages: z
        .string()
        .trim()
        .min(1, PROFILE_FORM_VALIDATION.chatLanguageRequired),
      referralSource: z.string(),
      dateOfBirth: z
        .string()
        .min(1, PROFILE_FORM_VALIDATION.dateOfBirthRequired),
      timeOfBirth: z
        .string()
        .min(1, PROFILE_FORM_VALIDATION.timeOfBirthRequired),
      placeOfBirth: z.string(),
      birthLocationFull: z.string(),
      preferredLocation: z.string(),
      preferredLocationFull: z.string(),
      rashi: z.string(),
      nakshatra: z.string(),
    })
    .superRefine((data, ctx) => {
      const birth =
        data.birthLocationFull.trim() || data.placeOfBirth.trim();
      if (!birth) {
        ctx.addIssue({
          code: "custom",
          message: PROFILE_FORM_VALIDATION.placeOfBirthRequired,
          path: ["placeOfBirth"],
        });
      }
      const preferred =
        data.preferredLocationFull.trim() || data.preferredLocation.trim();
      if (!preferred) {
        ctx.addIssue({
          code: "custom",
          message: PROFILE_FORM_VALIDATION.preferredLocationRequired,
          path: ["preferredLocation"],
        });
      }
      const mobileDigits = data.mobile.replace(/\D/g, "");
      const expectedLen = expectedLengthForCountryCode(data.countryCode);
      if (
        mobileDigits.length > 0 &&
        !isValidNationalMobile(mobileDigits, expectedLen)
      ) {
        ctx.addIssue({
          code: "custom",
          message: PROFILE_FORM_VALIDATION.mobileInvalid,
          path: ["mobile"],
        });
      }
      if (requireReferralSource && !data.referralSource.trim()) {
        ctx.addIssue({
          code: "custom",
          message: PROFILE_FORM_VALIDATION.referralSourceRequired,
          path: ["referralSource"],
        });
      }
    });
}

export const profileDetailsFormSchema = createProfileDetailsFormSchema(false);

export type ProfileDetailsFormValues = z.infer<
  ReturnType<typeof createProfileDetailsFormSchema>
>;
