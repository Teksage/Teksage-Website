import { I18N_MESSAGES } from "@/lib/i18n/messages";
import { DEFAULT_APP_LOCALE, type AppLocale } from "@/lib/i18n/locale";

/** Web copy keys that differ slightly from Flutter `.tr` keys. */
const TRANSLATION_KEY_ALIASES: Record<string, string> = {
  "Daily Predictions": "Daily Prediction",
  "Weekly Predictions": "Weekly Prediction",
  "Yearly Predictions": "Yearly Prediction",
  "Life Prediction": "Life Predictions",
  "Push Notifications": "Push Notifications",
};

/** Flutter `localeString.dart` JSON keys use literal `\n`; web constants use real newlines. */
function resolveTranslationKey(key: string): string {
  if (TRANSLATION_KEY_ALIASES[key]) return TRANSLATION_KEY_ALIASES[key];
  if (key.includes("\n")) return key.replace(/\n/g, "\\n");
  return key;
}

function normalizeNewlines(text: string): string {
  return text.replace(/\\n/g, "\n");
}

export function translate(locale: AppLocale, key: string): string {
  const resolved = resolveTranslationKey(key);
  const table = I18N_MESSAGES[locale];
  const en = I18N_MESSAGES[DEFAULT_APP_LOCALE];
  const raw =
    table[resolved] ?? table[key] ?? en[resolved] ?? en[key] ?? key;
  return normalizeNewlines(raw);
}
