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
  query_date?: string;
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
      queryDate: row.query_date?.trim() || undefined,
    }));
}

export async function fetchRelatedQueries(query: string): Promise<string[]> {
  const { data } = await http.post<{ data?: RelatedQueriesPayload | string }>(
    API_ENDPOINTS.relatedQueries,
    { query }
  );
  const payload = data?.data;
  if (!payload || typeof payload === "string") return [];
  const list = payload.queries;
  if (!Array.isArray(list)) return [];
  return list.map((q) => String(q).trim()).filter(Boolean);
}

export async function downloadChatPdf(maintainHistory: boolean): Promise<Blob> {
  const { data } = await http.get<Blob>(API_ENDPOINTS.downloadChatPdf, {
    params: { maintain_history: maintainHistory },
    responseType: "blob",
  });
  return data;
}

export async function sendChatHistoryMail(
  maintainHistory: boolean
): Promise<{ message: string }> {
  const { data } = await http.post<{ message: string }>(
    API_ENDPOINTS.chatHistoryDownload,
    { maintain_history: maintainHistory }
  );
  return data;
}
