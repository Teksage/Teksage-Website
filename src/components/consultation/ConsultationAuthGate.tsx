"use client";

import { useEffect } from "react";
import { isClientLoggedIn } from "@/lib/auth-session";
import { useLoginPrompt } from "@/contexts/LoginPromptContext";
import type { ConsultationAuthGateProps } from "@/types/ui/consultation";

/** Requires login before consultation booking — Flutter `LoginPromptDialog`. */
export function ConsultationAuthGate({
  children,
  redirectPath,
}: ConsultationAuthGateProps) {
  const loggedIn = isClientLoggedIn();
  const { openLoginPrompt } = useLoginPrompt();

  useEffect(() => {
    if (loggedIn) return;
    openLoginPrompt({
      returnPath: redirectPath,
      redirectHomeOnClose: true,
    });
  }, [loggedIn, openLoginPrompt, redirectPath]);

  if (!loggedIn) return null;

  return <>{children}</>;
}
