"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useEffect, useRef, useState } from "react";
import { ChatAppBar } from "@/components/chat/ChatAppBar";
import { ChatEmbedHeader } from "@/components/chat/ChatEmbedHeader";
import { ChatAvatarOnboarding } from "@/components/chat/ChatAvatarOnboarding";
import { ChatComposer } from "@/components/chat/ChatComposer";
import { ChatConsultStrip } from "@/components/chat/ChatConsultStrip";
import { ChatLandingView } from "@/components/chat/ChatLandingView";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { ChatPreferenceBar } from "@/components/chat/ChatPreferenceBar";
import { ChatRelatedQueries } from "@/components/chat/ChatRelatedQueries";
import { ChatStyleOnboarding } from "@/components/chat/ChatStyleOnboarding";
import { ChatSubscribeStrip } from "@/components/chat/ChatSubscribeStrip";
import { SubscribePromptDialog } from "@/components/common/SubscribePromptDialog";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { HomeChatEmbedHeader } from "@/components/home/HomeChatEmbedHeader";
import { CHAT_LAYOUT, CHAT_SCREEN } from "@/lib/constants/chat-screen";
import { CHAT_LANDING_LAYOUT } from "@/lib/constants/chat-landing-ui";
import { cn } from "@/lib/utils";
import { useChat } from "@/hooks/useChat";
import { useChatPreferences } from "@/hooks/useChatPreferences";
import { useChatVoiceInput } from "@/hooks/useChatVoiceInput";
import type { ChatPageViewProps } from "@/types/ui/chat";

export function ChatPageView({ embedded = false, embedHeader }: ChatPageViewProps) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const listEndRef = useRef<HTMLDivElement>(null);
  const [composerPlaceholder, setComposerPlaceholder] = useState<string>(
    CS.composerPlaceholder
  );
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  const prefs = useChatPreferences();
  const {
    messages,
    input,
    setInput,
    relatedQueries,
    relatedLoading,
    showTyping,
    enableInput,
    userInitials,
    canSendMore,
    isPrime,
    messageCount,
    maintainHistory,
    subscribeMessage,
    planStatus,
    sessionReady,
    wsConnected,
    chatUnavailableReason,
    chatStatusSuppressed,
    viewMode,
    hasPreviousChat,
    toast,
    clearToast,
    showToast,
    sendQuery,
    sendPredefinedQuestion,
    openPreviousChat,
    returnToLanding,
    retryMessage,
    chatLanguage,
    setVoiceMessageMode,
    noteVoiceHybridMode,
  } = useChat({
    enabled: prefs.chatUnlocked,
    styleFormat: prefs.styleFormat,
    avatarIndex: prefs.avatarIndex,
  });

  const isConversation = viewMode === "conversation";
  const isLanding = viewMode === "landing";
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

  const voice = useChatVoiceInput({
    language: chatLanguage,
    disabled: !enableInput || !sessionReady,
    onTranscript: (text) => {
      setVoiceMessageMode();
      setInput(text);
    },
    onError: showToast,
  });

  const shellClass = embedded
    ? CHAT_LANDING_LAYOUT.embeddedShell
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

  const resolvedEmbedHeader =
    embedHeader ??
    (embedded ? (
      <HomeChatEmbedHeader
        showPreviousChat={isLanding && hasPreviousChat}
        onPreviousChat={() => void openPreviousChat()}
        showReturnToLanding={isConversation}
        onReturnToLanding={returnToLanding}
        isPremium={isPrime}
        messageCount={messageCount}
        maintainHistory={maintainHistory}
        planStatus={planStatus}
        onToast={showToast}
      />
    ) : (
      <ChatEmbedHeader />
    ));

  if (!prefs.hydrated) {
    return (
      <div className={shellClass}>
        <LoadingOverlay open />
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
        className={cn(
          "chat-shell-bg pointer-events-none absolute inset-0 bg-cover bg-center",
          embedded
            ? isConversation
              ? "opacity-[0.06]"
              : "opacity-[0.18]"
            : isConversation
              ? "opacity-15"
              : "opacity-40"
        )}
        aria-hidden
      />

      {embedded ? (
        <div className="relative z-30 shrink-0 pointer-events-auto">
          {resolvedEmbedHeader}
        </div>
      ) : (
        <ChatAppBar
          isPremium={isPrime}
          messageCount={messageCount}
          maintainHistory={maintainHistory}
          planStatus={planStatus}
          onToast={showToast}
        />
      )}
      {embedded ? null : <ChatConsultStrip />}

      {toast ? (
        <p className="relative z-10 mx-4 mt-1 shrink-0 rounded-lg bg-[var(--color-brand-error)]/10 px-3 py-2 text-sm text-[var(--color-brand-error)]">
          {toast}
        </p>
      ) : null}

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div
          className={
            isConversation
              ? CHAT_LAYOUT.conversationScroll
              : CHAT_LAYOUT.landingScroll
          }
        >
          {!sessionReady ? null : (
            <>
              {isLanding ? (
                <ChatLandingView
                  onSelectQuestion={(question) =>
                    void sendPredefinedQuestion(question)
                  }
                  onSpeak={voice.toggleRecording}
                  speakDisabled={!enableInput || !sessionReady}
                />
              ) : hasMessages ? (
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
              {sessionReady && !chatStatusSuppressed && chatUnavailableReason ? (
                <p className="px-5 py-2 text-center text-sm text-black/60">
                  {chatUnavailableReason}
                </p>
              ) : sessionReady && !chatStatusSuppressed && !wsConnected ? (
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
            visible={
              canSendMore &&
              !showTyping &&
              isConversation &&
              hasMessages &&
              (relatedLoading || relatedQueries.length > 0)
            }
            onSelect={setInput}
          />
        ) : null}

        {sessionReady && canSendMore ? (
          <ChatComposer
            value={input}
            onChange={(value) => {
              noteVoiceHybridMode();
              setInput(value);
            }}
            onSend={() => void sendQuery(input)}
            disabled={!enableInput || !sessionReady || voice.isTranscribing}
            placeholder={composerPlaceholder}
            onMicPress={voice.toggleRecording}
            isRecording={voice.isRecording}
            isTranscribing={voice.isTranscribing}
            recordingElapsedSec={voice.elapsedSec}
            recordingAmplitudes={voice.amplitudes}
            onCancelRecording={voice.cancelRecording}
            onStopRecording={voice.stopRecording}
            micDisabled={!enableInput || !sessionReady}
            preferenceBar={preferenceBar}
            embedded={embedded}
          />
        ) : sessionReady ? (
          <ChatSubscribeStrip
            message={subscribeMessage}
            onPlansClick={() => setSubscribeOpen(true)}
          />
        ) : null}
      </div>
      <SubscribePromptDialog
        open={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
        planStatus={
          planStatus.trim().toLowerCase() === "expired" ? "expired" : "default"
        }
      />
      <LoadingOverlay open={!sessionReady} />
    </div>
  );
}
