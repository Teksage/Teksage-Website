"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { capturePartnerRefFromLocation } from "@/lib/partner-ref-storage";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Capture before redirect — otherwise `/?ref=CODE` loses the code.
    capturePartnerRefFromLocation();
    const search = window.location.search || "";
    router.replace(`${ROUTES.home}${search}`);
  }, [router]);

  return null;
}
