import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STORAGE_KEYS } from "@/lib/constants";
import { LOGIN_REDIRECT_QUERY, ROUTES } from "@/lib/constants/routes";
import { resolvePostLoginRedirectPath } from "@/lib/login-redirect";

function hasAuthCookie(request: NextRequest): boolean {
  const token = request.cookies.get(STORAGE_KEYS.authToken)?.value;
  return Boolean(token?.trim());
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === ROUTES.login || pathname.startsWith(`${ROUTES.login}/`)) {
    if (hasAuthCookie(request)) {
      const raw = request.nextUrl.searchParams.get(LOGIN_REDIRECT_QUERY);
      const dest = resolvePostLoginRedirectPath(raw);
      return NextResponse.redirect(new URL(dest, request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
