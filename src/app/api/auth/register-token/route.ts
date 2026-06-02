import { NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { getBackendProxyOrigin } from "@/lib/server/backend-origin";

/** Proxy web push token registration — always hits FastAPI with trailing slash (no 307). */
export async function POST(request: Request) {
  const backend = getBackendProxyOrigin();
  const headers = new Headers({ "Content-Type": "application/json" });

  const auth = request.headers.get("authorization");
  if (auth) headers.set("authorization", auth);

  const tz = request.headers.get("x-timezone");
  if (tz) headers.set("X-Timezone", tz);

  const lang = request.headers.get("response_language");
  if (lang) headers.set("response_language", lang);

  let body: string;
  try {
    body = await request.text();
  } catch {
    return NextResponse.json({ detail: "Invalid body" }, { status: 400 });
  }

  const upstream = await fetch(
    `${backend}${API_ENDPOINTS.registerTokenFastApi}`,
    {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    }
  );

  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/json",
    },
  });
}
