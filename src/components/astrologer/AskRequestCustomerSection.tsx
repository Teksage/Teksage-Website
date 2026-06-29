"use client";

import { useI18nConstants } from "@/hooks/useT";
import { ASK_ASTROLOGER_SCREEN, ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";
import {
  askRequestInitials,
  formatAskRequestLanguages,
} from "@/lib/ask-request-display";
import { AskRequestDetailField } from "@/components/astrologer/AskRequestDetailField";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

export function AskRequestCustomerSection({ req }: { req: AskAstrologerRequest }) {
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);
  const languages = formatAskRequestLanguages(req.preferred_languages);

  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <div className={ASK_ASTROLOGER_UI.portalAvatar} aria-hidden>
          {askRequestInitials(req.customer_name)}
        </div>
        <div className="min-w-0">
          <p className={ASK_ASTROLOGER_UI.portalCustomerName}>
            {req.customer_name ?? "Client"}
          </p>
          <p className="mt-0.5 text-sm text-black/50">
            {AA.astrologerCustomerSection}
          </p>
        </div>
      </div>

      <div className={ASK_ASTROLOGER_UI.portalDetailGrid}>
        {req.date_of_birth ? (
          <AskRequestDetailField
            label={AA.astrologerDetailDob}
            value={req.date_of_birth}
          />
        ) : null}
        {req.time_of_birth ? (
          <AskRequestDetailField
            label={AA.astrologerDetailTob}
            value={req.time_of_birth}
          />
        ) : null}
        {req.place_of_birth ? (
          <AskRequestDetailField
            label={AA.astrologerDetailPob}
            value={req.place_of_birth}
          />
        ) : null}
        {req.rashi ? (
          <AskRequestDetailField
            label={AA.astrologerDetailRasi}
            value={req.rashi}
          />
        ) : null}
        {req.nakshatra ? (
          <AskRequestDetailField
            label={AA.astrologerDetailNakshatra}
            value={req.nakshatra}
          />
        ) : null}
        {languages !== "—" ? (
          <AskRequestDetailField
            label={AA.astrologerDetailLanguage}
            value={languages}
          />
        ) : null}
      </div>
    </section>
  );
}
