import { NextResponse } from "next/server";
import { GOOGLE_PLACES_AUTOCOMPLETE_URL } from "@/lib/constants/google-places";
import { parsePlaceSuggestions } from "@/lib/places-suggestions";

function getGooglePlacesApiKey(): string | null {
  const key = process.env.GOOGLE_PLACES_API_KEY?.trim();
  return key || null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { input?: string };
    const input = body.input?.trim() ?? "";
    if (!input) {
      return NextResponse.json({ suggestions: [] });
    }

    const apiKey = getGooglePlacesApiKey();
    if (!apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[places/suggestions] GOOGLE_PLACES_API_KEY is missing. Add it to .env.local (server-only, no NEXT_PUBLIC_ prefix)."
        );
      }
      return NextResponse.json({ suggestions: [] });
    }

    const url = `${GOOGLE_PLACES_AUTOCOMPLETE_URL}?input=${encodeURIComponent(input)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "X-Goog-Api-Key": apiKey },
      cache: "no-store",
    });

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        const detail = await response.text();
        console.error("[places/suggestions]", response.status, detail);
      }
      return NextResponse.json({ suggestions: [] });
    }

    const data = await response.json();
    return NextResponse.json({ suggestions: parsePlaceSuggestions(data) });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[places/suggestions]", err);
    }
    return NextResponse.json({ suggestions: [] });
  }
}
