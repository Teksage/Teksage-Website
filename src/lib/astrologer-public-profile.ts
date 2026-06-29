import { PUBLIC_SITE_ORIGIN } from "@/lib/constants/site";

/** Slug path e.g. `/muthuvijayanelango` from astrologer name parts. */
export function buildAstrologerPublicProfilePath(
  firstName: string | null | undefined,
  lastName: string | null | undefined
): string | null {
  const slug = `${firstName ?? ""}${lastName ?? ""}`.replace(/\s+/g, "").toLowerCase();
  return slug ? `/${slug}` : null;
}

function isAbsoluteProfileUrl(value: string): boolean {
  return /^https?:\/\//i.test(value.trim());
}

function normalizePathSegment(value: string): string {
  const path = value.startsWith("/") ? value : `/${value}`;
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

export function buildAstrologerPublicProfileUrl(profilePath: string): string {
  const raw = profilePath.trim();
  if (isAbsoluteProfileUrl(raw)) {
    return raw.replace(/\/$/, "") || raw;
  }
  const path = normalizePathSegment(raw);
  return `${PUBLIC_SITE_ORIGIN.replace(/\/$/, "")}${path}`;
}

/** Human-readable profile URL e.g. `teksage-new.pages.dev/astrologers/muthuvijayan`. */
export function buildAstrologerPublicProfileDisplayUrl(profilePath: string): string {
  const raw = profilePath.trim();
  if (isAbsoluteProfileUrl(raw)) {
    const url = new URL(raw);
    const path = url.pathname.replace(/\/$/, "") || "";
    return `${url.host}${path}`;
  }
  const host = PUBLIC_SITE_ORIGIN.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const path = normalizePathSegment(raw);
  return `${host}${path}`;
}
