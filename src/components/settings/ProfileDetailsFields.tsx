"use client";

import { useFormContext } from "react-hook-form";
import { useI18nConstants } from "@/hooks/useT";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { ProfileChatLanguageField } from "@/components/settings/ProfileChatLanguageField";
import { ProfileField } from "@/components/settings/ProfileField";
import { ProfileLocationField } from "@/components/settings/ProfileLocationField";
import { ProfilePhoneRow } from "@/components/settings/ProfilePhoneRow";
import { PROFILE_DETAILS } from "@/lib/constants/profile-details";
import { useProfileRashiNakshatra } from "@/hooks/useProfileRashiNakshatra";
import type { ProfileDetailsFormValues } from "@/lib/profile-form-schema";
import { cn } from "@/lib/utils";
import type { ProfileDetailsFieldsProps } from "@/types";

export function ProfileDetailsFields({
  user,
  isEditing,
  isSaving,
  onProfileRefresh,
}: ProfileDetailsFieldsProps) {
  const PD = useI18nConstants(PROFILE_DETAILS);
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProfileDetailsFormValues>();

  const form = watch();
  const birthLocationForApi =
    form.birthLocationFull.trim() || form.placeOfBirth.trim();

  const { rashiBusy, rashiError, refreshRashi } = useProfileRashiNakshatra({
    enabled: isEditing,
    dateOfBirth: form.dateOfBirth,
    timeOfBirth: form.timeOfBirth,
    birthLocation: birthLocationForApi,
    onResolved: (rashi, nakshatra) => {
      setValue("rashi", rashi);
      setValue("nakshatra", nakshatra);
    },
  });

  const touch = { shouldDirty: true as const };

  return (
    <div className="flex flex-col gap-3.5">
      <ProfileField
        appearance="profile"
        required
        label={PD.firstName}
        value={form.firstName}
        onChange={(v) => setValue("firstName", v, touch)}
        isEditable={isEditing}
        placeholder="First name"
        hasError={Boolean(errors.firstName)}
        errorMessage={errors.firstName?.message}
      />
      <ProfileField
        appearance="profile"
        required
        label={PD.lastName}
        value={form.lastName}
        onChange={(v) => setValue("lastName", v, touch)}
        isEditable={isEditing}
        placeholder="Last name"
        hasError={Boolean(errors.lastName)}
        errorMessage={errors.lastName?.message}
      />
      <ProfileField
        appearance="profile"
        required
        label={PD.email}
        type="email"
        value={form.email}
        onChange={(v) => setValue("email", v, touch)}
        isEditable={isEditing}
        placeholder="Email"
        hasError={Boolean(errors.email)}
        errorMessage={errors.email?.message}
      />

      <ProfilePhoneRow
        countryCode={form.countryCode}
        mobile={form.mobile}
        onMobileChange={(v) => setValue("mobile", v, touch)}
        isMobileVerified={user.isMobileVerified}
        isEditing={isEditing}
        onVerificationSuccess={onProfileRefresh}
        hasError={Boolean(errors.mobile)}
        errorMessage={errors.mobile?.message}
      />

      <ProfileChatLanguageField
        value={form.chatLanguages}
        onChange={(v) => setValue("chatLanguages", v, touch)}
        isEditing={isEditing}
        hasError={Boolean(errors.chatLanguages)}
        errorMessage={errors.chatLanguages?.message}
      />

      <ProfileField
        appearance="profile"
        required
        label={PD.dateOfBirth}
        type="date"
        value={form.dateOfBirth}
        onChange={(v) => setValue("dateOfBirth", v, touch)}
        isEditable={isEditing}
        onBlurCommit={() => void refreshRashi()}
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
        hasError={Boolean(errors.preferredLocation)}
        errorMessage={errors.preferredLocation?.message}
      />

      {rashiBusy ? (
        <div className="flex items-center gap-2 text-xs font-medium text-black/55">
          <Loader variant="inline" size="sm" />
          {PD.rashiResolving}
        </div>
      ) : null}
      {rashiError ? (
        <p className="text-xs font-semibold text-[var(--color-brand-error)]">{rashiError}</p>
      ) : null}

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

      {isEditing ? (
        <Button
          type="submit"
          disabled={isSaving}
          className={cn(
            "mt-4 h-11 w-full rounded-full bg-[var(--color-brand-primary)]",
            "font-semibold text-white hover:bg-[var(--color-brand-primary)]/90"
          )}
        >
          {isSaving ? <Loader variant="inline" size="sm" /> : PD.save}
        </Button>
      ) : null}
    </div>
  );
}
