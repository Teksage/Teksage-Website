import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  AppNotification,
  ConsultationNotificationEvent,
} from "@/types/notifications";

interface NotificationsApiBody {
  notifications?: Array<{
    id: number;
    title: string;
    message: string;
    sent_at?: string;
    read_by?: boolean;
    recipient_type?: string;
  }>;
}

interface EventsListApiBody {
  data?: Array<{
    id: number;
    status: string;
    start_datetime: string;
    event_link: string | null;
    queries_answered: boolean | null;
    astrologer_first_name: string | null;
    astrologer_last_name: string | null;
    astrologer_picture: string | null;
  }>;
}

function parseUserId(id: string | number): number {
  const n = typeof id === "number" ? id : Number(id);
  if (!Number.isFinite(n)) throw new Error("Invalid user id");
  return n;
}

export async function fetchAppNotifications(): Promise<AppNotification[]> {
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
    recipientType: n.recipient_type,
  }));
}

export async function markNotificationsRead(ids: number[]): Promise<void> {
  if (ids.length === 0) return;
  await http.post(API_ENDPOINTS.notificationsUpdateStatus, {
    read_ids: ids,
  });
}

export async function clearAllNotifications(): Promise<void> {
  await http.post(API_ENDPOINTS.notificationsUpdateStatus, {
    clear_notifications: true,
  });
}

/** Flutter consultation tab — confirmed/completed events with unanswered queries. */
export async function fetchConsultationNotificationEvents(
  userId: string | number,
  isAstrologer: boolean
): Promise<ConsultationNotificationEvent[]> {
  const params = isAstrologer
    ? { astrologer_id: parseUserId(userId) }
    : { customer_id: parseUserId(userId) };

  const { data: body } = await http.get<EventsListApiBody>(
    API_ENDPOINTS.astroEvents,
    { params }
  );

  return (body?.data ?? [])
    .filter(
      (e) =>
        (e.status === "confirmed" || e.status === "completed") &&
        e.queries_answered === false
    )
    .map((e) => ({
      id: e.id,
      startDatetime: e.start_datetime,
      eventLink: e.event_link,
      astrologerPicture: e.astrologer_picture,
      astrologerFirstName: e.astrologer_first_name,
      astrologerLastName: e.astrologer_last_name,
    }));
}
