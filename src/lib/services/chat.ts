import { API_ENDPOINTS } from "@/lib/constants/api";
import { http } from "@/lib/services/http";
import type {
  ChatHistoryRecord,
  ChatPreferencePayload,
  RelatedQueriesPayload,
} from "@/types/chat";

type RawChatHistoryRow = {
  user_question?: string;
  api_response?: string;
};

type RawChatPreference = {
  maintain_history?: boolean;
  is_prime_customer?: boolean;
  chat_count_last_7_days?: number;
};

export async function fetchChatPreference(): Promise<ChatPreferencePayload> {
  const { data } = await http.get<RawChatPreference>(API_ENDPOINTS.maintainHistory);
  return {
    maintainHistory: Boolean(data.maintain_history),
    isPrimeCustomer: Boolean(data.is_prime_customer),
    chatCountLast7Days: data.chat_count_last_7_days ?? 0,
  };
}

export async function fetchChatHistory(): Promise<ChatHistoryRecord[]> {
  const { data } = await http.get<RawChatHistoryRow[]>(API_ENDPOINTS.chatHistory);
  if (!Array.isArray(data)) return [];
  return data
    .filter((row) => row.user_question && row.api_response)
    .map((row) => ({
      userQuestion: row.user_question ?? "",
      apiResponse: row.api_response ?? "",
    }));
}

export async function fetchRelatedQueries(query: string): Promise<string[]> {
  const { data } = await http.post<{ data?: RelatedQueriesPayload | string }>(
    API_ENDPOINTS.relatedQueries,
    { query }
  );
  const payload = data?.data;
  if (!payload || typeof payload === "string") return [];
  return Array.isArray(payload.queries) ? payload.queries : [];
}

export async function downloadChatPdf(maintainHistory: boolean): Promise<Blob> {
  const { data } = await http.post<Blob>(
    API_ENDPOINTS.chatHistoryDownload,
    { maintain_history: maintainHistory },
    { responseType: "blob" }
  );
  return data;
}
