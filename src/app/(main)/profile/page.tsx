"use client";

import { AppHeader } from "@/components/common/AppHeader";
import { ProfileAvatar } from "@/components/settings/ProfileAvatar";
import { ProfileForm } from "@/components/settings/ProfileForm";
import { FullPageLoader } from "@/components/common/LoadingSpinner";
import { EmptyState } from "@/components/common/EmptyState";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, isSaving, error, saveProfile } = useProfile();

  if (isLoading) return <FullPageLoader />;

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-[var(--color-brand-bg)]">
        <AppHeader
          title="Profile"
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
    <div className="flex flex-col min-h-screen bg-[var(--color-brand-bg)]">
      <AppHeader
        title="Profile Details"
        showBack
        onBackClick={() => router.back()}
      />

      <main className="flex-1 max-w-lg mx-auto w-full px-5 pb-10">
        {/* Avatar section */}
        <div className="bg-white rounded-2xl shadow-sm mb-4">
          <ProfileAvatar
            name={user.name}
            avatarUrl={user.avatarUrl}
            isPremium={user.isPremium}
          />
        </div>

        {/* Form section */}
        <div className="bg-white rounded-2xl shadow-sm px-5 py-6">
          {error && (
            <p className="text-sm font-semibold text-center text-[var(--color-brand-error)] mb-4">
              {error}
            </p>
          )}
          <ProfileForm user={user} onSave={saveProfile} isSaving={isSaving} />
        </div>
      </main>
    </div>
  );
}
