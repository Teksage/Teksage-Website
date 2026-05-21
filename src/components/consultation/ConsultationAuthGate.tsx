"use client";

import { useEffect } from "react";
import { useLoginPrompt } from "@/contexts/LoginPromptContext";
import { useAuthStore } from "@/store/auth.store";
import type { ConsultationAuthGateProps } from "@/types/ui/consultation";

/** Requires login before consultation booking — Flutter `LoginPromptDialog`. */
export function ConsultationAuthGate({
  children,
  redirectPath,
}: ConsultationAuthGateProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { openLoginPrompt } = useLoginPrompt();

  useEffect(() => {
    if (isAuthenticated) return;
    openLoginPrompt({
      returnPath: redirectPath,
      redirectHomeOnClose: true,
    });
  }, [isAuthenticated, openLoginPrompt, redirectPath]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
