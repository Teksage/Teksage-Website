"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { MarathonAstrologerBookings } from "@/components/marathon/MarathonAstrologerBookings";
import { useT } from "@/hooks/useT";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { ROUTES } from "@/lib/constants/routes";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AstrologerMarathonEventPage({ params }: PageProps) {
  const { id } = use(params);
  const { t } = useT();
  const router = useRouter();
  const ui = MARATHON_PORTAL_UI;
  const marathonId = Number(id);

  return (
    <div className="chat-conversation-surface relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      <div className="relative z-10 flex min-h-screen w-full flex-col px-5 py-4">
        <button type="button" className={ui.back} onClick={() => router.push(ROUTES.astrologerMarathon)}>
          <svg viewBox="0 0 24 24" className={ui.backIcon} fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t("Go back")}</span>
        </button>
        <div className="mx-auto mt-4 w-full max-w-5xl">
          {Number.isFinite(marathonId) ? <MarathonAstrologerBookings marathonId={marathonId} /> : null}
        </div>
      </div>
    </div>
  );
}
