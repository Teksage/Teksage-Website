import type {
  AppNotification,
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
}

export interface NotificationDetailDialogProps {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}
