"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES, STORAGE_KEYS } from "@/lib/constants";
import { hasClientAuthToken } from "@/lib/auth-session";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    if (hasClientAuthToken()) {
      router.replace(ROUTES.home);
      return;
    }
    const seen = localStorage.getItem(STORAGE_KEYS.onboardingSeen) === "1";
    router.replace(seen ? ROUTES.login : ROUTES.onboarding);
  }, [router]);

  return null;
}
