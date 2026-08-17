import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";

export async function submitSupportQuery(query: string): Promise<void> {
  await http.post(API_ENDPOINTS.support, { query });
}

/** Marks this login so the next WhatsApp from their number can email ops. */
export async function markSupportWhatsAppIntent(): Promise<void> {
  await http.post(API_ENDPOINTS.supportWhatsAppIntent);
}
