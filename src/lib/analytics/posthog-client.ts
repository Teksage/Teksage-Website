import posthog from "posthog-js";
import type { UserProfile } from "@/types";

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim() ?? "";
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() ?? "";
const ENABLE_IN_DEV =
  process.env.NEXT_PUBLIC_POSTHOG_ENABLE_IN_DEV?.trim().toLowerCase() === "true";

/** PostHog runs when key+host are set and (production build, or dev opt-in). */
export function posthogShouldTrack(): boolean {
  if (!POSTHOG_KEY || !POSTHOG_HOST) return false;
  return process.env.NODE_ENV === "production" || ENABLE_IN_DEV;
}

export function getPostHogKey(): string {
  return POSTHOG_KEY;
}

export function getPostHogHost(): string {
  return POSTHOG_HOST;
}

export function getPostHogInitOptions() {
  return {
    api_host: POSTHOG_HOST,
    ui_host: "https://us.posthog.com",
    person_profiles: "identified_only" as const,
    capture_pageview: false,
    capture_pageleave: true,
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: "[data-sensitive]",
    },
  };
}

export function buildPostHogPersonTraits(
  user: UserProfile
): Record<string, string> {
  const traits: Record<string, string> = { name: user.name };
  if (user.email) traits.email = user.email;
  if (user.userType?.trim()) traits.user_type = user.userType.trim();
  return traits;
}

function isReady(): boolean {
  return (
    typeof window !== "undefined" && !!posthog.__loaded && posthogShouldTrack()
  );
}

export function trackEvent(
  eventName: string,
  properties?: Record<string, unknown>
): void {
  if (isReady()) posthog.capture(eventName, properties);
}

export function identifyUser(
  userId: string,
  properties?: Record<string, unknown>
): void {
  if (isReady()) posthog.identify(userId, properties);
}

export function resetUser(): void {
  if (isReady()) posthog.reset();
}

export function setUserProperties(properties: Record<string, unknown>): void {
  if (isReady()) posthog.setPersonProperties(properties);
}

export function getPostHog(): typeof posthog | null {
  return isReady() ? posthog : null;
}
