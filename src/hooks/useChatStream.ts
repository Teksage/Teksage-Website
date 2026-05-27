"use client";

import { useCallback, useRef } from "react";
import { useI18nConstants } from "@/hooks/useT";
import {
  CHAT_DEFAULTS,
  CHAT_RESPONSE_TIMEOUT_MS,
  CHAT_SCREEN,
} from "@/lib/constants/chat-screen";
import { fetchChatHistory, fetchRelatedQueries } from "@/lib/services/chat";
import { lastUserQuestionFromMessages, newChatMessageId } from "@/lib/chat-helpers";
import type { ChatMessage, ChatOutboundPayload } from "@/types/chat";
import type { Dispatch, RefObject, SetStateAction } from "react";

type ChatStreamSetters = {
  setShowTyping: (v: boolean) => void;
  setEnableInput: (v: boolean) => void;
  setIsStreaming: (v: boolean) => void;
  setRelatedQueries: (v: string[]) => void;
  setRelatedLoading: (v: boolean) => void;
  setToast: (v: string | null) => void;
};

type OutboundPrefs = { format: string; avator: string };
type MessageModeRef = RefObject<string>;

function expectsReplyAudio(mode: string): boolean {
  const m = mode.toLowerCase();
  return m === "audio" || m === "hybrid";
}

