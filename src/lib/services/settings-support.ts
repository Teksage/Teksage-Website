import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";

export async function submitSupportQuery(query: string): Promise<void> {
  await http.post(API_ENDPOINTS.support, { query });
}
