"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SettingsToggle } from "@/components/settings/SettingsToggle";
import { ROUTES } from "@/lib/constants/routes";
import type { NotificationPrefKey } from "@/lib/constants/settings-notifications";
import {
  DEFAULT_NOTIFICATION_PREFS,
  NOTIFICATION_PREF_KEYS,
  NOTIFICATION_PREF_LABELS,
  SETTINGS_NOTIFICATIONS_COPY,
} from "@/lib/constants/settings-notifications";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { fetchProfileSettings } from "@/lib/services/settings-profile";
import { updateNotificationPrefs } from "@/lib/services/settings-notifications";
import { cn } from "@/lib/utils";
import type { NotificationPrefs } from "@/types/settings";

export function SettingsPushNotificationsView() {
  const SN = useI18nConstants(SETTINGS_NOTIFICATIONS_COPY);
  const [prefs, setPrefs] = useState<NotificationPrefs>(DEFAULT_NOTIFICATION_PREFS);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetchProfileSettings()
      .then((data) => {
        if (cancelled) return;
        setIsPremium(data.isPremium);
        if (data.notificationPrefs) setPrefs(data.notificationPrefs);
      })
      .catch(() => {
        if (!cancelled) setError(SN.loadFailed);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function onToggle(key: NotificationPrefKey, value: boolean) {
    if (!isPremium) return;
    const previous = prefs;
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    try {
      await updateNotificationPrefs(next);
    } catch {
      setPrefs(previous);
      setError(SN.updateFailed);
    }
  }

  if (loading) {
    return (
      <div className={cn(SETTINGS_UI.contentPad, "bg-white py-8")}>
        <p className="text-sm text-neutral-500">Loading…</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative z-10 mx-auto w-full max-w-lg bg-white pb-8 pt-2"
      )}
    >
      {!isPremium ? (
        <p className="px-5 py-3 text-sm text-neutral-600">
          {SN.premiumRequired}{" "}
          <Link
            href={ROUTES.settingsSubscriptions}
            className="font-medium text-[var(--color-brand-primary)] underline-offset-2 hover:underline"
          >
            View subscriptions
          </Link>
        </p>
      ) : null}
      <div className={SETTINGS_UI.pushList}>
        {NOTIFICATION_PREF_KEYS.map((key) => (
          <div key={key} className={SETTINGS_UI.pushRow}>
            <SettingsToggle
              label={NOTIFICATION_PREF_LABELS[key]}
              checked={prefs[key]}
              disabled={!isPremium}
              onCheckedChange={(value) => void onToggle(key, value)}
            />
          </div>
        ))}
      </div>
      {error ? (
        <p className="mt-3 px-5 text-sm text-[var(--color-brand-error)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
