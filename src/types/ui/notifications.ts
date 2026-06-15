import type {
  AppNotification,
  AskAstrologerNotificationItem,
  ConsultationNotificationEvent,
  NotificationTab,
} from "@/types/notifications";

export interface NotificationsTabBarProps {
  tab: NotificationTab;
  onTabChange: (tab: NotificationTab) => void;
}

export interface NotificationGeneralListProps {
  items: AppNotification[];
  onOpen: (item: AppNotification) => void;
}

export interface NotificationConsultationListProps {
  items: ConsultationNotificationEvent[];
  isAstrologer: boolean;
  askItems?: AskAstrologerNotificationItem[];
}

export interface NotificationDetailDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export interface AskAstrologerAnswerDialogProps {
  open: boolean;
  userQuestion: string;
  answerText: string | null;
  answerVoiceUrl: string | null;
  answerVoiceDurationSec?: number | null;
  answeredAt?: string | null;
  answeredByAstrologerName?: string | null;
  answeredByAstrologerProfilePath?: string | null;
  loading?: boolean;
  error?: string | null;
  onClose: () => void;
}
