"use client";

import { useI18nConstants } from "@/hooks/useT";
import { Loader } from "@/components/common/Loader";
import { ProfileDateOfBirthField } from "@/components/settings/ProfileDateOfBirthField";
import { ProfileField } from "@/components/settings/ProfileField";
import { ProfileLocationField } from "@/components/settings/ProfileLocationField";
import {
  PROFILE_DETAILS,
  PROFILE_LAYOUT as L,
} from "@/lib/constants/profile-details";
import type { ProfileDetailsBirthSectionProps } from "@/types";

export function ProfileDetailsBirthSection({
  form,
  errors,
  setValue,
  touch,
  isEditing,
  guardBirthEdit,
  refreshRashi,
  rashiBusy,
  rashiError,
}: ProfileDetailsBirthSectionProps) {
  const PD = useI18nConstants(PROFILE_DETAILS);

  return (
    <section className={L.sectionCard}>
      <h2 className={L.sectionTitle}>{PD.sectionBirth}</h2>
      <div className={L.fieldsGrid}>
        <ProfileDateOfBirthField
          required
          label={PD.dateOfBirth}
          value={form.dateOfBirth}
          onChange={(v) => setValue("dateOfBirth", v, touch)}
          isEditable={isEditing}
          onBlurCommit={() => void refreshRashi()}
          onFocusAttempt={guardBirthEdit}
          hasError={Boolean(errors.dateOfBirth)}
          errorMessage={errors.dateOfBirth?.message}
        />
        <ProfileField
          appearance="profile"
          required
          label={PD.timeOfBirth}
          type="time"
          value={form.timeOfBirth}
          onChange={(v) => setValue("timeOfBirth", v, touch)}
          isEditable={isEditing}
          onBlurCommit={() => void refreshRashi()}
          onFocusAttempt={guardBirthEdit}
          hasError={Boolean(errors.timeOfBirth)}
          errorMessage={errors.timeOfBirth?.message}
        />
        <ProfileLocationField
          label={PD.placeOfBirth}
          required
          value={form.placeOfBirth}
          fullLocation={form.birthLocationFull}
          isEditable={isEditing}
          placeholder="Place of birth"
          onChange={(city, full) => {
            setValue("placeOfBirth", city, touch);
            setValue("birthLocationFull", full, touch);
          }}
          onBlurCommit={() => void refreshRashi()}
          onFocusAttempt={guardBirthEdit}
          hasError={Boolean(errors.placeOfBirth)}
          errorMessage={errors.placeOfBirth?.message}
        />
        <ProfileLocationField
          label={PD.currentLocation}
          required
          value={form.preferredLocation}
          fullLocation={form.preferredLocationFull}
          isEditable={isEditing}
          placeholder="Current location"
          onChange={(city, full) => {
            setValue("preferredLocation", city, touch);
            setValue("preferredLocationFull", full, touch);
          }}
          onFocusAttempt={guardBirthEdit}
          hasError={Boolean(errors.preferredLocation)}
          errorMessage={errors.preferredLocation?.message}
        />
        <ProfileField
          appearance="profile"
          required
          label={PD.rasi}
          value={form.rashi}
          onChange={(v) => setValue("rashi", v, touch)}
          isEditable={false}
          placeholder="Rasi"
        />
        <ProfileField
          appearance="profile"
          required
          label={PD.nakshatram}
          value={form.nakshatra}
          onChange={(v) => setValue("nakshatra", v, touch)}
          isEditable={false}
          placeholder="Nakshatram"
        />
      </div>
      {rashiBusy ? (
        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-black/55">
          <Loader variant="inline" size="sm" />
          {PD.rashiResolving}
        </div>
      ) : null}
      {rashiError ? (
        <p className="mt-2 text-xs font-semibold text-[var(--color-brand-error)]">
          {rashiError}
        </p>
      ) : null}
    </section>
  );
}
