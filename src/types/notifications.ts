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
