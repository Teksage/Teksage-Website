import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { voiceBlobFilename } from "@/lib/chat-voice-recorder";

type TranscribeResponse = { transcript?: string };

export async function transcribeChatAudio(
  blob: Blob,
  mimeType: string,
  language: string
): Promise<string> {
  const form = new FormData();
  form.append("file", blob, voiceBlobFilename(mimeType));
  form.append("language", language);

  const { data } = await http.post<TranscribeResponse>(
    API_ENDPOINTS.transcribeAudio,
    form,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  const text = data?.transcript?.trim() ?? "";
  if (!text) throw new Error("Empty transcript");
  return text;
}
