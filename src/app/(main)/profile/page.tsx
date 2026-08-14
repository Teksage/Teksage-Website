"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useEffect, useState } from "react";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { ProfileDetailsForm } from "@/components/settings/ProfileDetailsForm";
import { ProfileDetailsHero } from "@/components/settings/ProfileDetailsHero";
import { ProfilePageHeader } from "@/components/settings/ProfilePageHeader";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { EmptyState } from "@/components/common/EmptyState";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import {
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  ROUTES,
} from "@/lib/constants";
import {
  PROFILE_DETAILS,
  PROFILE_LAYOUT,
} from "@/lib/constants/profile-details";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const PD = useI18nConstants(PROFILE_DETAILS);
  const router = useRouter();
  const { user, isLoading, isSaving, error, saveProfile, refetchProfile } =
    useProfile();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user?.isProfileUpdated === false) {
      setIsEditing(true);
    }
  }, [user?.isProfileUpdated]);

  const goBack = () => router.push(ROUTES.settings);

  const editAction =
    user && !isEditing && user.isProfileUpdated !== false ? (
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        className={PROFILE_LAYOUT.editButton}
      >
        {PD.edit}
      </button>
    ) : null;

  if (!user && !isLoading) {
    return (
      <div className={cn(PAGE_SHELL.column, PROFILE_LAYOUT.pageRoot)}>
        <MainTabViewportBackdrop
          className={MAIN_TAB_VIEWPORT_BACKDROP.profile}
        />
        <div className={cn(PAGE_SHELL.contentLayer, PROFILE_LAYOUT.desktopPanel)}>
          <ProfilePageHeader
            title={PD.title}
            subtitle={PD.subtitle}
            backLabel={PD.backLabel}
            onBack={goBack}
          />
          <EmptyState
            title={PD.notFoundTitle}
            description={PD.notFoundDescription}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(PAGE_SHELL.column, PROFILE_LAYOUT.pageRoot)}>
      <MainTabViewportBackdrop
        className={MAIN_TAB_VIEWPORT_BACKDROP.profile}
      />
      <div className={cn(PAGE_SHELL.contentLayer, PROFILE_LAYOUT.desktopPanel)}>
        <ProfilePageHeader
          title={PD.title}
          subtitle={PD.subtitle}
          backLabel={PD.backLabel}
          onBack={goBack}
          action={editAction}
        />

        <main className={PROFILE_LAYOUT.main}>
          {error ? (
            <p className={PROFILE_LAYOUT.errorBanner}>{error}</p>
          ) : null}
          {user ? <ProfileDetailsHero user={user} /> : null}
          {user ? (
            <ProfileDetailsForm
              key={user.id}
              user={user}
              isEditing={isEditing}
              onSave={saveProfile}
              isSaving={isSaving}
              onDoneEditing={() => setIsEditing(false)}
              onProfileRefresh={refetchProfile}
            />
          ) : null}
        </main>
      </div>
      <LoadingOverlay open={isLoading} />
    </div>
  );
}
