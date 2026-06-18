"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense, type ReactNode } from "react";
import {
  buildPostHogPersonTraits,
  getPostHogHost,
  getPostHogInitOptions,
  getPostHogKey,
  identifyUser,
  posthogShouldTrack,
  resetUser,
} from "@/lib/analytics/posthog-client";
import { useAuthStore } from "@/store/auth.store";

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (pathname && ph) {
      const url = window.origin + pathname;
      const search = searchParams?.toString();
      ph.capture("$pageview", {
        $current_url: search ? `${url}?${search}` : url,
      });
    }
  }, [pathname, searchParams, ph]);

  return null;
}

export function PostHogProvider({ children }: { children: ReactNode }) {
  const shouldTrack = posthogShouldTrack();
  const posthogKey = getPostHogKey();
  const posthogHost = getPostHogHost();
  const wasAuthenticatedRef = useRef(useAuthStore.getState().isAuthenticated);

  useEffect(() => {
    if (!shouldTrack || !posthogKey || !posthogHost) return;

    if (typeof window !== "undefined" && !posthog.__loaded) {
      posthog.init(posthogKey, getPostHogInitOptions());
    }

    function syncIdentity() {
      if (!posthog.__loaded) return;

      const state = useAuthStore.getState();
      if (state.isAuthenticated && state.user?.id) {
        identifyUser(state.user.id, buildPostHogPersonTraits(state.user));
        wasAuthenticatedRef.current = true;
        return;
      }

      if (wasAuthenticatedRef.current) {
        resetUser();
        wasAuthenticatedRef.current = false;
      }
    }

    syncIdentity();
    return useAuthStore.subscribe(syncIdentity);
  }, [shouldTrack, posthogKey, posthogHost]);

  if (!shouldTrack) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}

export { usePostHog } from "posthog-js/react";
export {
  trackEvent,
  identifyUser,
  resetUser,
  setUserProperties,
  getPostHog,
} from "@/lib/analytics/posthog-client";
