"use client";

import { Button } from "@/components/ui/button";
import { ProfileField } from "@/components/settings/ProfileField";
import { ProfilePhoneRow } from "@/components/settings/ProfilePhoneRow";
import { Loader } from "@/components/common/Loader";
import { CHAT_LANGUAGE_OPTIONS, PROFILE_DETAILS } from "@/lib/constants/profile-details";
import { cn } from "@/lib/utils";
import type { ProfileDetailsFieldsProps } from "@/types";

export function ProfileDetailsFields({
  form,
  setField,
  user,
  isEditing,
  isSaving,
  onSave,
  onProfileRefresh,
}: ProfileDetailsFieldsProps) {
  return (
    <div className="flex flex-col gap-3.5">
      <ProfileField
        appearance="profile"
        required
        label={PROFILE_DETAILS.firstName}
        value={form.firstName}
        onChange={(v) => setField("firstName", v)}
        isEditable={isEditing}
        placeholder="First name"
      />
      <ProfileField
        appearance="profile"
        required
        label={PROFILE_DETAILS.lastName}
        value={form.lastName}
        onChange={(v) => setField("lastName", v)}
        isEditable={isEditing}
        placeholder="Last name"
      />
      <ProfileField
        appearance="profile"
        required
        label={PROFILE_DETAILS.email}
        type="email"
        value={form.email}
        onChange={(v) => setField("email", v)}
        isEditable={isEditing}
        placeholder="Email"
      />

      <ProfilePhoneRow
        countryCode={form.countryCode}
        mobile={form.mobile}
        onMobileChange={(v) => setField("mobile", v)}
        isMobileVerified={user.isMobileVerified}
        isEditing={isEditing}
        onVerificationSuccess={onProfileRefresh}
      />

      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-[var(--color-brand-black)]">
          {PROFILE_DETAILS.chatLanguage}
          <span className="text-[var(--color-brand-error)]">*</span>
        </span>
        <select
          value={form.chatLanguages}
          onChange={(e) => setField("chatLanguages", e.target.value)}
          disabled={!isEditing}
          className={cn(
            "h-12 w-full rounded-xl border border-black/15 bg-neutral-100 px-3 text-sm font-medium",
            "text-[var(--color-brand-black)] outline-none",
            "focus:border-[var(--color-brand-primary)]",
            !isEditing && "cursor-not-allowed opacity-90"
          )}
        >
          {CHAT_LANGUAGE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <ProfileField
        appearance="profile"
        required
        label={PROFILE_DETAILS.dateOfBirth}
        type="date"
        value={form.dateOfBirth}
        onChange={(v) => setField("dateOfBirth", v)}
        isEditable={isEditing}
      />
      <ProfileField
        appearance="profile"
        required
        label={PROFILE_DETAILS.timeOfBirth}
        type="time"
        value={form.timeOfBirth}
        onChange={(v) => setField("timeOfBirth", v)}
        isEditable={isEditing}
      />
      <ProfileField
        appearance="profile"
        required
        label={PROFILE_DETAILS.placeOfBirth}
        value={form.placeOfBirth}
        onChange={(v) => setField("placeOfBirth", v)}
        isEditable={isEditing}
        placeholder="Place of birth"
      />
      <ProfileField
        appearance="profile"
        label={PROFILE_DETAILS.currentLocation}
        value={form.preferredLocation}
        onChange={(v) => setField("preferredLocation", v)}
        isEditable={isEditing}
        placeholder="Current location"
      />
      <ProfileField
        appearance="profile"
        required
        label={PROFILE_DETAILS.rasi}
        value={form.rashi}
        onChange={(v) => setField("rashi", v)}
        isEditable={false}
        placeholder="Rasi"
      />
      <ProfileField
        appearance="profile"
        required
        label={PROFILE_DETAILS.nakshatram}
        value={form.nakshatra}
        onChange={(v) => setField("nakshatra", v)}
        isEditable={false}
        placeholder="Nakshatram"
      />

      {isEditing && (
        <Button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className={cn(
            "mt-4 h-11 w-full rounded-full bg-[var(--color-brand-primary)]",
            "font-semibold text-white hover:bg-[var(--color-brand-primary)]/90"
          )}
        >
          {isSaving ? (
            <Loader variant="spinner" size="sm" className="border-t-white" />
          ) : (
            PROFILE_DETAILS.save
          )}
        </Button>
      )}
    </div>
  );
}
