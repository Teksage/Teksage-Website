"use client";

import { useEffect, useMemo } from "react";
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
  const schema = useMemo(
    () => createProfileDetailsFormSchema(requireReferralSource),
    [requireReferralSource]
  );
  const methods = useForm<ProfileDetailsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: userToProfileFormValues(user),
    mode: "onSubmit",
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    reset(userToProfileFormValues(user));
  }, [user, reset]);

  const onValidSubmit = handleSubmit(
    async (data) => {
      if (!user.isEmailVerified) {
        showErrorAppSnackBar(PROFILE_FORM_VALIDATION.emailNotVerified, {
          position: "top",
        });
        return;
      }
      const ok = await onSave(profileFormValuesToUpdate(data, user));
      if (ok) onDoneEditing();
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
