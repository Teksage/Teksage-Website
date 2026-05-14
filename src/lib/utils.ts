import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { UserProfile } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Date line on daily prediction card — mirrors Flutter `getCurrentTime()` (day rolls before 6:00). */
export function formatHomeDashboardDate(now = new Date()): string {
  const sixAM = new Date(now)
  sixAM.setHours(6, 0, 0, 0)
  const display =
    now < sixAM ? new Date(now.getTime() - 86400000) : now
  const weekday = display.toLocaleDateString("en-US", { weekday: "short" })
  const month = display.toLocaleDateString("en-US", { month: "short" })
  const day = display.getDate()
  const year = display.getFullYear()
  return `${weekday} - ${month} ${day}, ${year}`
}

/** Backend `user_type` !== `customer` → astrologer-style home banner (Flutter `homePage.dart`). */
export function isAstrologerHomeSession(
  user: UserProfile | null | undefined
): boolean {
  const t = user?.userType?.trim().toLowerCase()
  if (!t) return false
  return t !== "customer"
}
