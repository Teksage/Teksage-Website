import { cookies } from "next/headers";
import { STORAGE_KEYS } from "@/lib/constants";
import {
  DEFAULT_APP_LOCALE,
  localeFromBackendName,
  type AppLocale,
} from "@/lib/i18n/locale";

/** Read persisted app language on the server so SSR matches the client hydrate. */
export async function getServerAppLocale(): Promise<AppLocale> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(STORAGE_KEYS.language)?.value;
  if (!raw?.trim()) return DEFAULT_APP_LOCALE;
  try {
    return localeFromBackendName(decodeURIComponent(raw.trim()));
  } catch {
    return localeFromBackendName(raw.trim());
  }
}
