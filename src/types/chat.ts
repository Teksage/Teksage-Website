/** AI chat — mirrors Flutter `chat.dart` message maps + API DTOs. */

export type ChatUserMessageStatus = "pending" | "answered" | "failed";

export interface ChatUserMessage {
  id: string;
  role: "user";
  text: string;
  status: ChatUserMessageStatus;
}

export interface ChatAssistantMessage {
  id: string;
  role: "assistant";
  text: string;
  isStreaming: boolean;
  /** Base64 MP3 from WebSocket `audio_base64` — Flutter `ChatAudioPlayer`. */
  audioBase64?: string | null;
  /** Waiting for TTS after voice-mode reply. */
  audioPending?: boolean;
}

export type ChatMessage = ChatUserMessage | ChatAssistantMessage;

export interface ChatHistoryRecord {
  userQuestion: string;
  apiResponse: string;
}

export interface ChatPreferencePayload {
  maintainHistory: boolean;
  isPrimeCustomer: boolean;
  chatCountLast7Days: number;
}

export interface ChatOutboundPayload {
  query: string;
  format: string;
  avator: string;
  message_mode: string;
  chat_language: string;
}

export interface RelatedQueriesPayload {
  queries: string[];
}
