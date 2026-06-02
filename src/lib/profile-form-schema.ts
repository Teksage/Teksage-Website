import { z } from "zod";
import { PROFILE_FORM_VALIDATION } from "@/lib/constants/profile-form-validation";
import { LOGIN_EMAIL_REGEX, LOGIN_MOBILE_DIGITS_REGEX } from "@/lib/constants/validation-patterns";

export const profileDetailsFormSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, PROFILE_FORM_VALIDATION.firstNameRequired),
    lastName: z
      .string()
      .trim()
      .min(1, PROFILE_FORM_VALIDATION.lastNameRequired),
    email: z
      .string()
      .trim()
      .min(1, PROFILE_FORM_VALIDATION.emailRequired)
      .regex(LOGIN_EMAIL_REGEX, PROFILE_FORM_VALIDATION.emailInvalid),
    mobile: z.string(),
    countryCode: z.string(),
    chatLanguages: z
      .string()
      .trim()
      .min(1, PROFILE_FORM_VALIDATION.chatLanguageRequired),
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
    if (mobileDigits.length > 0 && !LOGIN_MOBILE_DIGITS_REGEX.test(mobileDigits)) {
      ctx.addIssue({
        code: "custom",
        message: PROFILE_FORM_VALIDATION.mobileInvalid,
        path: ["mobile"],
      });
    }
  });

export type ProfileDetailsFormValues = z.infer<typeof profileDetailsFormSchema>;
