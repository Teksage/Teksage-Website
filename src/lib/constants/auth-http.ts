/** HTTP headers and session lifetime for website auth (must match backend `WEB_ACCESS_TOKEN_EXPIRE_DAYS`). */

export const AUTH_HTTP_HEADERS = {
  clientPlatform: "X-Client-Platform",
} as const;

export const AUTH_CLIENT_PLATFORM = {
  web: "web",
} as const;

export const WEB_AUTH_SESSION_MAX_AGE_DAYS = 60;

export const WEB_AUTH_COOKIE_MAX_AGE_SEC =
  WEB_AUTH_SESSION_MAX_AGE_DAYS * 24 * 60 * 60;
