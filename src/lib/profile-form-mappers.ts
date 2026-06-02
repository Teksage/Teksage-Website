import { DEFAULT_CHAT_LANGUAGE, DEFAULT_COUNTRY_CODE_NUMERIC } from "@/lib/constants";
import { extractCityFromLocation } from "@/lib/profile-birth-normalize";
import type { ProfileDetailsFormValues } from "@/lib/profile-form-schema";
import type { UserProfile } from "@/types";

function splitNameForForm(u: UserProfile): { first: string; last: string } {
  if (u.firstName != null || u.lastName != null) {
    return { first: u.firstName ?? "", last: u.lastName ?? "" };
  }
  const display = u.name.trim();
  const email = u.email?.trim() ?? "";
  const mobile = u.mobile?.trim() ?? "";
  if (display && (display === email || display === mobile)) {
    return { first: "", last: "" };
  }
  const p = display.split(/\s+/);
  if (p.length === 0) return { first: "", last: "" };
  if (p.length === 1) return { first: p[0], last: "" };
  return { first: p[0], last: p.slice(1).join(" ") };
}

export function userToProfileFormValues(user: UserProfile): ProfileDetailsFormValues {
  const { first, last } = splitNameForForm(user);
  const birthFull = user.placeOfBirth ?? "";
  const prefFull = user.preferredLocation ?? "";
  return {
    firstName: first,
    lastName: last,
    email: user.email ?? "",
    mobile: user.mobile ?? "",
    countryCode: user.countryCode ?? DEFAULT_COUNTRY_CODE_NUMERIC,
    chatLanguages: user.chatLanguages ?? DEFAULT_CHAT_LANGUAGE,
    dateOfBirth: user.dateOfBirth ?? "",
    timeOfBirth: user.timeOfBirth ?? "",
    placeOfBirth: extractCityFromLocation(birthFull),
    birthLocationFull: birthFull,
    preferredLocation: extractCityFromLocation(prefFull),
    preferredLocationFull: prefFull,
    rashi: user.rashi ?? "",
    nakshatra: user.nakshatra ?? "",
  };
}

export function profileFormValuesToUpdate(
  data: ProfileDetailsFormValues,
  user: UserProfile
): Partial<UserProfile> {
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ").trim();
  return {
    name: name || user.name,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    mobile: data.mobile.replace(/\D/g, ""),
    countryCode: data.countryCode.replace(/\D/g, "") || DEFAULT_COUNTRY_CODE_NUMERIC,
    chatLanguages: data.chatLanguages,
    dateOfBirth: data.dateOfBirth,
    timeOfBirth: data.timeOfBirth,
    placeOfBirth: data.birthLocationFull.trim() || data.placeOfBirth.trim(),
    preferredLocation:
      data.preferredLocationFull.trim() || data.preferredLocation.trim(),
  };
}
