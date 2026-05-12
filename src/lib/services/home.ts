import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { Notification } from "@/types";

export interface DailyPredictionSummary {
  tharaBala?: string;
  chandraBala?: string;
}

/** Backend `GET /api/prediction/daily` → `{ data: { thara_bala, chandra_bala, ... }, prediction_id }` (see Flutter `PredictionService.getDailyPrediction`). */
interface DailyPredictionApiBody {
  data?: Record<string, unknown> | string;
  prediction_id?: number;
}

/** Backend `GET /api/notifications` → `{ notifications: [...] }`. */
interface NotificationsApiBody {
  notifications?: Array<{
    id: number;
    title: string;
    message: string;
    sent_at?: string;
    read_by?: boolean;
  }>;
}

function mapDailyInner(inner: unknown): DailyPredictionSummary {
  if (inner == null || typeof inner !== "object") return {};
  const o = inner as Record<string, unknown>;
  const thara = o.thara_bala;
  const chandra = o.chandra_bala;
  return {
    tharaBala: thara != null ? String(thara) : undefined,
    chandraBala: chandra != null ? String(chandra) : undefined,
  };
}

export async function fetchDailyPredictionSummary(): Promise<DailyPredictionSummary> {
  const { data: body } = await http.get<DailyPredictionApiBody>(
    API_ENDPOINTS.dailyPrediction
  );
  const inner = body?.data;
  if (typeof inner === "string") return {};
  return mapDailyInner(inner);
}

export async function fetchNotifications(): Promise<Notification[]> {
  const { data: body } = await http.get<NotificationsApiBody>(
    API_ENDPOINTS.notifications
  );
  const raw = body?.notifications ?? [];
  return raw.map((n) => ({
    id: String(n.id),
    title: n.title,
    message: n.message,
    createdAt: n.sent_at ?? "",
    isRead: Boolean(n.read_by),
  }));
}
