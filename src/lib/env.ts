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

/**
 * Backend API origin for browser-side requests (axios).
 * Set in `.env.local` as `NEXT_PUBLIC_API_BASE_URL`.
 */
function readPublicApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!raw) {
    throw new Error(
      "[env] NEXT_PUBLIC_API_BASE_URL is missing. Copy `.env.example` to `.env.local` in the project root, set your backend base URL (e.g. http://127.0.0.1:8000), restart `npm run dev`. On deploy, set the same variable in your hosting provider — never commit `.env.local`."
    );
  }
  return assertValidHttpUrl(raw);
}

let cachedPublicApiBaseUrl: string | null = null;

export function getPublicApiBaseUrl(): string {
  if (cachedPublicApiBaseUrl !== null) return cachedPublicApiBaseUrl;
  cachedPublicApiBaseUrl = readPublicApiBaseUrl();
  return cachedPublicApiBaseUrl;
}
