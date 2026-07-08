import type { AppLocale } from "@/lib/i18n/locale";
import en_US from "@/lib/i18n/messages/en_US.json";
import ta from "@/lib/i18n/messages/ta.json";
import hi from "@/lib/i18n/messages/hi.json";
import te_IN from "@/lib/i18n/messages/te_IN.json";
import kn_IN from "@/lib/i18n/messages/kn_IN.json";
import ml_IN from "@/lib/i18n/messages/ml_IN.json";
import mr_IN from "@/lib/i18n/messages/mr_IN.json";
import muhurthaEn from "@/lib/i18n/messages/muhurtha-en_US.json";
import muhurthaTa from "@/lib/i18n/messages/muhurtha-ta.json";
import muhurthaHi from "@/lib/i18n/messages/muhurtha-hi.json";
import muhurthaTe from "@/lib/i18n/messages/muhurtha-te_IN.json";
import muhurthaKn from "@/lib/i18n/messages/muhurtha-kn_IN.json";
import muhurthaMl from "@/lib/i18n/messages/muhurtha-ml_IN.json";
import muhurthaMr from "@/lib/i18n/messages/muhurtha-mr_IN.json";

export const I18N_MESSAGES: Record<AppLocale, Record<string, string>> = {
  en_US: { ...en_US, ...muhurthaEn },
  ta: { ...ta, ...muhurthaTa },
  hi: { ...hi, ...muhurthaHi },
  te_IN: { ...te_IN, ...muhurthaTe },
  kn_IN: { ...kn_IN, ...muhurthaKn },
  ml_IN: { ...ml_IN, ...muhurthaMl },
  mr_IN: { ...mr_IN, ...muhurthaMr },
};
