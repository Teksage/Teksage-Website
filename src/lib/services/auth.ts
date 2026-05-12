import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { STORAGE_KEYS } from "@/lib/constants";
import { clearAuthCookie, setAuthCookie } from "@/lib/auth-cookie";
import type {
  LoginEmailPayload,
  LoginMobilePayload,
  OtpPayload,
  AuthResponse,
} from "@/types";

/** Flat JSON from `POST /api/auth/otp/login-verify` (backend `login_verify`). */
interface LoginVerifyApiResponse {
  access_token: string;
  refresh_token: string;
  token_type?: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  mobile_number?: string | null;
  user_id: number | string;
  premium_member?: boolean;
}

function mapLoginVerifyToAuthResponse(data: LoginVerifyApiResponse): AuthResponse {
  const first = data.first_name?.trim() ?? "";
  const last = data.last_name?.trim() ?? "";
  const name =
    [first, last].filter(Boolean).join(" ") ||
    data.email?.trim() ||
    data.mobile_number ||
    "User";

  return {
    token: data.access_token,
    refreshToken: data.refresh_token,
    user: {
      id: String(data.user_id),
      name,
      email: data.email ?? undefined,
      mobile: data.mobile_number ?? undefined,
      isPremium: Boolean(data.premium_member),
    },
  };
}

function verifyOtpRequestBody(payload: OtpPayload) {
  if ("email" in payload) {
    return { email: payload.email.trim().toLowerCase(), otp: payload.otp };
  }
  return {
    mobile_number: payload.mobile,
    country_code: "91",
    otp: payload.otp,
  };
}

export async function loginWithEmail(
  payload: LoginEmailPayload
): Promise<AuthResponse> {
  const { data } = await http.post<AuthResponse>(
    API_ENDPOINTS.login,
    payload
  );
  persistAuthTokens(data);
  return data;
}

export async function loginWithMobile(
  payload: LoginMobilePayload
): Promise<{ message: string }> {
  const { data } = await http.post<{ message: string }>(
    API_ENDPOINTS.loginWithMobile,
    payload
  );
  return data;
}

export async function sendOtp(mobile: string): Promise<{ message: string }> {
  const { data } = await http.post<{ message: string }>(
    API_ENDPOINTS.sendOtp,
    { mobile_number: mobile, country_code: "91" }
  );
  return data;
}

export async function verifyOtp(payload: OtpPayload): Promise<AuthResponse> {
  const { data } = await http.post<LoginVerifyApiResponse>(
    API_ENDPOINTS.verifyOtp,
    verifyOtpRequestBody(payload)
  );
  const auth = mapLoginVerifyToAuthResponse(data);
  persistAuthTokens(auth);
  return auth;
}

export async function logout(): Promise<void> {
  try {
    await http.post(API_ENDPOINTS.logout);
  } finally {
    clearAuthTokens();
  }
}

function persistAuthTokens(auth: AuthResponse): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.authToken, auth.token);
  localStorage.setItem(STORAGE_KEYS.refreshToken, auth.refreshToken);
  localStorage.setItem(STORAGE_KEYS.userId, auth.user.id);
  localStorage.setItem(STORAGE_KEYS.userProfile, JSON.stringify(auth.user));
  setAuthCookie(auth.token);
}

function clearAuthTokens(): void {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  clearAuthCookie();
}
