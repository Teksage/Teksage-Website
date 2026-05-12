"use client";

import { useState } from "react";
import { AppHeader } from "@/components/common/AppHeader";
import { ProfileDetailsForm } from "@/components/settings/ProfileDetailsForm";
import { FullPageLoader } from "@/components/common/Loader";
import { EmptyState } from "@/components/common/EmptyState";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import { PROFILE_DETAILS } from "@/lib/constants/profile-details";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, isSaving, error, saveProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <FullPageLoader />;

  if (!user) {
    return (
      <div className="flex min-h-dvh flex-col bg-white">
        <AppHeader
          title={PROFILE_DETAILS.title}
          showBack
          onBackClick={() => router.back()}
        />
        <EmptyState
          title="Profile not found"
          description="Please log in to view your profile."
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-white">
      <AppHeader
        title={PROFILE_DETAILS.title}
        showBack
        onBackClick={() => router.back()}
        action={
          !isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="mr-1 px-2 py-2 text-lg font-semibold text-[var(--color-brand-primary)]"
            >
              {PROFILE_DETAILS.edit}
            </button>
          ) : null
        }
      />

      <main className="mx-auto w-full max-w-lg flex-1 px-5 pb-28 pt-5">
        {error && (
          <p className="mb-4 text-center text-sm font-semibold text-[var(--color-brand-error)]">
            {error}
          </p>
        )}
        <ProfileDetailsForm
          key={`${user.id}-${user.email ?? ""}-${user.mobile ?? ""}`}
          user={user}
          isEditing={isEditing}
          onSave={saveProfile}
          isSaving={isSaving}
          onDoneEditing={() => setIsEditing(false)}
        />
      </main>
    </div>
  );
}