export function useChatStream(
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>,
  setters: ChatStreamSetters,
  chatLanguage: string,
  outboundPrefsRef: RefObject<OutboundPrefs>,
  messagesRef: RefObject<ChatMessage[]>,
  messageModeRef: MessageModeRef
) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const bufferRef = useRef("");
  const assistantIdRef = useRef<string | null>(null);
  /** Persists after `[END]` until reply audio is attached (audio JSON follows END). */
  const lastAssistantIdRef = useRef<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isStreamingRef = useRef(false);
  const settersRef = useRef(setters);
  const chatLanguageRef = useRef(chatLanguage);

  settersRef.current = setters;
  chatLanguageRef.current = chatLanguage;

  const clearResponseTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const markLastUserFailed = useCallback(() => {
    setMessages((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i >= 0; i--) {
        const m = next[i];
        if (m.role === "user" && m.status === "pending") {
          next[i] = { ...m, status: "failed" };
          break;
        }
      }
      return next;
    });
  }, [setMessages]);

  const appendLatestReplyFromHistory = useCallback(async () => {
    const rows = await fetchChatHistory();
    const latest = rows[0];
    if (!latest?.apiResponse?.trim()) return;

    setMessages((prev) => {
      const next = [...prev];
      const hasAssistant = next.some(
        (m) => m.role === "assistant" && m.text === latest.apiResponse
      );
      if (hasAssistant) return next;

      let pendingIdx = -1;
      for (let i = next.length - 1; i >= 0; i--) {
        const row = next[i];
        if (row.role === "user" && row.status === "pending") {
          pendingIdx = i;
          break;
        }
      }
      if (pendingIdx >= 0) {
        const row = next[pendingIdx];
        if (row.role === "user") {
          next[pendingIdx] = { ...row, status: "answered" };
        }
      }
      next.push({
        id: newChatMessageId(),
        role: "assistant",
        text: latest.apiResponse,
        isStreaming: false,
      });
      return next;
    });
  }, [setMessages]);

  const loadRelatedQueries = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const s = settersRef.current;
    s.setRelatedLoading(true);
    void fetchRelatedQueries(trimmed)
      .then((queries) => s.setRelatedQueries(queries))
      .finally(() => s.setRelatedLoading(false));
  }, []);

  const wantsAudio = useCallback(
    () => expectsReplyAudio(messageModeRef.current ?? ""),
    [messageModeRef]
  );

  const onStreamEnd = useCallback(async () => {
    clearResponseTimeout();
    const hadStreamedText = bufferRef.current.length > 0;
    const assistantId = assistantIdRef.current;
    if (assistantId) lastAssistantIdRef.current = assistantId;
    const queryForRelated = lastUserQuestionFromMessages(messagesRef.current);
    isStreamingRef.current = false;
    bufferRef.current = "";
    assistantIdRef.current = null;

    const s = settersRef.current;
    s.setIsStreaming(false);
    s.setShowTyping(false);
    s.setEnableInput(true);

    setMessages((prev) => {
      const next = [...prev];
      if (assistantId) {
        const idx = next.findIndex((m) => m.id === assistantId);
        if (idx >= 0 && next[idx].role === "assistant") {
          next[idx] = { ...next[idx], isStreaming: false };
        }
      }
      for (let i = next.length - 1; i >= 0; i--) {
        const row = next[i];
        if (row.role === "user" && row.status === "pending") {
          next[i] = { ...row, status: "answered" };
          break;
        }
      }
      return next;
    });

    if (!hadStreamedText) {
      try {
        await appendLatestReplyFromHistory();
      } catch {
        /* history sync is best-effort */
      }
    }

    const audioTargetId = lastAssistantIdRef.current;
    if (wantsAudio() && audioTargetId) {
      audioTimeoutRef.current = setTimeout(() => {
        setMessages((prev) => {
          const next = [...prev];
          const idx = next.findIndex((m) => m.id === audioTargetId);
          if (idx < 0 || next[idx].role !== "assistant") return next;
          if (next[idx].audioBase64) return next;
          next[idx] = { ...next[idx], audioPending: false };
          return next;
        });
        lastAssistantIdRef.current = null;
      }, 5000);
    }

    loadRelatedQueries(queryForRelated);
  }, [
    appendLatestReplyFromHistory,
    clearResponseTimeout,
    loadRelatedQueries,
    messagesRef,
    setMessages,
    wantsAudio,
  ]);

  const isStreamingActive = useCallback(
    () => isStreamingRef.current || assistantIdRef.current !== null,
    []
  );

  const onAudioBase64 = useCallback(
    (audioBase64: string) => {
      if (audioTimeoutRef.current) {
        clearTimeout(audioTimeoutRef.current);
        audioTimeoutRef.current = null;
      }
      const id = lastAssistantIdRef.current ?? assistantIdRef.current;
      if (!id) return;
      lastAssistantIdRef.current = null;
      setMessages((prev) => {
        const next = [...prev];
        const idx = next.findIndex((m) => m.id === id);
        if (idx < 0 || next[idx].role !== "assistant") return next;
        next[idx] = {
          ...next[idx],
          audioBase64,
          audioPending: false,
          isStreaming: false,
        };
        return next;
      });
    },
    [setMessages]
  );

  const onTextChunk = useCallback(
    (chunk: string) => {
      clearResponseTimeout();
      const s = settersRef.current;
      s.setShowTyping(false);
      s.setEnableInput(false);
      bufferRef.current += chunk;
      const text = bufferRef.current;
      isStreamingRef.current = true;
      s.setIsStreaming(true);
      const pendingAudio = wantsAudio();
      setMessages((prev) => {
        const next = [...prev];
        const id = assistantIdRef.current;
        if (!id) {
          const newAssistantId = newChatMessageId();
          assistantIdRef.current = newAssistantId;
          next.push({
            id: newAssistantId,
            role: "assistant",
            text,
            isStreaming: true,
            audioPending: pendingAudio,
            audioBase64: null,
          });
          return next;
        }
        const idx = next.findIndex((m) => m.id === id);
        if (idx >= 0 && next[idx].role === "assistant") {
          next[idx] = {
            ...next[idx],
            text,
            isStreaming: true,
            audioPending: pendingAudio ? true : next[idx].audioPending,
          };
        } else {
          const newAssistantId = newChatMessageId();
          assistantIdRef.current = newAssistantId;
          next.push({
            id: newAssistantId,
            role: "assistant",
            text,
            isStreaming: true,
            audioPending: pendingAudio,
            audioBase64: null,
          });
        }
        return next;
      });
    },
    [clearResponseTimeout, setMessages, wantsAudio]
  );

  const buildPayload = useCallback((query: string): ChatOutboundPayload => {
    const prefs = outboundPrefsRef.current;
    return {
      query,
      format: prefs?.format ?? CHAT_DEFAULTS.format,
      avator: prefs?.avator ?? CHAT_DEFAULTS.avatar,
      message_mode: messageModeRef.current?.trim() || CHAT_DEFAULTS.messageMode,
      chat_language: chatLanguageRef.current,
    };
  }, [messageModeRef, outboundPrefsRef]);

  const startResponseTimeout = useCallback(() => {
    clearResponseTimeout();
    timeoutRef.current = setTimeout(() => {
      if (isStreamingRef.current) return;
      const s = settersRef.current;
      s.setShowTyping(false);
      s.setEnableInput(true);
      markLastUserFailed();
      s.setToast(CS.responseTimeout);
    }, CHAT_RESPONSE_TIMEOUT_MS);
  }, [CS.responseTimeout, clearResponseTimeout, markLastUserFailed]);

  const resetStreamRefs = useCallback(() => {
    assistantIdRef.current = null;
    lastAssistantIdRef.current = null;
    bufferRef.current = "";
  }, []);

  return {
    onTextChunk,
    onAudioBase64,
    onStreamEnd,
    markLastUserFailed,
    buildPayload,
    startResponseTimeout,
    resetStreamRefs,
    isStreamingActive,
  };
}
