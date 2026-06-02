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
