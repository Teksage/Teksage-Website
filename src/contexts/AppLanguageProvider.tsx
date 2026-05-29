"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { STORAGE_KEYS } from "@/lib/constants";
import { isClientLoggedIn } from "@/lib/auth-session";
import { ROUTES } from "@/lib/constants/routes";
import { updateAppLanguage } from "@/lib/services/settings-language";
import {
  backendNameFromCode,
  getStoredAppLanguageName,
  persistAppLanguage,
} from "@/lib/settings-language-storage";
import {
  htmlLangFromLocale,
  localeFromBackendName,
  localeFromLanguageCode,
  translate,
  type AppLocale,
} from "@/lib/i18n";
import type { AppLanguageCode, ApplyLanguageOptions } from "@/types/settings";

type AppLanguageContextValue = {
  locale: AppLocale;
  /** Bumps when language changes — add to data-fetch `useEffect` deps. */
  version: number;
  t: (key: string) => string;
  /** Flutter `LanguageSelectionDialog._changeLanguage` + local save. */
  applyLanguageSelection: (
    code: AppLanguageCode,
    options?: ApplyLanguageOptions
  ) => Promise<void>;
  changeLanguage: (code: AppLanguageCode) => Promise<void>;
};

const AppLanguageContext = createContext<AppLanguageContextValue | null>(null);

export function AppLanguageProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: AppLocale;
}) {
  const router = useRouter();
  const profileLanguage = useAuthStore((s) => s.user?.language);
  const [locale, setLocale] = useState<AppLocale>(initialLocale);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const storedName = getStoredAppLanguageName();
    const stored = localeFromBackendName(storedName);
    persistAppLanguage(storedName);
    document.documentElement.lang = htmlLangFromLocale(stored);
    if (stored !== initialLocale) {
      setLocale(stored);
      router.refresh();
    }
  }, [initialLocale, router]);

  /** Bootstrap locale from profile when no local preference exists (first login). */
  useEffect(() => {
    if (!profileLanguage?.trim() || typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEYS.language)) return;
    const backend = profileLanguage.toLowerCase();
    persistAppLanguage(backend);
    const next = localeFromBackendName(backend);
    setLocale(next);
    document.documentElement.lang = htmlLangFromLocale(next);
  }, [profileLanguage]);

  const t = useCallback((key: string) => translate(locale, key), [locale]);

  const applyLanguageSelection = useCallback(
    async (code: AppLanguageCode, options?: ApplyLanguageOptions) => {
      const backendName = backendNameFromCode(code);
      persistAppLanguage(backendName);

      if (isClientLoggedIn()) {
        try {
          await updateAppLanguage(backendName);
          useAuthStore.getState().updateUser({ language: backendName });
        } catch {
          /* Flutter: local selection still applies when API fails */
        }
      }

      const next = localeFromLanguageCode(code);
      setLocale(next);
      setVersion((v) => v + 1);
      document.documentElement.lang = htmlLangFromLocale(next);

      if (options?.redirectTo) {
        if (options.replace) router.replace(options.redirectTo);
        else router.push(options.redirectTo);
      }
      router.refresh();
    },
    [router]
  );

  const changeLanguage = useCallback(
    (code: AppLanguageCode) =>
      applyLanguageSelection(code, { redirectTo: ROUTES.home }),
    [applyLanguageSelection]
  );

  const value = useMemo(
    () => ({ locale, version, t, applyLanguageSelection, changeLanguage }),
    [locale, version, t, applyLanguageSelection, changeLanguage]
  );

  return (
    <AppLanguageContext.Provider value={value}>
      {/* Mirrors Flutter `Get.updateLocale` — remount client tree on locale change. */}
      <div key={locale} className="contents">
        {children}
      </div>
    </AppLanguageContext.Provider>
  );
}

export function useAppLanguage(): AppLanguageContextValue {
  const ctx = useContext(AppLanguageContext);
  if (!ctx) {
    throw new Error("useAppLanguage must be used within AppLanguageProvider");
  }
  return ctx;
}
