"use client";

import { AppHeader } from "@/components/common/AppHeader";
import { ASK_ASTROLOGER_LAYOUT } from "@/lib/constants/chat-ask-astrologer";
import type { AskAstrologerShellProps } from "@/types/ui/ask-astrologer";

/** Ask Astrologer flow chrome — clean white layout; optional centered payment column. */
export function AskAstrologerShell({
  title,
  children,
  footer,
  onBack,
  showBack = true,
  centered = false,
}: AskAstrologerShellProps) {
  return (
    <div className={ASK_ASTROLOGER_LAYOUT.page}>
      <div className={ASK_ASTROLOGER_LAYOUT.body}>
        <AppHeader
          title={title}
          showBack={showBack}
          onBackClick={onBack}
        />
        <div className={ASK_ASTROLOGER_LAYOUT.scroll}>
          {centered ? (
            <div className={ASK_ASTROLOGER_LAYOUT.checkoutColumn}>{children}</div>
          ) : (
            children
          )}
        </div>
        {footer ? (
          <footer className={ASK_ASTROLOGER_LAYOUT.footer}>
            <div
              className={
                centered
                  ? ASK_ASTROLOGER_LAYOUT.checkoutFooterColumn
                  : ASK_ASTROLOGER_LAYOUT.footerColumn
              }
            >
              {footer}
            </div>
          </footer>
        ) : null}
      </div>
    </div>
  );
}
