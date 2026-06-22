"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18nConstants } from "@/hooks/useT";
import { avatarIndexToStorage, avatarStorageToWsName } from "@/lib/chat-preference-helpers";
import type { ChatStyleFormat } from "@/lib/constants/chat-preferences";
import {
  CHAT_DEFAULTS,
  CHAT_FREE_MESSAGE_LIMIT,
  CHAT_SCREEN,
  CHAT_WS_CONNECT_TIMEOUT_MS,
  CHAT_WS_FATAL_PROFILE_CLOSE_CODES,
} from "@/lib/constants/chat-screen";
import { historyToChatMessages, newChatMessageId, userInitialsFromProfile } from "@/lib/chat-helpers";
import { isAstrologerHomeSession } from "@/lib/utils";
import {
  fetchChatHistory,
  fetchChatPreference,
} from "@/lib/services/chat";
import { ChatWebSocketClient } from "@/lib/services/chat-websocket-client";
import { fetchProfile } from "@/lib/services/profile";
import { useChatStream } from "@/hooks/useChatStream";
import type { ChatMessage } from "@/types/chat";

type UseChatOptions = {
  enabled: boolean;
  styleFormat: ChatStyleFormat;
  avatarIndex: number;
};

export function useChat({ enabled, styleFormat, avatarIndex }: UseChatOptions) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [relatedQueries, setRelatedQueries] = useState<string[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [enableInput, setEnableInput] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [userInitials, setUserInitials] = useState("AP");
  const [isPrime, setIsPrime] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [chatLanguage, setChatLanguage] = useState<string>(CHAT_DEFAULTS.language);
  const [sessionReady, setSessionReady] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [chatUnavailableReason, setChatUnavailableReason] = useState<string | null>(null);
  const [chatStatusSuppressed, setChatStatusSuppressed] = useState(false);

  const clientRef = useRef<ChatWebSocketClient | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  const awaitingResponseRef = useRef(false);
  messagesRef.current = messages;
  const outboundPrefsRef = useRef<{ format: string; avator: string }>({
    format: CHAT_DEFAULTS.format,
    avator: CHAT_DEFAULTS.avatar,
  });
  const messageModeRef = useRef<string>(CHAT_DEFAULTS.messageMode);
  const canSendMore = isPrime || messageCount < CHAT_FREE_MESSAGE_LIMIT;

  outboundPrefsRef.current = {
    format: styleFormat,
    avator: avatarStorageToWsName(avatarIndexToStorage(avatarIndex)),
  };

  const stream = useChatStream(
    setMessages,
    {
      setShowTyping,
      setEnableInput,
      setIsStreaming: () => {},
      setRelatedQueries,
      setRelatedLoading,
      setToast,
    },
    chatLanguage,
    outboundPrefsRef,
    messagesRef,
    messageModeRef
  );

  const streamRef = useRef(stream);
  streamRef.current = stream;

  const resetComposerAfterSendFailure = useCallback(() => {
    awaitingResponseRef.current = false;
    setShowTyping(false);
    setEnableInput(true);
    streamRef.current.markLastUserFailed();
  }, []);

  const transmitQuery = useCallback(
    async (trimmed: string, options?: { appendUser?: boolean }): Promise<boolean> => {
      const client = clientRef.current;
      if (!client) {
        setToast(CS.wsConnectError);
        return false;
      }

      const api = streamRef.current;
      api.resetStreamRefs();
      setShowBanner(false);
      setRelatedQueries([]);
      setShowTyping(true);
      setEnableInput(false);
      awaitingResponseRef.current = true;

      if (options?.appendUser !== false) {
        setMessages((prev) => [
          ...prev,
          { id: newChatMessageId(), role: "user", text: trimmed, status: "pending" },
        ]);
      }

      try {
        await client.send(JSON.stringify(api.buildPayload(trimmed)));
        api.startResponseTimeout();
        return true;
      } catch {
        resetComposerAfterSendFailure();
        setToast(CS.wsConnectError);
        return false;
      }
    },
    [CS.wsConnectError, resetComposerAfterSendFailure]
  );

  const sendQuery = useCallback(
    async (queryText: string) => {
      const trimmed = queryText.trim();
      if (!trimmed) {
        setToast(CS.emptyInput);
        return;
      }
      if (!canSendMore) {
        setToast(CS.subscribeLimit);
        return;
      }
      if (!clientRef.current?.connected && !wsConnected) {
        setToast(CS.wsConnectError);
        return;
      }
      const sent = await transmitQuery(trimmed);
      if (!sent) return;
      setInput("");
      messageModeRef.current = CHAT_DEFAULTS.messageMode;
      if (!isPrime) setMessageCount((c) => c + 1);
    },
    [
      CS.emptyInput,
      CS.subscribeLimit,
      CS.wsConnectError,
      canSendMore,
      isPrime,
      transmitQuery,
      wsConnected,
    ]
  );

  const retryMessage = useCallback(
    (messageId: string) => {
      const target = messages.find((m) => m.id === messageId && m.role === "user");
      if (!target || target.role !== "user") return;
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId && m.role === "user" ? { ...m, status: "pending" } : m))
      );
      void transmitQuery(target.text, { appendUser: false });
    },
    [messages, transmitQuery]
  );

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const client = new ChatWebSocketClient();
    clientRef.current = client;

    async function connectSocket() {
      const handlers = {
        onTextChunk: (chunk: string) => streamRef.current.onTextChunk(chunk),
        onAudioBase64: (audio: string) => streamRef.current.onAudioBase64(audio),
        onStreamEnd: () => {
          awaitingResponseRef.current = false;
          void streamRef.current.onStreamEnd();
        },
        onOpen: () => {
          if (!cancelled) setWsConnected(true);
        },
        onClose: (event: CloseEvent) => {
          if (!cancelled) {
            setWsConnected(false);
            const isFatalProfile = CHAT_WS_FATAL_PROFILE_CLOSE_CODES.includes(
              event.code as (typeof CHAT_WS_FATAL_PROFILE_CLOSE_CODES)[number]
            );
            if (isFatalProfile) {
              setChatUnavailableReason(CS.wsProfileIncomplete);
              client.disconnect();
              return;
            }
            const stillStreaming = streamRef.current.isStreamingActive();
            if (
              awaitingResponseRef.current &&
              !stillStreaming &&
              event.code !== 1008 &&
              event.code !== 4003
            ) {
              resetComposerAfterSendFailure();
              setToast(CS.wsConnectError);
            }
          }
        },
        onError: () => {
          if (!streamRef.current.isStreamingActive()) {
            resetComposerAfterSendFailure();
            setToast(CS.wsConnectError);
          }
        },
      };

      const timeout = new Promise<never>((_, reject) => {
        window.setTimeout(() => reject(new Error("WebSocket connect timeout")), CHAT_WS_CONNECT_TIMEOUT_MS);
      });

      await Promise.race([client.connect(handlers), timeout]);
    }

    async function boot() {
      try {
        const [profile, pref, history] = await Promise.all([
          fetchProfile(),
          fetchChatPreference(),
          fetchChatHistory(),
        ]);
        if (cancelled) return;

        setUserInitials(
          userInitialsFromProfile(profile.firstName, profile.lastName, profile.name)
        );
        setChatLanguage(profile.chatLanguages?.toLowerCase() || CHAT_DEFAULTS.language);
        setIsPrime(pref.isPrimeCustomer);
        setMessageCount(pref.chatCountLast7Days);
        if (history.length > 0) {
          setMessages(historyToChatMessages(history));
          setShowBanner(false);
        }
        setSessionReady(true);

        const profileIncomplete = !profile.dateOfBirth?.trim();
        const isAstrologer = isAstrologerHomeSession(profile);
        if (isAstrologer) {
          setChatStatusSuppressed(true);
          return;
        }
        if (profileIncomplete) {
          setChatUnavailableReason(CS.wsProfileIncomplete);
          return;
        }

        try {
          await connectSocket();
        } catch {
          if (!cancelled) {
            setToast(CS.wsConnectError);
          }
        }
      } catch {
        if (!cancelled) {
          setToast(CS.bootError);
          setSessionReady(true);
        }
      }
    }

    void boot();
    return () => {
      cancelled = true;
      setWsConnected(false);
      client.disconnect();
    };
  }, [CS.bootError, CS.wsConnectError, enabled, resetComposerAfterSendFailure]);

  return {
    messages,
    input,
    setInput,
    relatedQueries,
    relatedLoading,
    showTyping,
    enableInput: enableInput && sessionReady && wsConnected,
    showBanner,
    userInitials,
    canSendMore,
    sessionReady,
    wsConnected,
    chatUnavailableReason,
    chatStatusSuppressed,
    toast,
    clearToast: () => setToast(null),
    showToast: (message: string) => setToast(message),
    sendQuery,
    retryMessage,
    chatLanguage,
    setVoiceMessageMode: () => {
      messageModeRef.current = "audio";
    },
    noteVoiceHybridMode: () => {
      if (messageModeRef.current === "audio") {
        messageModeRef.current = "hybrid";
      }
    },
  };
}
