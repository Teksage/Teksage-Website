"use client";

import type { ReactNode } from "react";
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
      {children}
    </AppLanguageProvider>
  );
}
