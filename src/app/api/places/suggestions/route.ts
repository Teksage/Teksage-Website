import { NextResponse } from "next/server";
import {
  GOOGLE_PLACES_AUTOCOMPLETE_URL,
  GOOGLE_PLACES_FLUTTER_DEV_KEY,
} from "@/lib/constants/google-places";
import { parsePlaceSuggestions } from "@/lib/places-suggestions";

function getGooglePlacesApiKey(): string {
  return process.env.GOOGLE_PLACES_API_KEY?.trim() || GOOGLE_PLACES_FLUTTER_DEV_KEY;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { input?: string };
    const input = body.input?.trim() ?? "";
    if (!input) {
      return NextResponse.json({ suggestions: [] });
    }

    const apiKey = getGooglePlacesApiKey();
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
