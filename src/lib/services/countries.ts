import { API_ENDPOINTS } from "@/lib/constants/api";
import { http } from "@/lib/services/http";
import { digitsOnly } from "@/lib/phone-utils";
import type { CountryDialInfo } from "@/types/country";

let cachedCountries: CountryDialInfo[] | null = null;
let fetchPromise: Promise<CountryDialInfo[]> | null = null;

function normalizeCountry(row: CountryDialInfo): CountryDialInfo {
  return {
    name: row.name,
    dial_code: row.dial_code.replace(/\s/g, ""),
    country_code: row.country_code,
    mobile_number_length: Number(row.mobile_number_length) || 0,
    flag: row.flag,
  };
}

export async function fetchCountries(
  forceRefresh = false
): Promise<CountryDialInfo[]> {
  if (!forceRefresh && cachedCountries) return cachedCountries;
  if (!forceRefresh && fetchPromise) return fetchPromise;

  fetchPromise = http
    .get<CountryDialInfo[]>(API_ENDPOINTS.countries)
    .then((res) => {
      const list = (Array.isArray(res.data) ? res.data : [])
        .map(normalizeCountry)
        .filter((c) => c.dial_code && c.mobile_number_length > 0)
        .sort((a, b) => a.name.localeCompare(b.name));
      cachedCountries = list;
      fetchPromise = null;
      return list;
    })
    .catch((err) => {
      fetchPromise = null;
      throw err;
    });

  return fetchPromise;
}

export function getCachedCountries(): CountryDialInfo[] | null {
  return cachedCountries;
}

export function resolveMobileLengthForDial(
  dialOrCode: string | null | undefined
): number | null {
  const dial = digitsOnly(dialOrCode);
  if (!dial || !cachedCountries) return null;
  const match = cachedCountries.find(
    (c) => digitsOnly(c.dial_code) === dial
  );
  return match?.mobile_number_length ?? null;
}

export function findCountryByDial(
  dialOrCode: string | null | undefined
): CountryDialInfo | null {
  const dial = digitsOnly(dialOrCode);
  if (!dial || !cachedCountries) return null;
  return (
    cachedCountries.find((c) => digitsOnly(c.dial_code) === dial) ?? null
  );
}
