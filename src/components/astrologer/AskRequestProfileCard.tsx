"use client";

import { useI18nConstants } from "@/hooks/useT";
import {
  ASK_ASTROLOGER_SCREEN,
  ASK_ASTROLOGER_UI,
} from "@/lib/constants/chat-ask-astrologer";
import {
  askRequestInitials,
  formatAskRequestLanguages,
} from "@/lib/ask-request-display";
import { AskRequestDetailField } from "@/components/astrologer/AskRequestDetailField";
import { cn } from "@/lib/utils";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";
import type { AskRequestProfileCardProps, AstroHoroscope } from "@/types/astrologer-portal";

function statusClass(status: string): string {
  if (status === "assigned") return ASK_ASTROLOGER_UI.portalStatusAssigned;
  if (status === "answered") return ASK_ASTROLOGER_UI.portalStatusAnswered;
  return "bg-neutral-100 text-black/60 ring-neutral-200";
}

export function AskRequestProfileCard({ req, horoscope }: AskRequestProfileCardProps) {
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const languages = formatAskRequestLanguages(req.preferred_languages);

  const dob = req.date_of_birth || (horoscope?.date_of_birth ? String(horoscope.date_of_birth) : null);
  const tob = req.time_of_birth || (horoscope?.time_of_birth ? String(horoscope.time_of_birth) : null);
  const pob = req.place_of_birth || (horoscope?.place_of_birth ? String(horoscope.place_of_birth) : null);
  const lagna = horoscope?.lagna ? String(horoscope.lagna) : null;
  const rasi = req.rashi || (horoscope?.rashi ? String(horoscope.rashi) : null);
  const nakshatra = req.nakshatra || (horoscope?.nakshatra ? String(horoscope.nakshatra) : null);
  const currentDasa = horoscope?.current_dasa ? String(horoscope.current_dasa) : null;

  function getStatusLabel(status: string): string {
    if (status === "assigned") return AA.astrologerStatusAssigned;
    if (status === "answered") return AA.astrologerStatusAnswered;
    return status;
  }

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-[var(--color-chat-bot-border)] bg-white p-5 shadow-[0_1px_6px_rgb(0_0_0_/_0.06)] sm:p-6 lg:p-7">
      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={ASK_ASTROLOGER_UI.portalAvatar} aria-hidden>
              {askRequestInitials(req.customer_name)}
            </div>
            <div className="min-w-0">
              <p className={ASK_ASTROLOGER_UI.portalCustomerName}>
                {req.customer_name ?? "Client"}
              </p>
              <p className="mt-0.5 text-xs text-black/50">
                {AA.astrologerCustomerSection}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className={ASK_ASTROLOGER_UI.portalRequestId}>
              Request #{req.id}
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

        <div className={cn(ASK_ASTROLOGER_UI.portalDetailGrid, "mt-4 pt-4 border-t border-black/5")}>
          {dob ? (
            <AskRequestDetailField
              label={AA.astrologerDetailDob}
              value={dob}
            />
          ) : null}
          {tob ? (
            <AskRequestDetailField
              label={AA.astrologerDetailTob}
              value={tob}
            />
          ) : null}
          {pob ? (
            <AskRequestDetailField
              label={AA.astrologerDetailPob}
              value={pob}
            />
          ) : null}
          {lagna ? (
            <AskRequestDetailField
              label={AA.astrologerDetailLagna}
              value={lagna}
            />
          ) : null}
          {rasi ? (
            <AskRequestDetailField
              label={AA.astrologerDetailRasi}
              value={rasi}
            />
          ) : null}
          {nakshatra ? (
            <AskRequestDetailField
              label={AA.astrologerDetailNakshatra}
              value={nakshatra}
            />
          ) : null}
          {languages !== "—" ? (
            <AskRequestDetailField
              label={AA.astrologerDetailLanguage}
              value={languages}
            />
          ) : null}
          {currentDasa ? (
            <AskRequestDetailField
              label={AA.astrologerDetailCurrentDasa}
              value={currentDasa}
              className="sm:col-span-2"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
