"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { pathRequiresAuth } from "@/lib/constants/auth-guard";
import { ROUTES } from "@/lib/constants/routes";
import { useLoginPrompt } from "@/contexts/LoginPromptContext";
import { useAuthStore } from "@/store/auth.store";

type GuardNavigationOptions = {
  redirectHomeOnClose?: boolean;
};

/** Navigate or show Flutter-style login prompt when session is missing. */
export function useAuthNavigation() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { openLoginPrompt } = useLoginPrompt();

  const guardNavigation = useCallback(
    (targetPath: string, options?: GuardNavigationOptions) => {
      if (isAuthenticated) {
        router.push(targetPath);
        return;
      }
      openLoginPrompt({
        returnPath: targetPath,
        redirectHomeOnClose: options?.redirectHomeOnClose ?? false,
      });
    },
    [isAuthenticated, openLoginPrompt, router]
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

  return { guardNavigation, shouldPromptLogin, isAuthenticated };
}
