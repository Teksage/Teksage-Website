// Shared TypeScript interfaces — mirrors Flutter Model/ DTOs

// --- Auth ---
export interface LoginEmailPayload {
  email: string;
  password: string;
}

export interface LoginMobilePayload {
  mobile: string;
  countryCode: string;
}

export type OtpPayload =
  | { mobile: string; otp: string }
  | { email: string; otp: string };

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: UserProfile;
}

// --- User ---
export interface UserProfile {
  id: string;
  name: string;
  /** When present, from API `first_name` / `last_name` (Flutter separate fields). */
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  countryCode?: string;
  isMobileVerified?: boolean;
  dateOfBirth?: string;
  placeOfBirth?: string;
  timeOfBirth?: string;
  /** Maps API `chat_languages`. */
  chatLanguages?: string;
  /** Maps API `preferred_location`. */
  preferredLocation?: string;
  rashi?: string;
  nakshatra?: string;
  gender?: "male" | "female" | "other";
  language?: string;
  avatarUrl?: string;
  isPremium: boolean;
  /**
   * Backend `user_type` (e.g. `customer`, `astrologer`). When missing, web treats user as customer for home chrome.
   * Mirrors Flutter `saveUserType(result['user_type'] == 'customer')` used for consultation banner vs astrologer flow.
   */
  userType?: string;
}

// --- Prediction ---
export interface Prediction {
  id: string;
  type: "daily" | "weekly" | "yearly" | "life";
  title: string;
  content: string;
  date?: string;
  isPositive?: boolean;
}

// --- Panchang ---
export interface PanchangData {
  date: string;
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  sunrise: string;
  sunset: string;
  moonrise?: string;
  moonset?: string;
}

// --- Horoscope ---
export interface HoroscopeData {
  sign: string;
  date: string;
  prediction: string;
  lucky: {
    color?: string;
    number?: string;
    day?: string;
  };
}

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
