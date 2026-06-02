import { buildFirebaseMessagingSwSource } from "@/lib/firebase-messaging-sw-source";

export const dynamic = "force-dynamic";

const SW_HEADERS = {
  "Content-Type": "application/javascript; charset=utf-8",
  "Cache-Control": "no-store, no-cache, must-revalidate",
  "Service-Worker-Allowed": "/",
} as const;

export async function GET() {
  const source = buildFirebaseMessagingSwSource();
  if (!source) {
    return new Response(
      "// Firebase push not configured — set NEXT_PUBLIC_FIREBASE_* in .env.local",
      { status: 503, headers: SW_HEADERS }
    );
  }

  return new Response(source, { status: 200, headers: SW_HEADERS });
}
