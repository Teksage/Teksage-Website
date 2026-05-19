import Image from "next/image";
import Link from "next/link";
import {
  consultationFeeForAstrologer,
  formatConsultationFee,
} from "@/lib/consultation-currency";
import { CONSULTATION_LAYOUT, CONSULTATION_SCREEN } from "@/lib/constants";
import type { ConsultationAstrologerCardProps } from "@/types/ui/consultation";

export function ConsultationAstrologerCard({
  astrologer,
  currency,
  href,
}: ConsultationAstrologerCardProps) {
  const name = [astrologer.user?.first_name, astrologer.user?.last_name]
    .filter(Boolean)
    .join(" ");
  const fee = consultationFeeForAstrologer(astrologer, currency);

  return (
    <Link href={href} className={CONSULTATION_LAYOUT.card}>
      <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-neutral-100">
        {astrologer.picture ? (
          <Image
            src={astrologer.picture}
            alt=""
            width={64}
            height={64}
            unoptimized
            className="size-full object-cover"
          />
        ) : (
          <span className="flex size-full items-center justify-center text-lg font-bold text-[var(--color-brand-primary)]">
            {(name || "A").charAt(0)}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-semibold text-[var(--color-brand-black)]">
            {name || "Astrologer"}
          </p>
          {astrologer.match_percentage != null ? (
            <span className={CONSULTATION_LAYOUT.matchBadge}>
              {astrologer.match_percentage}% {CONSULTATION_SCREEN.matchLabel}
            </span>
          ) : null}
        </div>
        {astrologer.experience != null ? (
          <p className="text-xs text-neutral-600">
            {astrologer.experience} {CONSULTATION_SCREEN.experienceYears}
          </p>
        ) : null}
        <p className="mt-1 text-sm font-semibold text-[var(--color-brand-primary)]">
          {formatConsultationFee(fee, currency)}
        </p>
      </div>
    </Link>
  );
}
