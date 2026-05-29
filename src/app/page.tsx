"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { hasClientAuthToken } from "@/lib/auth-session";
import { hasSeenOnboarding } from "@/lib/onboarding-storage";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    if (hasClientAuthToken()) {
      router.replace(ROUTES.home);
      return;
    }
    router.replace(hasSeenOnboarding() ? ROUTES.home : ROUTES.onboarding);
  }, [router]);

  return null;
}
