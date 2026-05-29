"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isClientLoggedIn } from "@/lib/auth-session";
import {
  hasSeenWelcomeMessage,
  markWelcomeMessageSeen,
} from "@/lib/onboarding-storage";
import { ROUTES } from "@/lib/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { isAstrologerHomeSession } from "@/lib/utils";

/**
 * Flutter `homePage.dart` `getProfileData` — one-time welcome for non-subscribers.
 */
export function useWelcomeRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (pathname !== ROUTES.home) return;
    if (!isClientLoggedIn() || !user) return;
    if (user.isPremium || isAstrologerHomeSession(user)) return;
    if (hasSeenWelcomeMessage()) return;

    markWelcomeMessageSeen();
    router.replace(ROUTES.welcome);
  }, [pathname, user, router]);
}
