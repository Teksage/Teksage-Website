import { LOGIN_REDIRECT_QUERY, ROUTES } from "@/lib/constants/routes";

/** Builds `/login?redirect=<encoded target>` for post-auth return (matches `SettingsMenu`). */
export function buildLoginRedirectPath(targetPath: string): string {
  const q = new URLSearchParams({ [LOGIN_REDIRECT_QUERY]: targetPath });
  return `${ROUTES.login}?${q.toString()}`;
}

/** Reject open redirects — internal app paths only. */
export function isSafeInAppRedirectPath(path: string): boolean {
  const trimmed = path.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return false;
  if (trimmed.includes("://")) return false;
  if (trimmed === ROUTES.login || trimmed.startsWith(`${ROUTES.login}?`)) return false;
  return true;
}

/** Resolve `?redirect=` after OTP login; defaults to home. */
export function resolvePostLoginRedirectPath(
  raw: string | null | undefined,
  fallback: string = ROUTES.home
): string {
  if (!raw?.trim()) return fallback;
  try {
    const decoded = decodeURIComponent(raw.trim());
    return isSafeInAppRedirectPath(decoded) ? decoded : fallback;
  } catch {
    return fallback;
  }
}
