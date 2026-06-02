"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useEffect, useState } from "react";
import { useAppLanguage } from "@/contexts/AppLanguageProvider";
import {
  APP_LANGUAGE_OPTIONS,
  SETTINGS_LANGUAGE_COPY,
} from "@/lib/constants/settings-language";
import { SETTINGS_UI } from "@/lib/constants/settings-ui";
import { languageCodeFromLocale } from "@/lib/i18n";
import type { AppLanguageCode } from "@/types/settings";
import { cn } from "@/lib/utils";

export function SettingsLanguageView() {
  const SL = useI18nConstants(SETTINGS_LANGUAGE_COPY);
  const { locale, changeLanguage, t } = useAppLanguage();
  const [selected, setSelected] = useState<AppLanguageCode>("en_US");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelected(languageCodeFromLocale(locale));
  }, [locale]);

  async function onSelect(code: AppLanguageCode) {
    if (code === selected || busy) return;
    setBusy(true);
    setError(null);
    try {
      await changeLanguage(code);
      setSelected(code);
    } catch {
      setError(SL.saveFailed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={cn(SETTINGS_UI.contentPad, "pb-8 pt-5")}>
      <p className={SETTINGS_UI.languageHint}>
        {t("Select your preferred language")}
      </p>
      <ul className={SETTINGS_UI.languageList}>
        {APP_LANGUAGE_OPTIONS.map((lang) => {
          const active = lang.code === selected;
          const showSubtitle = lang.label !== lang.nativeLabel;
          return (
            <li key={lang.code}>
              <button
                type="button"
                disabled={busy}
                onClick={() => void onSelect(lang.code)}
                className={cn(
                  SETTINGS_UI.languageOption,
                  active ? SETTINGS_UI.languageOptionSelected : SETTINGS_UI.languageOptionIdle
                )}
              >
                <span
                  className={cn(
                    SETTINGS_UI.radioOuter,
                    active && SETTINGS_UI.radioOuterSelected
                  )}
                  aria-hidden
                >
                  {active ? <span className={SETTINGS_UI.radioInner} /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "block text-base",
                      active
                        ? "font-bold text-[var(--color-brand-primary)]"
                        : "font-medium text-[var(--color-brand-black)]"
                    )}
                  >
                    {active && !showSubtitle ? lang.label : lang.nativeLabel}
                  </span>
                  {showSubtitle ? (
                    <span className="text-xs text-neutral-500">{lang.label}</span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {error ? (
        <p className="mt-4 text-sm text-[var(--color-brand-error)]">{error}</p>
      ) : null}
    </div>
  );
}

