/**
 * Central place for environment variables.
 *
 * Security:
 * - Only `NEXT_PUBLIC_*` variables are safe to read in client components / browser.
 * - Never add secrets (API keys, DB URLs with passwords) with the `NEXT_PUBLIC_` prefix.
 * - Put secrets in `.env.local` without `NEXT_PUBLIC_` and use them only in Server
 *   Components, Route Handlers, or Server Actions.
 */

function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

function assertValidHttpUrl(value: string): string {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(
      `[env] NEXT_PUBLIC_API_BASE_URL must be a valid absolute URL (e.g. https://api.example.com). Got: ${value}`
    );
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(
      `[env] NEXT_PUBLIC_API_BASE_URL must use http or https. Got: ${parsed.protocol}`
    );
  }
  return stripTrailingSlash(value);
}

function misconfiguredNextDevServerUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.port === "3000" && (u.hostname === "localhost" || u.hostname === "127.0.0.1");
  } catch {
    return false;
  }
}

/**
 * Backend API origin for browser-side requests (axios).
 *
 * - Set `NEXT_PUBLIC_API_BASE_URL` to your FastAPI origin (same idea as Flutter `ApiEndpoint.mainUrl`),
 *   e.g. `http://127.0.0.1:8000` or `http://10.x.x.x:8000` on a LAN device.
 * - Set `NEXT_PUBLIC_API_BASE_URL=same-origin` (or rely on the development default below) so axios calls
 *   `/api/...` on the Next.js host; `next.config.ts` rewrites proxy those to FastAPI (`BACKEND_PROXY_TARGET`).
 */
function readPublicApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (raw === "same-origin") {
    return "";
  }

  if (!raw) {
    if (process.env.NODE_ENV === "development") {
      return "";
    }
    throw new Error(
      "[env] NEXT_PUBLIC_API_BASE_URL is missing. Copy `.env.example` to `.env.local`, set your backend base URL (e.g. http://127.0.0.1:8000), or use NEXT_PUBLIC_API_BASE_URL=same-origin with BACKEND_PROXY_TARGET for Next.js API rewrites. Restart `npm run dev`."
    );
  }

  const normalized = assertValidHttpUrl(raw);

  if (misconfiguredNextDevServerUrl(normalized)) {
    throw new Error(
      `[env] NEXT_PUBLIC_API_BASE_URL points at the Next.js dev server (port 3000). Point it at FastAPI (e.g. http://127.0.0.1:8000), matching Flutter ApiEndpoint.mainUrl + port 8000. Or use NEXT_PUBLIC_API_BASE_URL=same-origin so /api/* is proxied (see next.config.ts). Got: ${normalized}`
    );
  }

  return normalized;
}

let cachedPublicApiBaseUrl: string | null = null;

export function getPublicApiBaseUrl(): string {
  if (cachedPublicApiBaseUrl !== null) return cachedPublicApiBaseUrl;
  cachedPublicApiBaseUrl = readPublicApiBaseUrl();
  return cachedPublicApiBaseUrl;
}

/**
 * Cloudflare Turnstile site key (public).
 * Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `.env.local`.
 * Cloudflare always-pass test key: `1x00000000000000000000AA`
 */
export function getTurnstileSiteKey(): string {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
}

export function isTurnstileConfigured(): boolean {
  return getTurnstileSiteKey().length > 0;
}
