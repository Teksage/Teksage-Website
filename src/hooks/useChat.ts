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
} from "@/lib/constants/chat-screen";
import { historyToChatMessages, newChatMessageId, userInitialsFromProfile } from "@/lib/chat-helpers";
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

  const clientRef = useRef<ChatWebSocketClient | null>(null);
  const outboundPrefsRef = useRef<{ format: string; avator: string }>({
    format: CHAT_DEFAULTS.format,
    avator: CHAT_DEFAULTS.avatar,
  });
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
    outboundPrefsRef
  );

  const streamRef = useRef(stream);
  streamRef.current = stream;

  const transmitQuery = useCallback(
    async (trimmed: string, options?: { appendUser?: boolean }) => {
      if (!clientRef.current || !wsConnected) return;
      const api = streamRef.current;
      api.resetStreamRefs();
      setShowBanner(false);
      setRelatedQueries([]);
      setShowTyping(true);
      setEnableInput(false);

      if (options?.appendUser !== false) {
        setMessages((prev) => [
          ...prev,
          { id: newChatMessageId(), role: "user", text: trimmed, status: "pending" },
        ]);
      }

      await clientRef.current.send(JSON.stringify(api.buildPayload(trimmed)));
      api.startResponseTimeout();
    },
    [wsConnected]
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
      if (!isPrime) setMessageCount((c) => c + 1);
      setInput("");
      await transmitQuery(trimmed);
    },
    [CS.emptyInput, CS.subscribeLimit, canSendMore, isPrime, transmitQuery]
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
      const api = streamRef.current;
      const handlers = {
        onTextChunk: (chunk: string) => api.onTextChunk(chunk),
        onStreamEnd: () => api.onStreamEnd(),
        onError: () => api.markLastUserFailed(),
      };

      const timeout = new Promise<never>((_, reject) => {
        window.setTimeout(() => reject(new Error("WebSocket connect timeout")), CHAT_WS_CONNECT_TIMEOUT_MS);
      });

      await Promise.race([client.connect(handlers), timeout]);
      if (!cancelled) setWsConnected(true);
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
      client.disconnect();
    };
  }, [CS.bootError, CS.wsConnectError, enabled]);

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
    toast,
    clearToast: () => setToast(null),
    showToast: (message: string) => setToast(message),
    sendQuery,
    retryMessage,
  };
}
