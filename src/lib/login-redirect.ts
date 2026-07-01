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

/** Resolve post-OTP destination — mirrors Flutter `password.dart` login navigation. */
export function resolvePostLoginRedirectPath(
  raw: string | null | undefined,
  options?: { profileUpdated?: boolean }
): string {
  if (options?.profileUpdated === false) {
    return ROUTES.profile;
  }

  if (!raw?.trim()) return ROUTES.home;

  try {
    const decoded = decodeURIComponent(raw.trim());
    return isSafeInAppRedirectPath(decoded) ? decoded : ROUTES.home;
  } catch {
    return ROUTES.home;
  }
}
