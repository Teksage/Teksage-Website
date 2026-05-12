"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProfileField } from "@/components/settings/ProfileField";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { cn } from "@/lib/utils";
import type { UserProfile } from "@/types";

interface ProfileFormProps {
  user: UserProfile;
  onSave: (updates: Partial<UserProfile>) => Promise<boolean>;
  isSaving: boolean;
  className?: string;
}

export function ProfileForm({ user, onSave, isSaving, className }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Partial<UserProfile>>({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    dateOfBirth: user.dateOfBirth,
    timeOfBirth: user.timeOfBirth,
    placeOfBirth: user.placeOfBirth,
    gender: user.gender,
  });

  function handleChange(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    const success = await onSave(form);
    if (success) setIsEditing(false);
  }

  function handleDiscard() {
    setForm({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      dateOfBirth: user.dateOfBirth,
      timeOfBirth: user.timeOfBirth,
      placeOfBirth: user.placeOfBirth,
      gender: user.gender,
    });
    setIsEditing(false);
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Edit toggle */}
      <div className="flex justify-end">
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="rounded-full border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]/5"
          >
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDiscard}
              className="rounded-full text-gray-500"
            >
              Discard
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-full bg-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]/90 text-white"
            >
              {isSaving ? <LoadingSpinner size="sm" className="border-t-white" /> : "Save"}
            </Button>
          </div>
        )}
      </div>

      {/* Fields */}
      <ProfileField
        label="Full Name"
        value={form.name ?? ""}
        onChange={(v) => handleChange("name", v)}
        isEditable={isEditing}
        placeholder="Enter your full name"
      />
      <ProfileField
        label="Email"
        type="email"
        value={form.email ?? ""}
        onChange={(v) => handleChange("email", v)}
        isEditable={isEditing}
        placeholder="Enter email"
      />
      <ProfileField
        label="Mobile Number"
        type="tel"
        value={form.mobile ?? ""}
        onChange={(v) => handleChange("mobile", v)}
        isEditable={isEditing}
        placeholder="Enter mobile number"
      />
      <ProfileField
        label="Date of Birth"
        type="date"
        value={form.dateOfBirth ?? ""}
        onChange={(v) => handleChange("dateOfBirth", v)}
        isEditable={isEditing}
      />
      <ProfileField
        label="Time of Birth"
        type="time"
        value={form.timeOfBirth ?? ""}
        onChange={(v) => handleChange("timeOfBirth", v)}
        isEditable={isEditing}
      />
      <ProfileField
        label="Place of Birth"
        value={form.placeOfBirth ?? ""}
        onChange={(v) => handleChange("placeOfBirth", v)}
        isEditable={isEditing}
        placeholder="Enter place of birth"
      />

      {/* Gender selector */}
      {isEditing && (
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Gender
          </label>
          <div className="flex gap-3">
            {(["male", "female", "other"] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => handleChange("gender", g)}
                className={cn(
                  "flex-1 py-3 rounded-xl border text-sm font-semibold capitalize transition-all",
                  form.gender === g
                    ? "bg-[var(--color-brand-primary)] text-white border-[var(--color-brand-primary)]"
                    : "border-black/20 text-gray-600 hover:border-[var(--color-brand-primary)]"
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {!isEditing && form.gender && (
        <ProfileField
          label="Gender"
          value={form.gender}
          isEditable={false}
          isReadOnly
        />
      )}
    </div>
  );
}
