import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { FaqItem } from "@/types/settings";

type LocalizedFaq = {
  faq_id: number;
  question: string;
  answer: string;
};

type FullFaq = LocalizedFaq & Record<string, unknown>;

export async function fetchFaqs(): Promise<FaqItem[]> {
  const { data } = await http.get<LocalizedFaq[] | FullFaq[]>(API_ENDPOINTS.faq);
  if (!Array.isArray(data)) return [];
  return data.map((row) => ({
    faqId: Number(row.faq_id ?? 0),
    question: String(row.question ?? ""),
    answer: String(row.answer ?? ""),
  }));
}
