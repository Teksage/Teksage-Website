"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { capturePartnerRefFromLocation } from "@/lib/partner-ref-storage";

/** Persist YouTube `?ref=` for Profile Referral code autofill (all routes). */
function PartnerRefCaptureInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    capturePartnerRefFromLocation();
  }, [pathname, searchParams]);

  return null;
}

export function PartnerRefCapture() {
  return (
    <Suspense fallback={null}>
      <PartnerRefCaptureInner />
    </Suspense>
  );
}
