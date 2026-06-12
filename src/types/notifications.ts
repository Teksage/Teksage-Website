/** In-app notification list types — mirrors Flutter `NotificationModel`. */

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  recipientType?: string;
}

export interface ConsultationNotificationEvent {
  id: number;
  startDatetime: string;
  eventLink: string | null;
  astrologerPicture: string | null;
  astrologerFirstName: string | null;
  astrologerLastName: string | null;
}

export type NotificationTab = "general" | "consultation";

/** Ask Astrologer request as shown in the Consultation notifications tab. */
export interface AskAstrologerNotificationItem {
  id: number;
  status: string;
  user_question: string;
  answer_text: string | null;
  answer_voice_url: string | null;
  answer_voice_duration_sec: number | null;
  answered_at: string | null;
  paid_at: string | null;
  created_at: string | null;
}
