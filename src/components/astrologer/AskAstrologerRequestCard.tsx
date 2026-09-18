"use client";

import Link from "next/link";
import { useI18nConstants } from "@/hooks/useT";
import {
  ASK_ASTROLOGER_SCREEN,
  ASK_ASTROLOGER_UI,
} from "@/lib/constants/chat-ask-astrologer";
import { ROUTES } from "@/lib/constants/routes";
import {
  askRequestInitials,
  formatAskRequestLanguages,
} from "@/lib/ask-request-display";
import { cn } from "@/lib/utils";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

function statusClass(status: string): string {
  if (status === "assigned") return ASK_ASTROLOGER_UI.portalStatusAssigned;
  if (status === "answered") return ASK_ASTROLOGER_UI.portalStatusAnswered;
  return "bg-neutral-100 text-black/60 ring-neutral-200";
}

export function AskAstrologerRequestCard({
  req,
}: {
  req: AskAstrologerRequest;
  onAnswered?: () => void;
}) {
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const languages = formatAskRequestLanguages(req.preferred_languages);
  const detailUrl = `${ROUTES.astrologerAskRequests}/${req.id}`;
  const isAnswered = req.status === "answered";

  function getStatusLabel(status: string): string {
    if (status === "assigned") return AA.astrologerStatusAssigned;
    if (status === "answered") return AA.astrologerStatusAnswered;
    return status;
  }

  const tagClass =
    "rounded-full border border-[color-mix(in_srgb,var(--color-brand-primary)_18%,transparent)] bg-[color-mix(in_srgb,var(--color-home-screen-mint)_16%,white)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-black)]";

  return (
    <li className={ASK_ASTROLOGER_UI.portalCard}>
      <Link
        href={detailUrl}
        className="block transition-colors hover:bg-neutral-50/40"
      >
        <div className="p-5 sm:p-6">
          {/* Header: Customer Info + Request Meta + Action Button */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className={ASK_ASTROLOGER_UI.portalAvatar} aria-hidden>
                {askRequestInitials(req.customer_name)}
              </div>
              <div>
                <p className={ASK_ASTROLOGER_UI.portalCustomerName}>
                  {req.customer_name ?? AA.astrologerClientFallback}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className={ASK_ASTROLOGER_UI.portalRequestId}>
                    {AA.astrologerRequestLabel} #{req.id}
                  </span>
                  <span
                    className={cn(
                      ASK_ASTROLOGER_UI.portalStatusBadge,
                      statusClass(req.status)
                    )}
                  >
                    {getStatusLabel(req.status)}
                  </span>
                </div>
              </div>
            </div>

            <span
              className={cn(
                "hidden sm:inline-flex shrink-0 items-center rounded-full px-5 py-2 text-xs font-bold shadow-sm transition-opacity hover:opacity-90",
                isAnswered
                  ? "border-[1.5px] border-[var(--color-chat-consult-btn-border)] bg-white text-[var(--color-chat-consult-btn-text)]"
                  : "bg-[var(--color-brand-primary)] text-white shadow-[0_2px_8px_rgb(16_177_0_/_0.2)]"
              )}
            >
              {isAnswered
                ? AA.astrologerOpenAnsweredBtn
                : AA.astrologerOpenDetailsBtn}
            </span>
          </div>

          {/* Question Text */}
          <div className="mt-4">
            <p className="line-clamp-2 text-body-sm font-semibold leading-relaxed text-[var(--color-brand-black)] sm:text-base">
              {req.user_question}
            </p>
          </div>

          {/* Birth & Language snapshot tags */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            {req.date_of_birth ? (
              <span className={tagClass}>
                {req.date_of_birth}
              </span>
            ) : null}
            {req.rashi ? (
              <span className={tagClass}>
                {req.rashi}
              </span>
            ) : null}
            {req.nakshatra ? (
              <span className={tagClass}>
                {req.nakshatra}
              </span>
            ) : null}
            {languages !== "—" ? (
              <span className={tagClass}>
                {languages}
              </span>
            ) : null}
          </div>

          {/* Mobile CTA */}
          <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3 sm:hidden">
            <span className="text-xs font-medium text-black/45">
              {req.status === "assigned"
                ? AA.astrologerStatusAssigned
                : AA.astrologerStatusAnswered}
            </span>
            <span
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold shadow-sm",
                isAnswered
                  ? "border-[1.5px] border-[var(--color-chat-consult-btn-border)] bg-white text-[var(--color-chat-consult-btn-text)]"
                  : "bg-[var(--color-brand-primary)] text-white shadow-[0_2px_8px_rgb(16_177_0_/_0.2)]"
              )}
            >
              {isAnswered
                ? AA.astrologerOpenAnsweredBtn
                : AA.astrologerOpenDetailsBtn}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
