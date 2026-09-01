import { getPublicApiBaseUrl, getPublicWebSocketBaseUrl } from "@/lib/env";

/** FastAPI origin for relative astrologer `picture` paths when REST uses same-origin `/api` proxy. */
function astrologerMediaBaseUrl(): string {
  const api = getPublicApiBaseUrl();
  if (api) return api;
  return getPublicWebSocketBaseUrl();
}

/** Resolve astrologer profile image — S3 absolute URL or path relative to API origin. */
export function resolveAstrologerPictureUrl(
  picture: string | null | undefined
): string | null {
  const raw = picture?.trim();
  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const base = astrologerMediaBaseUrl();
  return raw.startsWith("/") ? `${base}${raw}` : `${base}/${raw}`;
}
