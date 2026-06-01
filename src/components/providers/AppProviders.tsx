"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AppLoaderProvider } from "@/contexts/AppLoaderContext";
import { AppLanguageProvider } from "@/contexts/AppLanguageProvider";
import { LoginPromptProvider } from "@/contexts/LoginPromptContext";
import { reconcileAuthSession } from "@/lib/auth-session";
import { restoreUserTypeIfMissing, syncAuthStoreFromSession } from "@/lib/auth-user-type";
import { isClientLoggedIn } from "@/lib/auth-session";
import type { AppLocale } from "@/lib/i18n/locale";

export function AppProviders({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: AppLocale;
}) {
  const router = useRouter();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    reconcileAuthSession();
    syncAuthStoreFromSession();
    restoreUserTypeIfMissing();

    if (isClientLoggedIn()) {
      void import("@/lib/services/push-notifications").then(
        ({ initWebPush, subscribeToForegroundMessages }) => {
          // Defer until auth + service worker are ready after hydration
          window.setTimeout(() => void initWebPush(), 800);
          return subscribeToForegroundMessages((path) => router.push(path)).then(
            (unsub) => {
              unsubscribeRef.current = unsub;
            }
          );
        }
      );
    }

    return () => {
      unsubscribeRef.current?.();
    };
  }, []);

  return (
    <AppLanguageProvider initialLocale={initialLocale}>
      <LoginPromptProvider>
        <AppLoaderProvider>{children}</AppLoaderProvider>
      </LoginPromptProvider>
    </AppLanguageProvider>
  );
}
