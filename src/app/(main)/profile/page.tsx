"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useState } from "react";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { ProfileDetailsForm } from "@/components/settings/ProfileDetailsForm";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { EmptyState } from "@/components/common/EmptyState";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import {
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
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

  if (!user && !isLoading) {
    return (
      <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
        <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.profile} />
        <AppHeader
          title={PD.title}
          showBack
          onBackClick={() => router.back()}
          className={PAGE_SHELL.contentLayer}
        />
        <EmptyState
          title={PD.notFoundTitle}
          description={PD.notFoundDescription}
        />
      </div>
    );
  }

  return (
    <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.profile} />
      <AppHeader
        title={PD.title}
        showBack
        onBackClick={() => router.back()}
        className={PAGE_SHELL.contentLayer}
        action={
          user && !isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={PROFILE_LAYOUT.editButton}
            >
              {PD.edit}
            </button>
          ) : null
        }
      />

      <main className={PROFILE_LAYOUT.main}>
        {error ? (
          <p className={PROFILE_LAYOUT.errorBanner}>{error}</p>
        ) : null}
        {user ? (
          <ProfileDetailsForm
            key={`${user.id}-${user.email ?? ""}-${user.mobile ?? ""}`}
            user={user}
            isEditing={isEditing}
            onSave={saveProfile}
            isSaving={isSaving}
            onDoneEditing={() => setIsEditing(false)}
            onProfileRefresh={refetchProfile}
          />
        ) : null}
      </main>
      <LoadingOverlay open={isLoading} />
    </div>
  );
}
