"use client";

import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useI18nConstants } from "@/hooks/useT";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { SubscribePromptDialog } from "@/components/common/SubscribePromptDialog";
import { ProfileChatLanguageField } from "@/components/settings/ProfileChatLanguageField";
import { ProfileDetailsBirthSection } from "@/components/settings/ProfileDetailsBirthSection";
import { ProfileField } from "@/components/settings/ProfileField";
import { ProfileEmailRow } from "@/components/settings/ProfileEmailRow";
import { ProfilePhoneRow } from "@/components/settings/ProfilePhoneRow";
import { ProfileReferralSourceField } from "@/components/settings/ProfileReferralSourceField";
import { PartnerReferralCodeSection } from "@/components/settings/PartnerReferralCodeSection";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";
import {
  PROFILE_DETAILS,
  PROFILE_LAYOUT as L,
} from "@/lib/constants/profile-details";
import { useProfileRashiNakshatra } from "@/hooks/useProfileRashiNakshatra";
import type { ProfileDetailsFormValues } from "@/lib/profile-form-schema";
import type { ProfileDetailsFieldsProps } from "@/types";

export function ProfileDetailsFields({
  user,
  isEditing,
  isSaving,
  onProfileRefresh,
}: ProfileDetailsFieldsProps) {
  const PD = useI18nConstants(PROFILE_DETAILS);
  const { hasPremiumAccess, planStatus } = usePremiumAccess();
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProfileDetailsFormValues>();

  const form = watch();
  const rashiWatch = useWatch({ name: "rashi" }) ?? "";
  const nakshatraWatch = useWatch({ name: "nakshatra" }) ?? "";
  const birthLocationForApi =
    form.birthLocationFull.trim() || form.placeOfBirth.trim();
  const touch = { shouldDirty: true as const };
  const showReferral = user.isProfileUpdated === false;
  const showPartner = Boolean(user.showPartnerReferralSection);

  const { rashiBusy, rashiError, refreshRashi } = useProfileRashiNakshatra({
    enabled: isEditing,
    dateOfBirth: form.dateOfBirth,
    timeOfBirth: form.timeOfBirth,
    birthLocation: birthLocationForApi,
    onResolved: (rashi, nakshatra) => {
      setValue("rashi", rashi, touch);
      setValue("nakshatra", nakshatra, touch);
    },
  });

  function guardBirthEdit(): boolean {
    if (!isEditing) return true;
    if (user.isProfileUpdated === false) return true;
    if (hasPremiumAccess) return true;
    setSubscribeOpen(true);
    return false;
  }

  return (
    <div className={L.sectionsStack}>
      <section className={L.sectionCard}>
        <h2 className={L.sectionTitle}>{PD.sectionPersonal}</h2>
        <div className={L.fieldsGrid}>
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
          <ProfileEmailRow
            email={form.email}
            onEmailChange={(v) => setValue("email", v, touch)}
            isEmailVerified={user.isEmailVerified}
            isEditing={isEditing}
            onVerificationSuccess={onProfileRefresh}
            hasError={Boolean(errors.email)}
            errorMessage={errors.email?.message}
            required={user.isMobileVerified !== true}
          />
          <ProfilePhoneRow
            countryCode={form.countryCode}
            mobile={form.mobile}
            onCountryCodeChange={(v) => setValue("countryCode", v, touch)}
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
          {showReferral ? (
            <ProfileReferralSourceField
              value={form.referralSource}
              onChange={(v) => setValue("referralSource", v, touch)}
              isEditing={isEditing}
              hasError={Boolean(errors.referralSource)}
              errorMessage={errors.referralSource?.message}
            />
          ) : null}
        </div>
        {showPartner ? (
          <div className="mt-4">
            <PartnerReferralCodeSection
              show
              onApplied={onProfileRefresh}
            />
          </div>
        ) : null}
      </section>

      <ProfileDetailsBirthSection
        form={{ ...form, rashi: rashiWatch, nakshatra: nakshatraWatch }}
        errors={errors}
        setValue={setValue}
        touch={touch}
        isEditing={isEditing}
        guardBirthEdit={guardBirthEdit}
        refreshRashi={refreshRashi}
        rashiBusy={rashiBusy}
        rashiError={rashiError}
      />

      {isEditing ? (
        <div className={L.saveRow}>
          <Button type="submit" disabled={isSaving} className={L.saveButton}>
            {isSaving ? <Loader variant="inline" size="sm" /> : PD.save}
          </Button>
        </div>
      ) : null}

      <SubscribePromptDialog
        open={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
        planStatus={
          planStatus.trim().toLowerCase() === "expired" ? "expired" : "default"
        }
      />
    </div>
  );
}
