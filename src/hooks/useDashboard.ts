"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import {
  fetchDailyPredictionSummary,
  fetchNotifications,
  type DailyPredictionSummary,
} from "@/lib/services/home";
import { checkMatchMakingExists } from "@/lib/services/match-making";
import type { Notification } from "@/types";

export function useDashboard() {
  const { user, isAuthenticated } = useAuthStore();
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
    if (!isAuthenticated) return;
    let cancelled = false;
    Promise.all([
      fetchDailyPredictionSummary(),
      fetchNotifications(),
      checkMatchMakingExists().catch(() => false),
    ])
      .then(([prediction, notifs, hasMatch]) => {
        if (!cancelled) {
          setDailyPrediction(prediction);
          setNotifications(notifs);
          setHasExistingMatch(hasMatch);
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
  }, [isAuthenticated]);

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
