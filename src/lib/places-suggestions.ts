export type PlaceSuggestion = {
  displayText: string;
  selectedText: string;
};

type PlacesAutocompleteResponse = {
  suggestions?: Array<{
    placePrediction?: {
      text?: { text?: string };
      types?: string[];
      structuredFormat?: {
        mainText?: { text?: string };
        secondaryText?: { text?: string };
      };
    };
  }>;
};

/** Parse Google Places autocomplete — mirrors Flutter `GooglePlacesService`. */
export function parsePlaceSuggestions(payload: PlacesAutocompleteResponse): PlaceSuggestion[] {
  const items = payload.suggestions ?? [];
  const results: PlaceSuggestion[] = [];

  for (const item of items) {
    const prediction = item.placePrediction;
    if (!prediction) continue;

    const types = prediction.types ?? [];
    if (!types.includes("geocode")) continue;

    const displayText = prediction.text?.text?.trim() ?? "";
    const mainTextCity = prediction.structuredFormat?.mainText?.text?.trim() ?? "";
    const mainTextLocal = prediction.structuredFormat?.secondaryText?.text?.trim() ?? "";

    let selectedText = mainTextCity;
    if (
      types.includes("sublocality") ||
      types.includes("premise") ||
      types.includes("route")
    ) {
      const parts = mainTextLocal
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);
      if (parts.length >= 3) {
        selectedText = parts[parts.length - 3] ?? mainTextCity;
      }
    }

    if (!displayText || !selectedText) continue;
    results.push({ displayText, selectedText });
  }

  return results;
}

/** Client fetch for profile location autocomplete (Next.js route, not FastAPI). */
export async function fetchPlaceSuggestions(input: string): Promise<PlaceSuggestion[]> {
  const query = input.trim();
  if (!query) return [];

  const response = await fetch("/api/places/suggestions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: query }),
  });

  if (!response.ok) return [];
  const data = (await response.json()) as { suggestions?: PlaceSuggestion[] };
  return data.suggestions ?? [];
}