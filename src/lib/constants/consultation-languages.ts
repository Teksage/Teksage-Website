/** Consultation languages — Flutter `userSelectLanguage.dart` + `localeString.dart` native labels. */

export type ConsultationLanguageOption = {
  /** Lowercase API value (Flutter `toLowerCase()` on English key). */
  id: string;
  /** Native script label shown in picker (Flutter `.tr`). */
  label: string;
};

export const CONSULTATION_LANGUAGES: readonly ConsultationLanguageOption[] = [
  { id: "tamil", label: "தமிழ்" },
  { id: "english", label: "English" },
  { id: "telugu", label: "తెలుగు" },
  { id: "malayalam", label: "മലയാളം" },
  { id: "kannada", label: "ಕನ್ನಡ" },
  { id: "hindi", label: "हिन्दी" },
  { id: "bengali", label: "বাংলা" },
  { id: "marathi", label: "मराठी" },
  { id: "urdu", label: "اردو" },
  { id: "gujarati", label: "ગુજરાતી" },
  { id: "odia", label: "ଓଡ଼ିଆ" },
  { id: "punjabi", label: "ਪੰਜਾਬੀ" },
  { id: "assamese", label: "অসমীয়া" },
  { id: "bhojpuri", label: "भोजपुरी" },
  { id: "kashmiri", label: "کٲشُر" },
  { id: "nepali", label: "नेपाली" },
  { id: "sindhi", label: "سنڌي" },
  { id: "sinhala", label: "සිංහල" },
  { id: "maithili", label: "मैथिली" },
  { id: "manipuri", label: "মৈতৈলোন্" },
  { id: "santali", label: "ᱥᱟᱱᱛᱟᱲᱤ" },
] as const;

export function consultationLanguageLabel(languageId: string): string {
  return (
    CONSULTATION_LANGUAGES.find((lang) => lang.id === languageId)?.label ??
    languageId
  );
}

/**
 * Normalize API / picker language values to a canonical id.
 * API list responses translate languages to native script (e.g. `தமிழ்`),
 * while the filter dropdown uses ids (`tamil`).
 */
export function normalizeConsultationLanguageId(value: string): string {
  const raw = value.trim();
  if (!raw) return "";
  const lower = raw.toLowerCase();

  const byId = CONSULTATION_LANGUAGES.find((lang) => lang.id === lower);
  if (byId) return byId.id;

  const byLabel = CONSULTATION_LANGUAGES.find(
    (lang) => lang.label === raw || lang.label.toLowerCase() === lower
  );
  if (byLabel) return byLabel.id;

  const byEnglishName = CONSULTATION_LANGUAGES.find(
    (lang) => lang.id.charAt(0).toUpperCase() + lang.id.slice(1) === raw
  );
  if (byEnglishName) return byEnglishName.id;

  return lower;
}

/** Unique languages present on the roster (canonical ids), for filter dropdowns. */
export function consultationLanguagesInUse(
  rows: readonly { languages?: string[] | null }[]
): ConsultationLanguageOption[] {
  const ids = new Set<string>();
  for (const row of rows) {
    for (const lang of row.languages ?? []) {
      const id = normalizeConsultationLanguageId(lang);
      if (id) ids.add(id);
    }
  }
  return CONSULTATION_LANGUAGES.filter((lang) => ids.has(lang.id));
}
