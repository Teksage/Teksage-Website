// Shared TypeScript interfaces — mirrors Flutter Model/ DTOs

export type { UserProfile } from "./user-profile";
import type { UserProfile } from "./user-profile";

// --- Auth ---
export type OtpPayload =
  | { mobile: string; otp: string }
  | { email: string; otp: string };

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserProfile;
}

export type { LoginStep, OtpContactType } from "./login-flow";
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

export type {
  ChatBannerProps,
  ConsultationBannerProps,
  MatchMakingCardProps,
  PredictionCirclesProps,
  DailyPredictionData,
  DailyPredictionCardProps,
  HomeDashboardHeaderProps,
} from "./ui/home";

export type {
  EmailLoginFormProps,
  MobileLoginFormProps,
  OtpInputProps,
  OtpVerifyViewProps,
  LoginBackButtonProps,
} from "./ui/auth";

export type {
  ProfileDetailsFormState,
  ProfileDetailsFieldsProps,
  ProfileDetailsFormProps,
  ProfileAvatarProps,
  ProfileFieldProps,
  ProfilePhoneRowProps,
  SettingsRowVariant,
  SettingsRowProps,
} from "./ui/settings";

export type {
  HoroscopeChartFrameProps,
  PanchangDetailViewProps,
  PanchangDottedRowProps,
  PanchangPersonalizedSectionsProps,
  PanchangDateRibbonProps,
  PanchangBalaPairProps,
  PanchangSunTimeGridProps,
  PanchangExtendedTimingCardProps,
  HoroscopeProfileCardProps,
  HoroscopeChartVariant,
  HoroscopeChartToggleProps,
  HoroscopeLoadedViewProps,
} from "./ui/panchang-horoscope";

export type { LoaderVariant, LoaderSize, LoaderProps } from "./ui/loader-display";
