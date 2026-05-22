"use client";

import { useI18nConstants } from "@/hooks/useT";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { ProfileField } from "@/components/settings/ProfileField";
import { ProfileLocationField } from "@/components/settings/ProfileLocationField";
import { ProfilePhoneRow } from "@/components/settings/ProfilePhoneRow";
import { CHAT_LANGUAGE_OPTIONS, PROFILE_DETAILS } from "@/lib/constants/profile-details";
import { useProfileRashiNakshatra } from "@/hooks/useProfileRashiNakshatra";
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
  onRashiResolved,
}: ProfileDetailsFieldsProps) {
  const PD = useI18nConstants(PROFILE_DETAILS);
  const birthLocationForApi =
    form.birthLocationFull.trim() || form.placeOfBirth.trim();

  const { rashiBusy, rashiError, refreshRashi } = useProfileRashiNakshatra({
    enabled: isEditing,
    dateOfBirth: form.dateOfBirth,
    timeOfBirth: form.timeOfBirth,
    birthLocation: birthLocationForApi,
    onResolved: (rashi, nakshatra) => onRashiResolved?.(rashi, nakshatra),
  });

  return (
    <div className="flex flex-col gap-3.5">
      <ProfileField
        appearance="profile"
        required
        label={PD.firstName}
        value={form.firstName}
        onChange={(v) => setField("firstName", v)}
        isEditable={isEditing}
        placeholder="First name"
      />
      <ProfileField
        appearance="profile"
        required
        label={PD.lastName}
        value={form.lastName}
        onChange={(v) => setField("lastName", v)}
        isEditable={isEditing}
        placeholder="Last name"
      />
      <ProfileField
        appearance="profile"
        required
        label={PD.email}
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
          {PD.chatLanguage}
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
        label={PD.dateOfBirth}
        type="date"
        value={form.dateOfBirth}
        onChange={(v) => setField("dateOfBirth", v)}
        isEditable={isEditing}
        onBlurCommit={() => void refreshRashi()}
      />
      <ProfileField
        appearance="profile"
        required
        label={PD.timeOfBirth}
        type="time"
        value={form.timeOfBirth}
        onChange={(v) => setField("timeOfBirth", v)}
        isEditable={isEditing}
        onBlurCommit={() => void refreshRashi()}
      />

      <ProfileLocationField
        label={PD.placeOfBirth}
        required
        value={form.placeOfBirth}
        fullLocation={form.birthLocationFull}
        isEditable={isEditing}
        placeholder="Place of birth"
        onChange={(city, full) => {
          setField("placeOfBirth", city);
          setField("birthLocationFull", full);
        }}
        onBlurCommit={() => void refreshRashi()}
      />
      <ProfileLocationField
        label={PD.currentLocation}
        value={form.preferredLocation}
        fullLocation={form.preferredLocationFull}
        isEditable={isEditing}
        placeholder="Current location"
        onChange={(city, full) => {
          setField("preferredLocation", city);
          setField("preferredLocationFull", full);
        }}
      />

      {rashiBusy ? (
        <p className="flex items-center gap-2 text-xs font-medium text-black/55">
          <Loader variant="inline" size="sm" />
          {PD.rashiResolving}
        </p>
      ) : null}
      {rashiError ? (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">{rashiError}</p>
      ) : null}

      <ProfileField
        appearance="profile"
        required
        label={PD.rasi}
        value={form.rashi}
        onChange={(v) => setField("rashi", v)}
        isEditable={false}
        placeholder="Rasi"
      />
      <ProfileField
        appearance="profile"
        required
        label={PD.nakshatram}
        value={form.nakshatra}
        onChange={(v) => setField("nakshatra", v)}
        isEditable={false}
        placeholder="Nakshatram"
      />

      {isEditing ? (
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
            <Loader variant="inline" size="sm" />
          ) : (
            PD.save
          )}
        </Button>
      ) : null}
    </div>
  );
}

