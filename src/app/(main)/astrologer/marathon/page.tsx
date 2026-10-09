"use client";

import { useRouter } from "next/navigation";
import { MarathonAstrologerList } from "@/components/marathon/MarathonAstrologerList";
import { MarathonEventsHero } from "@/components/marathon/MarathonEventsHero";
import { useI18nConstants, useT } from "@/hooks/useT";
import { ASTRO_PORTAL_UI } from "@/lib/constants/astrologer-portal";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { MARATHON_COPY, MARATHON_PORTAL_UI } from "@/lib/constants/marathon";
import { ROUTES } from "@/lib/constants/routes";

export default function AstrologerMarathonPage() {
  const AP = useI18nConstants(ASTRO_PORTAL_UI);
  const copy = useI18nConstants(MARATHON_COPY);
  const { t } = useT();
  const router = useRouter();
  const ui = MARATHON_PORTAL_UI;

  return (
    <div className="chat-conversation-surface relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      <div className="relative z-10 flex min-h-screen w-full flex-col px-5 py-4">
        <button type="button" className={ui.back} onClick={() => router.push(ROUTES.astrologer)}>
          <svg viewBox="0 0 24 24" className={ui.backIcon} fill="none" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{t("Go back")}</span>
        </button>
        <div className="mx-auto mt-4 w-full max-w-5xl">
          <MarathonEventsHero
            title={AP.card.events.title}
            subtitle={copy.draftTitle}
            hint={copy.confirmHint}
          />
          <MarathonAstrologerList />
        </div>
      </div>
    </div>
  );
}
