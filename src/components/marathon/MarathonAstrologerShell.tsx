"use client";

import { useRouter } from "next/navigation";
import { useT } from "@/hooks/useT";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";
import { MARATHON_PAGE } from "@/lib/constants/marathon";
import { MARATHON_FLOW_UI } from "@/lib/constants/marathon-flow-ui";
import type { MarathonAstrologerShellProps } from "@/types/marathon";

/** Astrologer Expert Hours page frame — same white header and surface as the user flow. */
export function MarathonAstrologerShell({ title, subtitle, backHref, children }: MarathonAstrologerShellProps) {
  const ui = MARATHON_FLOW_UI;
  const { t } = useT();
  const router = useRouter();

  return (
    <div className={MARATHON_PAGE.page}>
      <div className={CHAT_LAYOUT.messageListGlow} aria-hidden />
      <div className={MARATHON_PAGE.pageInner}>
        <div className="w-full">
          <div className={ui.headBar}>
            <button type="button" className={ui.back} onClick={() => router.push(backHref)} aria-label={t("Go back")}>
              <svg viewBox="0 0 24 24" className={ui.backIcon} fill="none" aria-hidden>
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={ui.headCopy}>
              <h1 className={ui.pageTitle}>{title}</h1>
              <p className={ui.pageSub}>{subtitle}</p>
            </div>
          </div>
          <div className="mt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
