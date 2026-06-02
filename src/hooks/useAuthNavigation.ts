"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { pathRequiresAuth } from "@/lib/constants/auth-guard";
import { isClientLoggedIn } from "@/lib/auth-session";
import { ROUTES } from "@/lib/constants/routes";
import { useLoginPrompt } from "@/contexts/LoginPromptContext";

type GuardNavigationOptions = {
  redirectHomeOnClose?: boolean;
};

/** Navigate or show Flutter-style login prompt when session is missing. */
export function useAuthNavigation() {
  const router = useRouter();
  const loggedIn = isClientLoggedIn();
  const { openLoginPrompt } = useLoginPrompt();

  const guardNavigation = useCallback(
    (targetPath: string, options?: GuardNavigationOptions) => {
      if (loggedIn) {
        router.push(targetPath);
        return;
      }
      openLoginPrompt({
        returnPath: targetPath,
        redirectHomeOnClose: options?.redirectHomeOnClose ?? false,
      });
    },
    [loggedIn, openLoginPrompt, router]
  );

  const shouldPromptLogin = useCallback(
    (targetPath: string) => {
      if (targetPath === ROUTES.home || targetPath.startsWith(`${ROUTES.home}/`)) {
        return false;
      }
      if (targetPath === ROUTES.settings || targetPath === `${ROUTES.settings}/`) {
        return false;
      }
      return pathRequiresAuth(targetPath);
    },
    []
  );

  return { guardNavigation, shouldPromptLogin, isAuthenticated: loggedIn };
}
