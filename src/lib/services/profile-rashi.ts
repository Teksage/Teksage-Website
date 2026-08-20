import { API_ENDPOINTS } from "@/lib/constants/api";
import {
  formatProfileNakshatraDisplay,
  formatProfileRashiDisplay,
} from "@/lib/constants/rashi-sanskrit";
import {
  normalizeProfileDateForApi,
  normalizeProfileTimeForApi,
} from "@/lib/profile-birth-normalize";
import { http } from "@/lib/services/http";

type RashiNakshatraResult = {
  rashi: string;
  nakshatra: string;
};

type RashiNakshatraApiBody = {
  date_of_birth: string;
  time_of_birth: string;
  birth_location: string;
};

function pickEnglishLabel(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "english" in value) {
    const english = (value as { english?: unknown }).english;
    if (typeof english === "string") return english;
  }
  return "";
}

function parsePada(value: unknown): number | undefined {
  const p = typeof value === "number" ? value : Number(value);
  return Number.isFinite(p) && p >= 1 && p <= 4 ? p : undefined;
}

/** `POST /api/auth/rashi-nakshatra` — mirrors Flutter `ProfileService.fetchRashiNakshatra`. */
export async function fetchRashiNakshatra(params: {
  dateOfBirth: string;
  timeOfBirth: string;
  birthLocation: string;
}): Promise<RashiNakshatraResult> {
  const body: RashiNakshatraApiBody = {
    date_of_birth: normalizeProfileDateForApi(params.dateOfBirth),
    time_of_birth: normalizeProfileTimeForApi(params.timeOfBirth),
    birth_location: params.birthLocation.trim(),
  };

  const { data } = await http.post<Record<string, unknown>>(API_ENDPOINTS.rashiNakshatra, body, {
    headers: { response_language: "english" },
  });

  const englishRashi = pickEnglishLabel(data.rashi);
  const englishNak = pickEnglishLabel(data.nakshatra);
  const pada = parsePada(data.pada);
  const rashiSanskrit =
    typeof data.rashi_sanskrit === "string" ? data.rashi_sanskrit.trim() : "";
  const rashi = formatProfileRashiDisplay(rashiSanskrit || englishRashi);
  const nakshatra = formatProfileNakshatraDisplay(englishNak, pada);
  if (!rashi || !nakshatra) {
    throw new Error("Incomplete rashi/nakshatra response");
  }
  return { rashi, nakshatra };
}
