import { STORAGE_KEYS } from "@/lib/constants";

/** Mirrors Flutter `SharedPreferences` bool `true` (web stores string). */
const BOOL_TRUE = "true";

function readBool(key: string): boolean {
  if (typeof window === "undefined") return false;
  const value = localStorage.getItem(key);
  return value === BOOL_TRUE || value === "1";
}

function writeBool(key: string): void {
  localStorage.setItem(key, BOOL_TRUE);
}

/** Flutter `getOnboardingStatus` / `seenOnboarding`. */
export function hasSeenOnboarding(): boolean {
  return readBool(STORAGE_KEYS.onboardingSeen);
}

/** Flutter `saveOnboardingStatus`. */
export function markOnboardingSeen(): void {
  writeBool(STORAGE_KEYS.onboardingSeen);
}

/** Flutter `getWelcomeMessageStatus` / `seenWelcomeMessage`. */
export function hasSeenWelcomeMessage(): boolean {
  return readBool(STORAGE_KEYS.welcomeSeen);
}

/** Flutter `saveWelcomeMessageStatus`. */
export function markWelcomeMessageSeen(): void {
  writeBool(STORAGE_KEYS.welcomeSeen);
}

/** Flutter `clearWelcomeMessageStatus` (logout). */
export function clearWelcomeMessageSeen(): void {
  localStorage.removeItem(STORAGE_KEYS.welcomeSeen);
}
