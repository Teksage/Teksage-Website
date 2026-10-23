import type { MarathonBirthDraft, RelatedProfile, RelatedProfileInput } from "@/types/marathon";
import type { UserProfile } from "@/types/user-profile";

export function emptyBirthDraft(): MarathonBirthDraft {
  return {
    first: "",
    last: "",
    dob: "",
    tob: "",
    birth: "",
    birthFull: "",
    current: "",
    currentFull: "",
  };
}

/** True once this account already has a chart we can book against. */
export function profileHasBirthRecord(profile: UserProfile | null): boolean {
  if (!profile) return false;
  return Boolean(
    profile.firstName?.trim()
    && profile.dateOfBirth?.trim()
    && profile.timeOfBirth?.trim()
    && profile.placeOfBirth?.trim()
  );
}

export function birthDraftFromProfile(profile: UserProfile): MarathonBirthDraft {
  return {
    first: profile.firstName ?? "",
    last: profile.lastName ?? "",
    dob: (profile.dateOfBirth ?? "").slice(0, 10),
    tob: (profile.timeOfBirth ?? "").slice(0, 5),
    birth: profile.placeOfBirth ?? "",
    birthFull: profile.placeOfBirth ?? "",
    current: profile.preferredLocation ?? "",
    currentFull: profile.preferredLocation ?? "",
  };
}

export function birthDraftFromPerson(person: RelatedProfile): MarathonBirthDraft {
  const place = person.place_of_birth ?? "";
  const current = person.preferred_location ?? "";
  return {
    first: person.first_name,
    last: person.last_name,
    dob: (person.date_of_birth ?? "").slice(0, 10),
    tob: (person.time_of_birth ?? "").slice(0, 5),
    birth: place,
    birthFull: place,
    current,
    currentFull: current,
  };
}

export function birthDraftFingerprint(draft: MarathonBirthDraft, relationship: string): string {
  return [draft.first, draft.last, draft.dob, draft.tob, draft.birthFull, draft.currentFull, relationship].join("|");
}

export function birthDraftToInput(draft: MarathonBirthDraft, relationship: string): RelatedProfileInput {
  const clock = draft.tob.length === 5 ? `${draft.tob}:00` : draft.tob;
  return {
    first_name: draft.first.trim(),
    last_name: draft.last.trim(),
    date_of_birth: draft.dob,
    time_of_birth: clock,
    place_of_birth: draft.birthFull.trim(),
    preferred_location: draft.currentFull.trim(),
    relationship,
  };
}
