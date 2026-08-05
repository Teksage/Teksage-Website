// Shared TypeScript interfaces — mirrors Flutter Model/ DTOs

export type { UserProfile } from "./user-profile";
export type { PartnerDiscountState } from "./partner-referral";
export type {
  PartnerReferralCodeSectionProps,
  PartnerDiscountHomeBannerProps,
} from "./ui/partner-referral";
export type {
  ConsultationAstrologer,
  ConsultationAstrologerDetail,
  ConsultationBookingDraft,
  ConsultationCouponResult,
  ConsultationFilter,
  ConsultationRazorpayOrder,
  ConsultationReviewEvent,
  ConsultationSlot,
} from "./consultation";
import type { UserProfile } from "./user-profile";

// --- Auth ---
export type OtpPayload =
  | { mobile: string; otp: string; countryCode: string }
  | { email: string; otp: string };

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserProfile;
}

export type { LoginMethodTab, LoginStep, OtpContactType } from "./login-flow";
export { OTP_CONTACT_TYPE_EMAIL, OTP_CONTACT_TYPE_MOBILE } from "./login-flow";

// --- Prediction ---
export interface Prediction {
  id: string;
  type: "daily" | "weekly" | "yearly" | "life";
  title: string;
  content: string;
  date?: string;
  isPositive?: boolean;
}

export type {
  PanchangDetail,
  PanchangKarna,
  PanchangKarnaArm,
  PanchangPayload,
  PanchangSegment,
  HoroscopePayload,
} from "./astrology";

// --- Notification ---
export interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export type {
  AppNotification,
  ConsultationNotificationEvent,
  NotificationTab,
} from "./notifications";

export type {
  NotificationConsultationListProps,
  NotificationDetailDialogProps,
  NotificationGeneralListProps,
  NotificationsTabBarProps,
} from "./ui/notifications";

// --- API utilities ---
export interface ApiError {
  message: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// --- UI component props (always `.ts`, never co-located in `.tsx`) ---
export type {
  BottomNavProps,
  MainTabViewportBackdropProps,
  AppHeaderProps,
  EmptyStateProps,
  BrandLoginLogoProps,
  DesktopMainNavProps,
} from "./ui/common";

export type { AuthGatedLinkProps } from "./ui/auth-gated-link";

export type {
  ChatBannerProps,
  MuhurthaBannerProps,
  EventPlannerCtaArrowProps,
  EventPlannerCalendarIconProps,
  ConsultationBannerProps,
  MatchMakingCardProps,
  PredictionCirclesProps,
  DailyPredictionData,
  DailyPredictionCardProps,
  HomeDashboardHeaderProps,
  HomeDesktopHeaderProps,
  HomeChatPanelProps,
} from "./ui/home";

export type {
  EmailLoginFormProps,
  MobileLoginFormProps,
  TurnstileFieldProps,
  OtpResendBlockProps,
  OtpInputProps,
  OtpVerifyViewProps,
  LoginBackButtonProps,
} from "./ui/auth";

export type { CountryDialInfo, CountryDialPickerProps } from "./country";

export type {
  ProfileDetailsFormState,
  ProfileDetailsFieldsProps,
  ProfileDetailsFormProps,
  ProfileAvatarProps,
  ProfileFieldProps,
  ProfileDateOfBirthFieldProps,
  ProfileBirthDateCalendarProps,
  ProfilePhoneRowProps,
  ProfileEmailRowProps,
  ProfileLocationFieldProps,
  ChangeContactMode,
  SettingsRowVariant,
  SettingsRowProps,
  SettingsModalDialogProps,
  SettingsRateDialogProps,
  SubscriptionPaymentFeesProps,
  SubscriptionPlanBenefitsProps,
} from "./ui/settings";

export type {
  HoroscopeChartFrameProps,
  PanchangDetailViewProps,
  PanchangPremiumGateProps,
  PanchangDottedRowProps,
  PanchangPersonalizedSectionsProps,
  PanchangDateRibbonProps,
  PanchangBalaPairProps,
  PanchangSunTimeGridProps,
  PanchangExtendedTimingCardProps,
  PanchangTimingCardVariant,
  PanchangTimingRowsCardProps,
  HoroscopeProfileCardProps,
  HoroscopeChartVariant,
  HoroscopeChartToggleProps,
  HoroscopeLoadedViewProps,
} from "./ui/panchang-horoscope";

export type {
  MuhurthaPremiumGateProps,
  MuhurthaFormViewProps,
  MuhurthaResultsViewProps,
  MuhurthaDayRowProps,
  MuhurthaCardProps,
  MuhurthaFeatureHeroProps,
} from "./ui/muhurtha";

export type {
  LoaderVariant,
  LoaderSize,
  LoaderProps,
  LoadingOverlayProps,
} from "./ui/loader-display";

export type {
  PredictionDetailKind,
  PredictionDetailViewModel,
  DailyPredictionDetail,
  DailyPredictionBodyProps,
  WeeklyPredictionDetail,
  StructuredPredictionDetail,
  WeeklyDayPrediction,
} from "./prediction-detail";

export type {
  ChatMessage,
  ChatUserMessage,
  ChatAssistantMessage,
  ChatHistoryRecord,
  ChatPreferencePayload,
} from "./chat";

export type { LegalBlock } from "./settings-legal";

export type {
  FaqItem,
  NotificationPrefs,
  SubscriptionPlan,
  ProfileSettingsPayload,
  AppLanguageCode,
  AppLanguageOption,
  ApplyLanguageOptions,
} from "./settings";

export type {
  CompatibilityFormValues,
  MatchMakingExisting,
  MatchMakingResult,
  MatchMakingKutaRow,
  RashiOption,
  NakshatraOption,
} from "./match-making";

export type {
  MuhurthaDayResult,
  MuhurthaEventType,
  MuhurthaPayload,
  MuhurthaResult,
  MuhurthaSearchParams,
} from "./muhurtha";
export type {
  EventPlannerCacheEntry,
  EventPlannerCacheKeyInput,
} from "./event-planner-cache";

export type {
  ConsultationShellProps,
  ConsultationAstrologerCardProps,
  ConsultationAuthGateProps,
  ConsultationLanguageFieldProps,
  ConsultationCategoryChipsProps,
  ConsultationBookingFeesBlockProps,
} from "./ui/consultation";

export type {
  AstroEvent,
  AstroEventDetail,
  AstroHoroscope,
  AstroQuestion,
  AstroSlot,
  SlotCreatePayload,
} from "./astrologer-portal";

export type {
  AstrologerAnswerQuestionDialogProps,
  AstrologerAvailabilityProps,
  AstrologerAvailabilityState,
  AstrologerMeetingDetailProps,
  AstrologerMeetingQuestionsSectionProps,
} from "./ui/astrologer-portal";

export type {
  ChatPrompt,
  ChatPromptCreatePayload,
  ChatPromptStatusPayload,
} from "./chat-prompts";

export type {
  WhatsAppConsentState,
  WhatsAppConsentRequestResult,
  WhatsAppConsentRequestPayload,
  WhatsAppConsentPhoneMode,
  WhatsAppConsentRevokeResult,
} from "./whatsapp-updates";
