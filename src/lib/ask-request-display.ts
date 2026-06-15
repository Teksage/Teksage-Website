/** Display helpers for astrologer ask-request cards. */

export function askRequestInitials(name: string | null | undefined): string {
  if (!name?.trim()) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function formatAskRequestLanguages(languages: string[] | null | undefined): string {
  if (!languages?.length) return "—";
  return languages
    .map((lang) => lang.charAt(0).toUpperCase() + lang.slice(1))
    .join(", ");
}
