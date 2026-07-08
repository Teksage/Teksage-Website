import type { AppLocale } from "@/lib/i18n/locale";
import en_US from "@/lib/i18n/messages/en_US.json";
import ta from "@/lib/i18n/messages/ta.json";
import hi from "@/lib/i18n/messages/hi.json";
import te_IN from "@/lib/i18n/messages/te_IN.json";
import kn_IN from "@/lib/i18n/messages/kn_IN.json";
import ml_IN from "@/lib/i18n/messages/ml_IN.json";
import mr_IN from "@/lib/i18n/messages/mr_IN.json";

export const I18N_MESSAGES: Record<AppLocale, Record<string, string>> = {
  en_US,
  ta,
  hi,
  te_IN,
  kn_IN,
  ml_IN,
  mr_IN,
};
