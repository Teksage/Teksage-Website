"use client";

import { useI18nConstants } from "@/hooks/useT";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConsultationShell } from "@/components/consultation/ConsultationShell";
import { CONSULTATION_LAYOUT, CONSULTATION_SCREEN, ROUTES } from "@/lib/constants";

/** Astrologer portal entry from home banner (`ROUTES.consultationAstrologer`). */
export function ConsultationAstrologerHubView() {
  const C = useI18nConstants(CONSULTATION_SCREEN);
  const router = useRouter();

  return (
    <ConsultationShell
      title={C.astrologerHubTitle}
      onBack={() => router.push(ROUTES.home)}
    >
      <p className="text-sm text-neutral-700">{C.astrologerHubHint}</p>
      <Link href={ROUTES.profile} className={CONSULTATION_LAYOUT.footerCta}>
        {C.astrologerHubCta}
      </Link>
    </ConsultationShell>
  );
}
