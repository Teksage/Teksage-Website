"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { defaultConsultationFilter } from "@/lib/consultation-default-filter";
import { writeConsultationFilter } from "@/lib/consultation-session";
import { ROUTES } from "@/lib/constants";

/** Skips category/language steps — opens astrologer listing (Flutter home → top 5 flow). */
export function ConsultationEntryRedirect() {
  const router = useRouter();

  useEffect(() => {
    writeConsultationFilter(defaultConsultationFilter());
    router.replace(ROUTES.consultationAstrologers);
  }, [router]);

  return <LoadingOverlay open />;
}
