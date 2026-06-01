"use client";

import { useEffect } from "react";
import { PageLoadingCenter } from "@/components/common/Loader";
import { useLoginPrompt } from "@/contexts/LoginPromptContext";
import { useHydratedLoggedIn } from "@/hooks/useHydratedLoggedIn";
import type { ConsultationAuthGateProps } from "@/types/ui/consultation";

/** Requires login before consultation booking — Flutter `LoginPromptDialog`. */
export function ConsultationAuthGate({
  children,
  redirectPath,
}: ConsultationAuthGateProps) {
  const { ready, loggedIn } = useHydratedLoggedIn();
  const { openLoginPrompt } = useLoginPrompt();

  useEffect(() => {
    if (!ready) return;
    if (loggedIn) return;
    openLoginPrompt({
      returnPath: redirectPath,
      redirectHomeOnClose: true,
    });
  }, [ready, loggedIn, openLoginPrompt, redirectPath]);

  if (!ready || !loggedIn) {
    return <PageLoadingCenter className="min-h-dvh" />;
  }

  return <>{children}</>;
}
