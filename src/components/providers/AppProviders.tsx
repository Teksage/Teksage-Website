"use client";

import type { ReactNode } from "react";
import { AppLoaderProvider } from "@/contexts/AppLoaderContext";
import { AppLanguageProvider } from "@/contexts/AppLanguageProvider";
import type { AppLocale } from "@/lib/i18n/locale";

export function AppProviders({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: AppLocale;
}) {
  return (
    <AppLanguageProvider initialLocale={initialLocale}>
      <AppLoaderProvider>{children}</AppLoaderProvider>
    </AppLanguageProvider>
  );
}
