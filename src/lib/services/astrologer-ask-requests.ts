import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { AskAstrologerRequest } from "@/types/ask-astrologer";

export async function fetchAstrologerAskRequests(): Promise<AskAstrologerRequest[]> {
  const res = await http.get(API_ENDPOINTS.astrologerAskRequests);
  return (res.data as { requests: AskAstrologerRequest[] }).requests ?? [];
}

export async function submitAskAnswer(
  requestId: number,
  answerText: string | null,
  voiceFile: File | null
): Promise<void> {
  const form = new FormData();
  if (answerText?.trim()) form.append("answer_text", answerText.trim());
  if (voiceFile) form.append("voice", voiceFile);
  await http.put(`${API_ENDPOINTS.astrologerAskRequests}/${requestId}/answer`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
