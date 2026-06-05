import { DEFAULT_COUNTRY_CODE_NUMERIC } from "@/lib/constants";

const KNOWN_DIAL_CODES = [
  "91",
  "44",
  "61",
  "81",
  "86",
  "49",
  "33",
  "39",
  "34",
  "55",
  "52",
  "82",
  "62",
  "63",
  "66",
  "84",
  "1",
] as const;

export function digitsOnly(value: string | null | undefined): string {
  return (value ?? "").replace(/\D/g, "");
}

function parseCombinedDigits(combined: string): { countryCode: string; mobile: string } | null {
  if (!combined) return null;

  const sorted = [...KNOWN_DIAL_CODES].sort((a, b) => b.length - a.length);
  for (const dial of sorted) {
    if (!combined.startsWith(dial)) continue;
    const national = combined.slice(dial.length);
    if (!national) continue;
    if (dial === "1" && national.length === 10) return { countryCode: dial, mobile: national };
    if (dial === "91" && national.length === 10) return { countryCode: dial, mobile: national };
    if (national.length >= 7 && national.length <= 12) {
      return { countryCode: dial, mobile: national };
    }
  }

  if (combined.startsWith("1") && combined.length === 11) {
    return { countryCode: "1", mobile: combined.slice(1) };
  }

  return null;
}

/** Canonical split for profile display and API payloads. */
export function normalizePhoneParts(
  countryCode: string | null | undefined,
  mobile: string | null | undefined
): { countryCode: string; mobile: string } {
  let cc = digitsOnly(countryCode);
  let national = digitsOnly(mobile);

  if (!national && !cc) {
    return { countryCode: DEFAULT_COUNTRY_CODE_NUMERIC, mobile: "" };
  }

  if (cc && national.startsWith(cc) && national.length > cc.length) {
    national = national.slice(cc.length);
  }

  if (cc.length > 3 || (cc.startsWith("1") && cc.length > 1)) {
    const parsed = parseCombinedDigits(digitsOnly(countryCode) + digitsOnly(mobile));
    if (parsed) return parsed;
  }

  return { countryCode: cc || DEFAULT_COUNTRY_CODE_NUMERIC, mobile: national };
}
