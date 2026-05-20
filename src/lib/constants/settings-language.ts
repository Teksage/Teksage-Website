import type { AppLanguageOption } from "@/types/settings";

/** Mirrors Flutter `AppLanguagePage` codes → backend `app_language` names. */
export const APP_LANGUAGE_OPTIONS: readonly AppLanguageOption[] = [
  { code: "en_US", label: "English", nativeLabel: "English", backendName: "english" },
  { code: "ta", label: "Tamil", nativeLabel: "தமிழ்", backendName: "tamil" },
  { code: "hi", label: "Hindi", nativeLabel: "हिंदी", backendName: "hindi" },
  { code: "te_IN", label: "Telugu", nativeLabel: "తెలుగు", backendName: "telugu" },
  { code: "kn_IN", label: "Kannada", nativeLabel: "ಕನ್ನಡ", backendName: "kannada" },
  { code: "ml_IN", label: "Malayalam", nativeLabel: "മലയാളം", backendName: "malayalam" },
  { code: "mr_IN", label: "Marathi", nativeLabel: "मराठी", backendName: "marathi" },
] as const;

export const APP_LANGUAGE_CODE_BY_BACKEND: Record<string, AppLanguageOption["code"]> =
  Object.fromEntries(
    APP_LANGUAGE_OPTIONS.map((o) => [o.backendName, o.code])
  ) as Record<string, AppLanguageOption["code"]>;

export const SETTINGS_LANGUAGE_COPY = {
  saved: "Language updated.",
  saveFailed: "Could not update language. Try again.",
} as const;
