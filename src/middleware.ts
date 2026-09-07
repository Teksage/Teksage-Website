import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_TOKEN_COOKIE,
  isFullHoroscopePath,
} from "@/lib/constants/auth-guard";
import { buildLoginRedirectPath } from "@/lib/login-redirect";

/**
 * Full Horoscope: no auth cookie → login with return to `/horoscope/full`.
 * Other auth is handled client-side (localStorage is source of truth).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isFullHoroscopePath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_TOKEN_COOKIE)?.value?.trim();
  if (token) {
    return NextResponse.next();
  }

  const loginPath = buildLoginRedirectPath(pathname);
  return NextResponse.redirect(new URL(loginPath, request.url));
}

export const config = {
  matcher: ["/horoscope/full", "/horoscope/full/:path*"],
};
