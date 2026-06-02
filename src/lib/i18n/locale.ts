import {
  APP_LANGUAGE_CODE_BY_BACKEND,
  APP_LANGUAGE_OPTIONS,
} from "@/lib/constants/settings-language";
import type { AppLanguageCode } from "@/types/settings";

/** GetX locale keys — mirrors Flutter `Get.updateLocale`. */
export const APP_LOCALES = [
  "en_US",
  "ta",
  "hi",
  "te_IN",
  "kn_IN",
  "ml_IN",
  "mr_IN",
] as const;

export type AppLocale = (typeof APP_LOCALES)[number];

export const DEFAULT_APP_LOCALE: AppLocale = "en_US";

const LOCALE_BY_CODE: Record<AppLanguageCode, AppLocale> = {
  en_US: "en_US",
  ta: "ta",
  hi: "hi",
  te_IN: "te_IN",
  kn_IN: "kn_IN",
  ml_IN: "ml_IN",
  mr_IN: "mr_IN",
};

export function localeFromLanguageCode(code: AppLanguageCode): AppLocale {
  return LOCALE_BY_CODE[code] ?? DEFAULT_APP_LOCALE;
}

export function localeFromBackendName(name: string): AppLocale {
  const code = APP_LANGUAGE_CODE_BY_BACKEND[name.toLowerCase()];
  return code ? localeFromLanguageCode(code) : DEFAULT_APP_LOCALE;
}

export function languageCodeFromLocale(locale: AppLocale): AppLanguageCode {
  const match = APP_LANGUAGE_OPTIONS.find((o) => LOCALE_BY_CODE[o.code] === locale);
  return match?.code ?? "en_US";
}

export function htmlLangFromLocale(locale: AppLocale): string {
  if (locale === "en_US") return "en";
  if (locale.includes("_")) return locale.split("_")[0] ?? "en";
  return locale;
}

/** BCP 47 tag for `Intl` / `toLocaleDateString` — mirrors Flutter `DateFormat` locale. */
export function bcp47FromAppLocale(locale: AppLocale): string {
  const map: Record<AppLocale, string> = {
    en_US: "en-US",
    ta: "ta-IN",
    hi: "hi-IN",
    te_IN: "te-IN",
    kn_IN: "kn-IN",
    ml_IN: "ml-IN",
    mr_IN: "mr-IN",
  };
  return map[locale] ?? "en-US";
}
