import { fetchProfileSettings } from "@/lib/services/settings-profile";
import { fetchProfile } from "@/lib/services/profile";
import type { ProfileSettingsPayload } from "@/types/settings";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Mirrors Flutter `waitForPremiumProfile` — subscription + plan details present. */
export function isPremiumProfileActivated(
  payload: ProfileSettingsPayload
): boolean {
  return payload.subscription != null && payload.planDetails != null;
}

/** Poll profile until premium is active (after payment verify). */
export async function waitForPremiumActivation(
  maxAttempts = 12,
  delayMs = 1000
): Promise<ProfileSettingsPayload> {
  let latest = await fetchProfileSettings();
  for (let i = 0; i < maxAttempts && !isPremiumProfileActivated(latest); i++) {
    await sleep(delayMs);
    latest = await fetchProfileSettings();
  }
  return latest;
}

export async function refreshAuthProfileAfterSubscription(): Promise<void> {
  const { useAuthStore } = await import("@/store/auth.store");
  const profile = await fetchProfile();
  useAuthStore.getState().updateUser(profile);
}
