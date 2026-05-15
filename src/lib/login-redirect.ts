import { LOGIN_REDIRECT_QUERY, ROUTES } from "@/lib/constants/routes";

/** Builds `/login?redirect=<encoded target>` for post-auth return (matches `SettingsMenu`). */
export function buildLoginRedirectPath(targetPath: string): string {
  const q = new URLSearchParams({ [LOGIN_REDIRECT_QUERY]: targetPath });
  return `${ROUTES.login}?${q.toString()}`;
}
