"use client";

import { useCallback, useEffect, useState } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import { isClientLoggedIn } from "@/lib/auth-session";
import {
  clearAllNotifications,
  fetchAppNotifications,
  fetchConsultationNotificationEvents,
  markNotificationsRead,
} from "@/lib/services/notifications";
import { useAuthStore } from "@/store/auth.store";
import { isAstrologerHomeSession } from "@/lib/utils";
import type {
  AppNotification,
  ConsultationNotificationEvent,
  NotificationTab,
} from "@/types/notifications";

export function useNotifications(initialTab: NotificationTab = "general") {
  const { version: languageVersion } = useAppLanguage();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = isClientLoggedIn();
  const isAstrologer = isAstrologerHomeSession(user ?? undefined);

  const [tab, setTab] = useState<NotificationTab>(initialTab);
  const [general, setGeneral] = useState<AppNotification[]>([]);
  const [consultation, setConsultation] = useState<ConsultationNotificationEvent[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const load = useCallback(async () => {
    if (!isAuthenticated || !user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const [generalRows, consultationRows] = await Promise.all([
        fetchAppNotifications(),
        fetchConsultationNotificationEvents(user.id, isAstrologer),
      ]);
      setGeneral(generalRows);
      setConsultation(consultationRows);
    } catch {
      setError("loadFailed");
    } finally {
      setLoading(false);
    }
  }, [isAstrologer, isAuthenticated, user?.id]);

  useEffect(() => {
    void load();
  }, [load, languageVersion]);

  const markRead = useCallback(async (id: string) => {
    const numericId = Number(id);
    if (!Number.isFinite(numericId)) return;
    await markNotificationsRead([numericId]);
    setGeneral((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const clearAll = useCallback(async () => {
    setActionLoading(true);
    try {
      await clearAllNotifications();
      setGeneral([]);
      await load();
    } finally {
      setActionLoading(false);
    }
  }, [load]);

  return {
    tab,
    setTab,
    general,
    consultation,
    loading,
    error,
    actionLoading,
    isAstrologer,
    isAuthenticated,
    markRead,
    clearAll,
    reload: load,
  };
}
