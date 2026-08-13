"use client";

import { useI18nConstants } from "@/hooks/useT";
import { ChatAppBarMenu } from "@/components/chat/ChatAppBarMenu";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { CHAT_SCREEN } from "@/lib/constants/chat-screen";
import { CHAT_LANDING_LAYOUT, CHAT_LANDING_UI } from "@/lib/constants/chat-landing-ui";
import type { HomeChatEmbedHeaderProps } from "@/types/ui/chat-landing";

/** Home embed — white chat header with history + menu actions. */
export function HomeChatEmbedHeader({
  onPreviousChat,
  showPreviousChat = false,
  onReturnToLanding,
  showReturnToLanding = false,
  isPremium,
  messageCount,
  maintainHistory,
  planStatus,
  onToast,
}: HomeChatEmbedHeaderProps) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const landingCopy = useI18nConstants(CHAT_LANDING_UI);

  return (
    <header className={CHAT_LANDING_LAYOUT.headerRoot}>
      <div className={CHAT_LANDING_LAYOUT.headerRow}>
        {showReturnToLanding ? (
          <button
            type="button"
            className={CHAT_LANDING_LAYOUT.headerActionBtn}
            onClick={onReturnToLanding}
            aria-label={landingCopy.returnToLandingAria}
          >
            <img
              src={CHAT_ASSETS.appBarBack}
              alt=""
              className="size-4 brightness-0"
            />
          </button>
        ) : (
          <div className={CHAT_LANDING_LAYOUT.headerIconWrap}>
            <div className={CHAT_LANDING_LAYOUT.headerIcon}>
              <img src={CHAT_ASSETS.botLogo} alt="" className="size-6" />
            </div>
            <span className={CHAT_LANDING_LAYOUT.headerOnlineDot} aria-hidden />
          </div>
        )}
        <div className="min-w-0">
          <h2 className={CHAT_LANDING_LAYOUT.headerTitle}>{CS.title}</h2>
          <p className={CHAT_LANDING_LAYOUT.headerSubtitle}>
            {landingCopy.subtitleLanguages}
          </p>
        </div>
        <div className={CHAT_LANDING_LAYOUT.headerActions}>
          {showPreviousChat ? (
            <button
              type="button"
              className={CHAT_LANDING_LAYOUT.headerActionBtn}
              onClick={onPreviousChat}
              aria-label={landingCopy.historyAria}
            >
              <img src={CHAT_ASSETS.history} alt="" className="size-4" />
            </button>
          ) : null}
          <ChatAppBarMenu
            tone="light"
            trigger="dots"
            isPremium={isPremium}
            messageCount={messageCount}
            maintainHistory={maintainHistory}
            planStatus={planStatus}
            onToast={onToast}
          />
        </div>
      </div>
    </header>
  );
}
