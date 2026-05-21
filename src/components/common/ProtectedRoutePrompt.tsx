"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { pathRequiresAuth } from "@/lib/constants/auth-guard";
import { useLoginPrompt } from "@/contexts/LoginPromptContext";
import { useAuthStore } from "@/store/auth.store";

/** Shows login prompt when user opens a protected URL without a session (Flutter tab guard). */
export function ProtectedRoutePrompt() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { openLoginPrompt } = useLoginPrompt();
  const promptedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      promptedKeyRef.current = null;
      return;
    }
    if (!pathRequiresAuth(pathname)) return;

    const key = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    if (promptedKeyRef.current === key) return;
    promptedKeyRef.current = key;

    openLoginPrompt({
      returnPath: key,
      redirectHomeOnClose: true,
    });
  }, [isAuthenticated, openLoginPrompt, pathname, searchParams]);

  return null;
}
