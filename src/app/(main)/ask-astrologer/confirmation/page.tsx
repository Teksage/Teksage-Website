"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AskAstrologerShell } from "@/components/ask-astrologer/AskAstrologerShell";
import { AskAstrologerConfirmationContent } from "@/components/ask-astrologer/AskAstrologerConfirmationContent";
import { clearAskAstrologerFlow } from "@/lib/ask-astrologer-session";
import { ROUTES } from "@/lib/constants/routes";
import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";
import {
  ASK_ASTROLOGER_SCREEN,
} from "@/lib/constants/chat-ask-astrologer";

export default function AskAstrologerConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    clearAskAstrologerFlow();
  }, []);

  return (
    <AskAstrologerShell
      title={ASK_ASTROLOGER_SCREEN.confirmationTitle}
      showBack={false}
      centered
      footer={
        <button
          type="button"
          onClick={() => router.push(ROUTES.chat)}
          className={CONSULTATION_BOOKING_LAYOUT.payBtn}
        >
          {ASK_ASTROLOGER_SCREEN.confirmationDone}
        </button>
      }
    >
      <AskAstrologerConfirmationContent />
    </AskAstrologerShell>
  );
}
