"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AskAstrologerShell } from "@/components/ask-astrologer/AskAstrologerShell";
import { AskAstrologerConfirmationContent } from "@/components/ask-astrologer/AskAstrologerConfirmationContent";
import { clearAskAstrologerFlow } from "@/lib/ask-astrologer-session";
import { useI18nConstants } from "@/hooks/useT";
import { ROUTES } from "@/lib/constants/routes";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import { ASK_ASTROLOGER_SCREEN } from "@/lib/constants/chat-ask-astrologer";

export default function AskAstrologerConfirmationPage() {
  const router = useRouter();
  const AA = useI18nConstants(ASK_ASTROLOGER_SCREEN);

  useEffect(() => {
    clearAskAstrologerFlow();
  }, []);

  return (
    <AskAstrologerShell
      title={AA.confirmationTitle}
      showBack={false}
      centered
      footer={
        <button
          type="button"
          onClick={() => router.push(ROUTES.chat)}
          className={CONSULTATION_BOOKING_LAYOUT.payBtn}
        >
          {AA.confirmationDone}
        </button>
      }
    >
      <AskAstrologerConfirmationContent />
    </AskAstrologerShell>
  );
}
