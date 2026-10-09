"use client";

import { useRouter } from "next/navigation";
import { useI18nConstants } from "@/hooks/useT";
import { MARATHON_COPY, MARATHON_PAGE } from "@/lib/constants/marathon";
import { marathonCheckoutPath } from "@/lib/constants/routes";
import type { MarathonBookPanelProps } from "@/types/marathon";

export function MarathonBookPanel({ event, slotId }: MarathonBookPanelProps) {
  const copy = useI18nConstants(MARATHON_COPY);
  const router = useRouter();
  return (
    <button
      type="button"
      className={MARATHON_PAGE.payBar}
      onClick={() => router.push(marathonCheckoutPath(event.id, slotId))}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.8" />
      </svg>
      {copy.payBar}
      <span aria-hidden>→</span>
    </button>
  );
}
