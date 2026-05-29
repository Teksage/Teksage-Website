"use client";

import { useEffect, type ReactNode } from "react";
import { AppLoaderProvider } from "@/contexts/AppLoaderContext";
import { AppLanguageProvider } from "@/contexts/AppLanguageProvider";
import { LoginPromptProvider } from "@/contexts/LoginPromptContext";
import { reconcileAuthSession } from "@/lib/auth-session";
import { restoreUserTypeIfMissing, syncAuthStoreFromSession } from "@/lib/auth-user-type";
import type { AppLocale } from "@/lib/i18n/locale";

export function AppProviders({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: AppLocale;
}) {
  useEffect(() => {
    reconcileAuthSession();
    syncAuthStoreFromSession();
    restoreUserTypeIfMissing();
  }, []);

  return (
    <AppLanguageProvider initialLocale={initialLocale}>
      <LoginPromptProvider>
        <AppLoaderProvider>{children}</AppLoaderProvider>
      </LoginPromptProvider>
    </AppLanguageProvider>
  );
}
