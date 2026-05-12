/**
 * Profile Details screen — mirrors Flutter `profile_page.dart` field labels.
 */

export const PROFILE_DETAILS = {
  title: "Profile Details",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phone: "Phone Number",
  chatLanguage: "AI Chat Language",
  dateOfBirth: "Date of Birth",
  timeOfBirth: "Time of Birth",
  placeOfBirth: "Place of Birth",
  currentLocation: "Current Location",
  rasi: "Rasi",
  nakshatram: "Nakshatram",
  verify: "Verify",
  save: "Save",
  edit: "Edit",
  discard: "Discard",
} as const;

/** Default chat options — align with backend `VALID_LANGUAGES` / Flutter. */
export const CHAT_LANGUAGE_OPTIONS = [
  "English",
  "Hindi",
  "Tamil",
  "Telugu",
  "Marathi",
  "Kannada",
  "Malayalam",
] as const;
