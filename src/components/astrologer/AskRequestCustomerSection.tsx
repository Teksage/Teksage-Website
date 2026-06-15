import { ASK_ASTROLOGER_SCREEN, ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";
import {
  askRequestInitials,
  formatAskRequestLanguages,
} from "@/lib/ask-request-display";
import { AskRequestDetailField } from "@/components/astrologer/AskRequestDetailField";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

export function AskRequestCustomerSection({ req }: { req: AskAstrologerRequest }) {
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
            {ASK_ASTROLOGER_SCREEN.astrologerCustomerSection}
          </p>
        </div>
      </div>

      <div className={ASK_ASTROLOGER_UI.portalDetailGrid}>
        {req.date_of_birth ? (
          <AskRequestDetailField
            label={ASK_ASTROLOGER_SCREEN.astrologerDetailDob}
            value={req.date_of_birth}
          />
        ) : null}
        {req.time_of_birth ? (
          <AskRequestDetailField
            label={ASK_ASTROLOGER_SCREEN.astrologerDetailTob}
            value={req.time_of_birth}
          />
        ) : null}
        {req.place_of_birth ? (
          <AskRequestDetailField
            label={ASK_ASTROLOGER_SCREEN.astrologerDetailPob}
            value={req.place_of_birth}
          />
        ) : null}
        {req.rashi ? (
          <AskRequestDetailField
            label={ASK_ASTROLOGER_SCREEN.astrologerDetailRasi}
            value={req.rashi}
          />
        ) : null}
        {req.nakshatra ? (
          <AskRequestDetailField
            label={ASK_ASTROLOGER_SCREEN.astrologerDetailNakshatra}
            value={req.nakshatra}
          />
        ) : null}
        {languages !== "—" ? (
          <AskRequestDetailField
            label={ASK_ASTROLOGER_SCREEN.astrologerDetailLanguage}
            value={languages}
          />
        ) : null}
      </div>
    </section>
  );
}
