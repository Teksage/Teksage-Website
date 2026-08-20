import { DEFAULT_CHAT_LANGUAGE, DEFAULT_COUNTRY_CODE_NUMERIC } from "@/lib/constants";
import {
  formatProfileNakshatraDisplay,
  formatProfileRashiDisplay,
} from "@/lib/constants/rashi-sanskrit";
import { normalizePhoneParts } from "@/lib/phone-utils";
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
  const phone = normalizePhoneParts(user.countryCode, user.mobile);
  return {
    firstName: first,
    lastName: last,
    email: user.email ?? "",
    mobile: phone.mobile,
    countryCode: phone.countryCode,
    chatLanguages: user.chatLanguages ?? DEFAULT_CHAT_LANGUAGE,
    referralSource: user.referralSource ?? "",
    dateOfBirth: user.dateOfBirth ?? "",
    timeOfBirth: user.timeOfBirth ?? "",
    placeOfBirth: extractCityFromLocation(birthFull),
    birthLocationFull: birthFull,
    preferredLocation: extractCityFromLocation(prefFull),
    preferredLocationFull: prefFull,
    rashi: formatProfileRashiDisplay(user.rashi ?? ""),
    nakshatra: formatProfileNakshatraDisplay(user.nakshatra ?? ""),
  };
}

export function profileFormValuesToUpdate(
  data: ProfileDetailsFormValues,
  user: UserProfile
): Partial<UserProfile> {
  const name = [data.firstName, data.lastName].filter(Boolean).join(" ").trim();
  const phone = normalizePhoneParts(data.countryCode, data.mobile);
  return {
    name: name || user.name,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    mobile: phone.mobile,
    countryCode: phone.countryCode || DEFAULT_COUNTRY_CODE_NUMERIC,
    chatLanguages: data.chatLanguages,
    dateOfBirth: data.dateOfBirth,
    timeOfBirth: data.timeOfBirth,
    placeOfBirth: data.birthLocationFull.trim() || data.placeOfBirth.trim(),
    preferredLocation:
      data.preferredLocationFull.trim() || data.preferredLocation.trim(),
    ...(data.referralSource.trim()
      ? { referralSource: data.referralSource.trim() }
      : {}),
  };
}

/** Keep typed profile edits after verify refetch; fill only empty fields from server. */
export function mergeProfileFormAfterUserRefresh(
  current: ProfileDetailsFormValues,
  fromUser: ProfileDetailsFormValues
): ProfileDetailsFormValues {
  const pick = (cur: string, next: string) =>
    cur.trim() !== "" ? cur : next;

  // Login often hydrates dial as default +91 before profile loads. Do not keep
  // that default when the server has a real non-India country and phone is empty.
  const countryCode =
    !current.mobile.trim() &&
    current.countryCode === DEFAULT_COUNTRY_CODE_NUMERIC &&
    fromUser.countryCode.trim() &&
    fromUser.countryCode !== DEFAULT_COUNTRY_CODE_NUMERIC
      ? fromUser.countryCode
      : pick(current.countryCode, fromUser.countryCode);

  return {
    firstName: pick(current.firstName, fromUser.firstName),
    lastName: pick(current.lastName, fromUser.lastName),
    email: pick(current.email, fromUser.email),
    mobile: pick(current.mobile, fromUser.mobile),
    countryCode,
    chatLanguages: pick(current.chatLanguages, fromUser.chatLanguages),
    referralSource: pick(current.referralSource, fromUser.referralSource),
    dateOfBirth: pick(current.dateOfBirth, fromUser.dateOfBirth),
    timeOfBirth: pick(current.timeOfBirth, fromUser.timeOfBirth),
    placeOfBirth: pick(current.placeOfBirth, fromUser.placeOfBirth),
    birthLocationFull: pick(
      current.birthLocationFull,
      fromUser.birthLocationFull
    ),
    preferredLocation: pick(
      current.preferredLocation,
      fromUser.preferredLocation
    ),
    preferredLocationFull: pick(
      current.preferredLocationFull,
      fromUser.preferredLocationFull
    ),
    rashi: pick(current.rashi, fromUser.rashi),
    nakshatra: pick(current.nakshatra, fromUser.nakshatra),
  };
}
