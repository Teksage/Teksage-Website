"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useEffect, useRef, useState } from "react";
import { ChatAppBar } from "@/components/chat/ChatAppBar";
import { ChatEmbedHeader } from "@/components/chat/ChatEmbedHeader";
import { ChatAvatarOnboarding } from "@/components/chat/ChatAvatarOnboarding";
import { ChatComposer } from "@/components/chat/ChatComposer";
import { ChatConsultStrip } from "@/components/chat/ChatConsultStrip";
import { ChatIntroText } from "@/components/chat/ChatIntroText";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { ChatPreferenceBar } from "@/components/chat/ChatPreferenceBar";
import { ChatRelatedQueries } from "@/components/chat/ChatRelatedQueries";
import { ChatStyleOnboarding } from "@/components/chat/ChatStyleOnboarding";
import { Loader } from "@/components/common/Loader";
import { CHAT_LAYOUT, CHAT_SCREEN } from "@/lib/constants/chat-screen";
import { useChat } from "@/hooks/useChat";
import { useChatPreferences } from "@/hooks/useChatPreferences";
import type { ChatPageViewProps } from "@/types/ui/chat";

export function ChatPageView({ embedded = false }: ChatPageViewProps) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const listEndRef = useRef<HTMLDivElement>(null);
  const [composerPlaceholder, setComposerPlaceholder] = useState<string>(
    CS.composerPlaceholder
  );

  const prefs = useChatPreferences();
  const {
    messages,
    input,
    setInput,
    relatedQueries,
    relatedLoading,
    showTyping,
    enableInput,
    showBanner,
    userInitials,
    canSendMore,
    sessionReady,
    wsConnected,
    toast,
    clearToast,
    showToast,
    sendQuery,
    retryMessage,
  } = useChat({
    enabled: prefs.chatUnlocked,
    styleFormat: prefs.styleFormat,
    avatarIndex: prefs.avatarIndex,
  });

  const hasMessages = messages.length > 0;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () =>
      setComposerPlaceholder(
        mq.matches ? CS.composerPlaceholderDesktop : CS.composerPlaceholder
      );
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [CS.composerPlaceholder, CS.composerPlaceholderDesktop]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showTyping]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(clearToast, 4000);
    return () => window.clearTimeout(t);
  }, [toast, clearToast]);

  const showMicNotice = () => showToast(CS.micComingSoon);

  const shellClass = embedded
    ? "relative flex h-full min-h-0 w-full flex-col bg-[var(--color-chat-shell)]"
    : CHAT_LAYOUT.pageRoot;

  const preferenceBar = (
    <ChatPreferenceBar
      styleFormat={prefs.styleFormat}
      avatarIndex={prefs.avatarIndex}
      styleMenuOpen={prefs.styleMenuOpen}
      avatarSheetOpen={prefs.avatarSheetOpen}
      onStyleChipPress={() => {
        prefs.setStyleMenuOpen((open) => !open);
        prefs.setAvatarSheetOpen(false);
      }}
      onAvatarChipPress={() => {
        prefs.setAvatarSheetOpen(true);
        prefs.setStyleMenuOpen(false);
      }}
      onStyleMenuClose={() => prefs.setStyleMenuOpen(false)}
      onSelectStyle={prefs.selectStyle}
      onAvatarSheetClose={() => prefs.setAvatarSheetOpen(false)}
      onSelectAvatar={prefs.selectAvatar}
    />
  );

  if (!prefs.hydrated) {
    return (
      <div className={shellClass}>
        <div className="flex flex-1 items-center justify-center py-16">
          <Loader />
        </div>
      </div>
    );
  }

  if (prefs.onboardingStep === "style") {
    return (
      <ChatStyleOnboarding embedded={embedded} onContinue={prefs.completeStyleOnboarding} />
    );
  }

  if (prefs.onboardingStep === "avatar") {
    return (
      <ChatAvatarOnboarding
        embedded={embedded}
        initialIndex={prefs.avatarIndex}
        onContinue={prefs.completeAvatarOnboarding}
        onBack={prefs.backToStyleOnboarding}
      />
    );
  }

  return (
    <div className={shellClass}>
      <div
        className="chat-shell-bg pointer-events-none absolute inset-0 bg-cover bg-center opacity-40"
        aria-hidden
      />

      {embedded ? <ChatEmbedHeader /> : <ChatAppBar />}
      {embedded ? null : <ChatConsultStrip />}

      {toast ? (
        <p className="relative z-10 mx-4 mt-1 shrink-0 rounded-lg bg-[var(--color-brand-error)]/10 px-3 py-2 text-sm text-[var(--color-brand-error)]">
          {toast}
        </p>
      ) : null}

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {!sessionReady ? (
            <div className="flex flex-1 items-center justify-center py-16">
              <Loader />
            </div>
          ) : (
            <>
              {!hasMessages ? <ChatIntroText visible={showBanner} /> : null}
              {hasMessages ? (
                <ChatMessageList
                  messages={messages}
                  userInitials={userInitials}
                  onRetry={retryMessage}
                  listEndRef={listEndRef}
                  showTyping={showTyping}
                />
              ) : (
                <div ref={listEndRef} className="h-px shrink-0" aria-hidden />
              )}
              {sessionReady && !wsConnected ? (
                <p className="px-5 py-2 text-center text-sm text-black/50">
                  {CS.connecting}
                </p>
              ) : null}
            </>
          )}
        </div>

        {sessionReady ? (
          <ChatRelatedQueries
            queries={relatedQueries}
            loading={relatedLoading}
            visible={canSendMore && !showTyping && hasMessages}
            onSelect={(q) => void sendQuery(q)}
          />
        ) : null}

        <ChatComposer
          value={input}
          onChange={setInput}
          onSend={() => void sendQuery(input)}
          disabled={!enableInput || !sessionReady}
          placeholder={composerPlaceholder}
          onMicPress={showMicNotice}
          preferenceBar={preferenceBar}
          embedded={embedded}
        />
      </div>
    </div>
  );
}
