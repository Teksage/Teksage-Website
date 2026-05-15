"use client";

import { useState } from "react";
import { ProfileDetailsFields } from "@/components/settings/ProfileDetailsFields";
import type {
  ProfileDetailsFormProps,
  ProfileDetailsFormState,
  UserProfile,
} from "@/types";
import { DEFAULT_CHAT_LANGUAGE, DEFAULT_COUNTRY_CODE_NUMERIC } from "@/lib/constants";

function splitNameForForm(u: UserProfile): { first: string; last: string } {
  if (u.firstName != null || u.lastName != null) {
    return { first: u.firstName ?? "", last: u.lastName ?? "" };
  }
  const p = u.name.trim().split(/\s+/);
  if (p.length === 0) return { first: "", last: "" };
  if (p.length === 1) return { first: p[0], last: "" };
  return { first: p[0], last: p.slice(1).join(" ") };
}

function userToFormState(user: UserProfile): ProfileDetailsFormState {
  const { first, last } = splitNameForForm(user);
  return {
    firstName: first,
    lastName: last,
    email: user.email ?? "",
    mobile: user.mobile ?? "",
    countryCode: user.countryCode ?? DEFAULT_COUNTRY_CODE_NUMERIC,
    chatLanguages: user.chatLanguages ?? DEFAULT_CHAT_LANGUAGE,
    dateOfBirth: user.dateOfBirth ?? "",
    timeOfBirth: user.timeOfBirth ?? "",
    placeOfBirth: user.placeOfBirth ?? "",
    preferredLocation: user.preferredLocation ?? "",
    rashi: user.rashi ?? "",
    nakshatra: user.nakshatra ?? "",
  };
}

export function ProfileDetailsForm({
  user,
  isEditing,
  onSave,
  isSaving,
  onDoneEditing,
  onProfileRefresh,
  className,
}: ProfileDetailsFormProps) {
  const [form, setForm] = useState<ProfileDetailsFormState>(() =>
    userToFormState(user)
  );

  function setField<K extends keyof ProfileDetailsFormState>(
    key: K,
    value: ProfileDetailsFormState[K]
  ) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function handleSave() {
    const name = [form.firstName, form.lastName].filter(Boolean).join(" ").trim();
    const ok = await onSave({
      name: name || user.name,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      mobile: form.mobile,
      countryCode: form.countryCode,
      chatLanguages: form.chatLanguages,
      dateOfBirth: form.dateOfBirth,
      timeOfBirth: form.timeOfBirth,
      placeOfBirth: form.placeOfBirth,
      preferredLocation: form.preferredLocation,
    });
    if (ok) onDoneEditing();
  }

  return (
    <div className={className}>
      <ProfileDetailsFields
        form={form}
        setField={setField}
        user={user}
        isEditing={isEditing}
        isSaving={isSaving}
        onSave={handleSave}
        onProfileRefresh={onProfileRefresh}
      />
    </div>
  );
}
