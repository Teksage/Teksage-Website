/** Chat prompts admin service — GET/POST /api/chat-prompts/, PUT /api/chat-prompts/status. */
import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  ChatPrompt,
  ChatPromptCreatePayload,
  ChatPromptStatusPayload,
} from "@/types/chat-prompts";

interface PromptsListResponse {
  prompts?: ChatPrompt[];
  data?: ChatPrompt[];
}

export async function fetchChatPrompts(): Promise<ChatPrompt[]> {
  const res = await http.get<PromptsListResponse>(API_ENDPOINTS.chatPrompts);
  return res.data?.prompts ?? res.data?.data ?? [];
}

export async function createChatPrompt(
  payload: ChatPromptCreatePayload
): Promise<ChatPrompt> {
  const res = await http.post<ChatPrompt>(API_ENDPOINTS.chatPrompts, payload);
  return res.data;
}

export async function updateChatPromptStatus(
  payload: ChatPromptStatusPayload
): Promise<void> {
  await http.put(API_ENDPOINTS.chatPromptsStatus, payload);
}
