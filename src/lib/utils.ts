import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { bcp47FromAppLocale, DEFAULT_APP_LOCALE, type AppLocale } from "@/lib/i18n/locale"
import type { UserProfile } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Date line on daily prediction card — mirrors Flutter `getCurrentTime()` (day rolls before 6:00). */
export function formatHomeDashboardDate(
  now = new Date(),
  appLocale: AppLocale = DEFAULT_APP_LOCALE
): string {
  const sixAM = new Date(now)
  sixAM.setHours(6, 0, 0, 0)
  const display =
    now < sixAM ? new Date(now.getTime() - 86400000) : now
  const bcp47 = bcp47FromAppLocale(appLocale)
  const weekday = display.toLocaleDateString(bcp47, { weekday: "short" })
  const month = display.toLocaleDateString(bcp47, { month: "short" })
  const day = display.getDate()
  const year = display.getFullYear()
  return `${weekday} - ${month} ${day}, ${year}`
}

/** Backend `user_type` !== `customer` → astrologer-style home banner (Flutter `homePage.dart`). */
export function isAstrologerHomeSession(
  user: UserProfile | null | undefined
): boolean {
  if (!user) return false;
  const legacy = user as UserProfile & { user_type?: string };
  const t = user.userType?.trim().toLowerCase() ?? legacy.user_type?.trim().toLowerCase();
  if (!t) return false;
  return t !== "customer";
}
