"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "@/components/common/Loader";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import { useAuthStore } from "@/store/auth.store";
import type { ConsultationAuthGateProps } from "@/types/ui/consultation";

/** Requires login before consultation booking (Flutter `handleConsultationNavigation`). */
export function ConsultationAuthGate({
  children,
  redirectPath,
}: ConsultationAuthGateProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(buildLoginRedirectPath(redirectPath));
    }
  }, [isAuthenticated, redirectPath, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
