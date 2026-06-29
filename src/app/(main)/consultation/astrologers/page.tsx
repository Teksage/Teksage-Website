"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { consultationHubPath } from "@/lib/constants/consultation-routes";

/** Legacy route — redirects to consultation hub with astrologer tab. */
export default function ConsultationAstrologersRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(consultationHubPath());
  }, [router]);

  return <LoadingOverlay open />;
}
