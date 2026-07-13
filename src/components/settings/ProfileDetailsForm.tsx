"use client";

import { useEffect, useMemo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileDetailsFields } from "@/components/settings/ProfileDetailsFields";
import { showErrorAppSnackBar } from "@/lib/app-snackbar";
import { PROFILE_FORM_VALIDATION } from "@/lib/constants/profile-form-validation";
import {
  createProfileDetailsFormSchema,
  type ProfileDetailsFormValues,
} from "@/lib/profile-form-schema";
import {
  mergeProfileFormAfterUserRefresh,
  profileFormValuesToUpdate,
  userToProfileFormValues,
} from "@/lib/profile-form-mappers";
import type { ProfileDetailsFormProps } from "@/types";

export function ProfileDetailsForm({
  user,
  isEditing,
  onSave,
  isSaving,
  onDoneEditing,
  onProfileRefresh,
  className,
}: ProfileDetailsFormProps) {
  const requireReferralSource = user.isProfileUpdated === false;
  const emailOptional = user.isMobileVerified === true;
  const schema = useMemo(
    () => createProfileDetailsFormSchema(requireReferralSource, emailOptional),
    [requireReferralSource, emailOptional]
  );
  const methods = useForm<ProfileDetailsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: userToProfileFormValues(user),
    mode: "onSubmit",
  });

  const { reset, handleSubmit, getValues } = methods;
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    const fromUser = userToProfileFormValues(user);
    if (!hasHydratedRef.current) {
      reset(fromUser);
      hasHydratedRef.current = true;
      return;
    }
    // After email/mobile verify refetch: keep typed edits, fill only empty fields.
    reset(mergeProfileFormAfterUserRefresh(getValues(), fromUser));
  }, [user, reset, getValues]);

  const onValidSubmit = handleSubmit(
    async (data) => {
      if (!user.isEmailVerified && !user.isMobileVerified) {
        showErrorAppSnackBar(PROFILE_FORM_VALIDATION.emailNotVerified, {
          position: "top",
        });
        return;
      }
      const ok = await onSave(profileFormValuesToUpdate(data, user));
      if (ok) {
        reset(data);
        onDoneEditing();
      }
    },
    () => {
      showErrorAppSnackBar(PROFILE_FORM_VALIDATION.fillAllRequired, {
        position: "top",
      });
    }
  );

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={onValidSubmit} noValidate>
        <ProfileDetailsFields
          user={user}
          isEditing={isEditing}
          isSaving={isSaving}
          onProfileRefresh={onProfileRefresh}
        />
      </form>
    </FormProvider>
  );
}
