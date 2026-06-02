import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Auth redirect for `/login` is handled client-side (`hasClientAuthToken`).
 * Cookie-only sessions after clearing localStorage caused blank protected pages.
 */
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
