"use client";

import { AskAstrologerCheckoutFees } from "@/components/ask-astrologer/AskAstrologerCheckoutFees";
import { ASK_ASTROLOGER_SCREEN, ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";
import type { AskAstrologerCheckoutSummaryProps } from "@/types/ui/ask-astrologer";

export function AskAstrologerCheckoutSummary({
  question,
  pricing,
  currency,
  baseAmount,
  total,
  isINR,
}: AskAstrologerCheckoutSummaryProps) {
  return (
    <div className={ASK_ASTROLOGER_UI.checkoutPanel}>
      <div className={ASK_ASTROLOGER_UI.checkoutPanelSection}>
        <p className={ASK_ASTROLOGER_UI.sectionLabel}>
          {ASK_ASTROLOGER_SCREEN.checkoutYourQuestion}
        </p>
        <p className={ASK_ASTROLOGER_UI.questionText}>{question}</p>
      </div>
      <div className={ASK_ASTROLOGER_UI.checkoutPanelDivider} aria-hidden />
      <div className={ASK_ASTROLOGER_UI.checkoutPanelSection}>
        <AskAstrologerCheckoutFees
          embedded
          pricing={pricing}
          currency={currency}
          baseAmount={baseAmount}
          total={total}
          isINR={isINR}
        />
      </div>
    </div>
  );
}
