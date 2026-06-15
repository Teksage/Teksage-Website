import { PUBLIC_SITE_ORIGIN } from "@/lib/constants/site";

/** Slug path e.g. `/muthuvijayanelango` from astrologer name parts. */
export function buildAstrologerPublicProfilePath(
  firstName: string | null | undefined,
  lastName: string | null | undefined
): string | null {
  const slug = `${firstName ?? ""}${lastName ?? ""}`.replace(/\s+/g, "").toLowerCase();
  return slug ? `/${slug}` : null;
}

export function buildAstrologerPublicProfileUrl(profilePath: string): string {
  const path = profilePath.startsWith("/") ? profilePath : `/${profilePath}`;
  return `${PUBLIC_SITE_ORIGIN.replace(/\/$/, "")}${path}`;
}

/** Human-readable profile URL e.g. `www.teksage.app/muthuvijayanelango`. */
export function buildAstrologerPublicProfileDisplayUrl(profilePath: string): string {
  const host = PUBLIC_SITE_ORIGIN.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const path = profilePath.startsWith("/") ? profilePath : `/${profilePath}`;
  return `${host}${path}`;
}
