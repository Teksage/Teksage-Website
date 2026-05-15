"use client";

import { useState } from "react";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { ProfileDetailsForm } from "@/components/settings/ProfileDetailsForm";
import { FullPageLoader } from "@/components/common/Loader";
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
  const router = useRouter();
  const { user, isLoading, isSaving, error, saveProfile, refetchProfile } =
    useProfile();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <FullPageLoader />;

  if (!user) {
    return (
      <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
        <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.profile} />
        <AppHeader
          title={PROFILE_DETAILS.title}
          showBack
          onBackClick={() => router.back()}
          className={PAGE_SHELL.contentLayer}
        />
        <EmptyState
          title={PROFILE_DETAILS.notFoundTitle}
          description={PROFILE_DETAILS.notFoundDescription}
        />
      </div>
    );
  }

  return (
    <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.profile} />
      <AppHeader
        title={PROFILE_DETAILS.title}
        showBack
        onBackClick={() => router.back()}
        className={PAGE_SHELL.contentLayer}
        action={
          !isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={PROFILE_LAYOUT.editButton}
            >
              {PROFILE_DETAILS.edit}
            </button>
          ) : null
        }
      />

      <main className={PROFILE_LAYOUT.main}>
        {error ? (
          <p className={PROFILE_LAYOUT.errorBanner}>{error}</p>
        ) : null}
        <ProfileDetailsForm
          key={`${user.id}-${user.email ?? ""}-${user.mobile ?? ""}`}
          user={user}
          isEditing={isEditing}
          onSave={saveProfile}
          isSaving={isSaving}
          onDoneEditing={() => setIsEditing(false)}
          onProfileRefresh={refetchProfile}
        />
      </main>
    </div>
  );
}
