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
import { SETTINGS_LAYOUT } from "@/lib/constants/settings-screen";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { fetchProfileSettings } from "@/lib/services/settings-profile";
import { showErrorAppSnackBar } from "@/lib/app-snackbar";
import { updateNotificationPrefs } from "@/lib/services/settings-notifications";
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
  }, [SN.loadFailed]);

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
      showErrorAppSnackBar(SN.updateFailed);
    }
  }

  if (loading) {
    return (
      <div className={SETTINGS_LAYOUT.contentCard}>
        <p className={`${SETTINGS_LAYOUT.contentCardPad} text-sm text-black/45`}>
          Loading…
        </p>
      </div>
    );
  }

  return (
    <div>
      {!isPremium ? (
        <p className={SETTINGS_UI.pushNotice}>
          {SN.premiumRequired}{" "}
          <Link
            href={ROUTES.settingsSubscriptions}
            className={SETTINGS_UI.pushNoticeLink}
          >
            {SN.viewSubscriptions}
          </Link>
        </p>
      ) : null}
      <div className={SETTINGS_LAYOUT.contentCard}>
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
      </div>
      {error ? (
        <p className="mt-3 text-sm text-[var(--color-brand-error)]">{error}</p>
      ) : null}
    </div>
  );
}
