import { NextRequest, NextResponse } from "next/server";
import { STORAGE_KEYS } from "@/lib/constants";

const AUTH_ROUTES = ["/home", "/panchang", "/horoscope", "/settings", "/profile"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for auth token in cookies (set server-side on login)
  const token = request.cookies.get(STORAGE_KEYS.authToken)?.value;

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // Redirect unauthenticated users away from protected routes
  if (isAuthRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users away from login
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
