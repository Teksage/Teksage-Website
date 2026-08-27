import { consultationLanguageLabel } from "@/lib/constants/consultation-languages";
import { TEKSAGE_APP_ASTROLOGER_PROFILE_SLUGS } from "@/lib/constants/consultation-featured-astrologers";
import { buildAstrologerPublicProfileUrl } from "@/lib/astrologer-public-profile";
import type { ConsultationAstrologer } from "@/types/consultation";

/** API routes use astrologer `user_id` (Flutter `astro.userId`), not `astrologer_id` PK. */
export function consultationRouteUserId(astrologer: ConsultationAstrologer): number {
  const nested = astrologer.user?.user_id;
  if (Number.isFinite(astrologer.user_id) && astrologer.user_id > 0) {
    return astrologer.user_id;
  }
  if (nested != null && Number.isFinite(nested) && nested > 0) {
    return nested;
  }
  return astrologer.astrologer_id;
}

/** `GET /astrologer/filter?astro_ids=` expects account `user_id` values (Flutter `userId`). */
export function consultationExcludeUserIds(
  astrologers: ConsultationAstrologer[]
): number[] {
  const ids = new Set<number>();
  for (const astrologer of astrologers) {
    const id = consultationRouteUserId(astrologer);
    if (Number.isFinite(id) && id > 0) ids.add(id);
  }
  return [...ids];
}

export function formatConsultationCategoryLabel(category: string): string {
  return category
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatConsultationLanguageList(languages: string[]): string {
  return languages
    .map((lang) => {
      const native = consultationLanguageLabel(lang);
      if (native !== lang) return native;
      return lang.charAt(0).toUpperCase() + lang.slice(1);
    })
    .join(", ");
}

export function consultationAstrologerName(
  user?: { first_name?: string | null; last_name?: string | null } | null
): string {
  const first = user?.first_name?.trim() ?? "";
  const last = user?.last_name?.trim() ?? "";
  const full = [first, last].filter(Boolean).join(" ");
  if (!full) return "Astrologer";
  return full
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** Initials from a display name — e.g. "Subathra Devi E" → "SD", "Astrologer A" → "AA". */
export function consultationInitialsFromDisplayName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "A";
  const a = parts[0]?.charAt(0) ?? "";
  const b = parts[1]?.charAt(0) ?? parts[0]?.charAt(1) ?? "";
  return `${a}${b}`.toUpperCase() || "A";
}

/** Initials for avatar fallback — e.g. "Karthik R S" → "KR". */
export function consultationAstrologerInitials(
  user?: { first_name?: string | null; last_name?: string | null } | null
): string {
  const first = user?.first_name?.trim() ?? "";
  const last = user?.last_name?.trim() ?? "";
  const a = first.charAt(0);
  const b = last.charAt(0) || first.split(/\s+/).filter(Boolean)[1]?.charAt(0) || "";
  const initials = `${a}${b}`.toUpperCase();
  return initials || "A";
}

/**
 * Public teksage.app profile URL — same destination as ask-answer “View profile”.
 * Prefer API `profile_link`, then known marketing slug by `user_id`.
 */
export function consultationAstrologerPublicProfileUrl(
  astrologer: ConsultationAstrologer
): string | null {
  const link = astrologer.profile_link?.trim();
  if (link) return buildAstrologerPublicProfileUrl(link);

  const userId = consultationRouteUserId(astrologer);
  const slug = TEKSAGE_APP_ASTROLOGER_PROFILE_SLUGS[userId];
  if (!slug) return null;
  return buildAstrologerPublicProfileUrl(`/astrologers/${slug}`);
}
