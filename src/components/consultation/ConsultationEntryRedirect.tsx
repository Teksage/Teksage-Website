"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { consultationHubPath } from "@/lib/constants/consultation-routes";
import { defaultConsultationFilter } from "@/lib/consultation-default-filter";
import { writeConsultationFilter } from "@/lib/consultation-session";

/** Skips category/language steps — opens consultation hub on the astrologer tab. */
export function ConsultationEntryRedirect() {
  const router = useRouter();

  useEffect(() => {
    writeConsultationFilter(defaultConsultationFilter());
    router.replace(consultationHubPath());
  }, [router]);

  return <LoadingOverlay open />;
}
