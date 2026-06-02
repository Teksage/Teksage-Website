"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import {
  showErrorAppSnackBar,
  showSuccessAppSnackBar,
} from "@/lib/app-snackbar";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import { messageFromProfileApiError } from "@/lib/profile-api-error";
import { fetchProfile, updateProfile } from "@/lib/services/profile";
import type { UserProfile } from "@/types";

export function useProfile() {
  const { user, updateUser } = useAuthStore();
  const [isFetched, setIsFetched] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derive loading from whether fetch has completed
  const isLoading = !!user && !isFetched && error === null;

  /**
   * Load profile for the current user id only. Depending on the whole `user`
   * object + a `hasFetched` ref could skip the refetch after a mid-flight
   * `updateUser` identity change, leaving `isFetched` false forever (spinner).
   */
  useEffect(() => {
    if (!user?.id) {
      queueMicrotask(() => {
        setIsFetched(false);
        setError(null);
      });
      return;
    }

    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;
      setError(null);

      fetchProfile()
        .then((data) => {
          if (!cancelled) {
            useAuthStore.getState().updateUser(data);
            setIsFetched(true);
          }
        })
        .catch(() => {
          if (!cancelled) {
            setError("Failed to load profile.");
            setIsFetched(true);
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  async function saveProfile(updates: Partial<UserProfile>) {
    setIsSaving(true);
    setError(null);
    try {
      const { profile, message } = await updateProfile(updates);
      updateUser(profile);
      showSuccessAppSnackBar(message, { position: "top" });
      return true;
    } catch (err) {
      const msg =
        messageFromProfileApiError(err) ??
        APP_SNACKBAR_MESSAGES.profileSaveFailed;
      showErrorAppSnackBar(msg, { position: "top" });
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
