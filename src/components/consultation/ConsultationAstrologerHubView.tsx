"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConsultationShell } from "@/components/consultation/ConsultationShell";
import { CONSULTATION_LAYOUT, CONSULTATION_SCREEN, ROUTES } from "@/lib/constants";

/** Astrologer portal entry from home banner (`ROUTES.consultationAstrologer`). */
export function ConsultationAstrologerHubView() {
  const router = useRouter();

  return (
    <ConsultationShell
      title={CONSULTATION_SCREEN.astrologerHubTitle}
      onBack={() => router.push(ROUTES.home)}
    >
      <p className="text-sm text-neutral-700">{CONSULTATION_SCREEN.astrologerHubHint}</p>
      <Link href={ROUTES.profile} className={CONSULTATION_LAYOUT.footerCta}>
        {CONSULTATION_SCREEN.astrologerHubCta}
      </Link>
    </ConsultationShell>
  );
}
