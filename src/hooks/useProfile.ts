"use client";

import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/auth.store";
import { fetchProfile, updateProfile } from "@/lib/services/profile";
import type { UserProfile } from "@/types";

export function useProfile() {
  const { user, updateUser } = useAuthStore();
  const [isFetched, setIsFetched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  // Derive loading from whether fetch has completed
  const isLoading = !!user && !isFetched && error === null;

  useEffect(() => {
    if (!user || hasFetched.current) return;
    hasFetched.current = true;
    let cancelled = false;
    fetchProfile()
      .then((data) => {
        if (!cancelled) {
          updateUser(data);
          setIsFetched(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Failed to load profile.");
          setIsFetched(true);
        }
      });
    return () => { cancelled = true; };
  }, [user, updateUser]);

  async function saveProfile(updates: Partial<UserProfile>) {
    setIsSaving(true);
    setError(null);
    try {
      const updated = await updateProfile(updates);
      updateUser(updated);
      return true;
    } catch {
      setError("Failed to save profile. Please try again.");
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  async function refetchProfile() {
    setError(null);
    try {
      const data = await fetchProfile();
      updateUser(data);
    } catch {
      setError("Failed to load profile.");
    }
  }

  return { user, isLoading, isSaving, error, saveProfile, refetchProfile };
}
