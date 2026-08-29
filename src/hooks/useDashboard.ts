"use client";

import { useEffect, useState } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { isClientLoggedIn } from "@/lib/auth-session";
import { useHydratedLoggedIn } from "@/hooks/useHydratedLoggedIn";
import { useAuthStore } from "@/store/auth.store";
import {
  fetchDailyPredictionSummary,
  fetchNotifications,
  type DailyPredictionSummary,
} from "@/lib/services/home";
import { fetchProfile } from "@/lib/services/profile";
import { checkMatchMakingExists } from "@/lib/services/match-making";
import type { Notification } from "@/types";

export function useDashboard() {
  const { version: languageVersion } = useAppLanguage();
  const { user } = useAuthStore();
  const { ready: authReady, loggedIn } = useHydratedLoggedIn();
  const isAuthenticated = authReady && loggedIn;
  const [dailyPrediction, setDailyPrediction] =
    useState<DailyPredictionSummary | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isFetched, setIsFetched] = useState(false);
  const [hasExistingMatch, setHasExistingMatch] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derive loading: authenticated but haven't fetched yet
  const isLoading = isAuthenticated && !isFetched && error === null;
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    if (!isClientLoggedIn()) return;
    let cancelled = false;
    Promise.all([
      fetchDailyPredictionSummary(),
      fetchNotifications(),
      checkMatchMakingExists().catch(() => false),
      fetchProfile().catch(() => null),
    ])
      .then(([prediction, notifs, hasMatch, profile]) => {
        if (!cancelled) {
          setDailyPrediction(prediction);
          setNotifications(notifs);
          setHasExistingMatch(hasMatch);
          if (profile) {
            const token = useAuthStore.getState().token;
            if (token) useAuthStore.getState().setAuth(profile, token);
          }
          setIsFetched(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Failed to load dashboard data.");
          setIsFetched(true);
        }
      });
    return () => { cancelled = true; };
  }, [authReady, loggedIn, languageVersion]);

  return {
    user,
    isAuthenticated,
    dailyPrediction,
    notifications,
    unreadCount,
    isLoading,
    error,
    hasExistingMatch,
  };
}
