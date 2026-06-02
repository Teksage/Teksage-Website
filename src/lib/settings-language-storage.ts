import { STORAGE_KEYS } from "@/lib/constants";
import {
  APP_LANGUAGE_CODE_BY_BACKEND,
  APP_LANGUAGE_OPTIONS,
} from "@/lib/constants/settings-language";
import type { AppLanguageCode } from "@/types/settings";

export function getStoredAppLanguageName(): string {
  if (typeof window === "undefined") return "english";
  return localStorage.getItem(STORAGE_KEYS.language)?.toLowerCase() || "english";
}

export function getStoredAppLanguageCode(): AppLanguageCode {
  const name = getStoredAppLanguageName();
  return APP_LANGUAGE_CODE_BY_BACKEND[name] ?? "en_US";
}

const LANGUAGE_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 365;

export function persistAppLanguage(backendName: string): void {
  if (typeof window === "undefined") return;
  const value = backendName.toLowerCase();
  localStorage.setItem(STORAGE_KEYS.language, value);
  document.cookie = `${STORAGE_KEYS.language}=${encodeURIComponent(value)};path=/;max-age=${LANGUAGE_COOKIE_MAX_AGE_SEC};samesite=lax`;
}

export function backendNameFromCode(code: AppLanguageCode): string {
  return (
    APP_LANGUAGE_OPTIONS.find((o) => o.code === code)?.backendName ?? "english"
  );
}
