import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { DEFAULT_COUNTRY_CODE_NUMERIC, STORAGE_KEYS } from "@/lib/constants";
import { clearAuthSession } from "@/lib/auth-session";
import { setAuthCookie } from "@/lib/auth-cookie";
import { buildLogoutRequestBody } from "@/lib/logout-request";
import type { OtpPayload, AuthResponse } from "@/types";

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
  user_type?: string | null;
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
      userType: data.user_type?.trim() || undefined,
    },
  };
}

function verifyOtpRequestBody(payload: OtpPayload) {
  if ("email" in payload) {
    return { email: payload.email.trim().toLowerCase(), otp: payload.otp };
  }
  const dial = payload.countryCode.replace(/\D/g, "") || DEFAULT_COUNTRY_CODE_NUMERIC;
  return {
    mobile_number: payload.mobile,
    country_code: dial,
    otp: payload.otp,
  };
}

export async function sendOtp(mobile: string): Promise<{ message: string }> {
  const { data } = await http.post<{ message: string }>(
    API_ENDPOINTS.sendOtp,
    { mobile_number: mobile, country_code: DEFAULT_COUNTRY_CODE_NUMERIC }
  );
  return data;
}

export async function resendOtp(
  payload:
    | { email: string }
    | { mobile_number: string; country_code?: string }
): Promise<{ message: string }> {
  const body =
    "email" in payload
      ? { email: payload.email.trim().toLowerCase() }
      : {
          mobile_number: payload.mobile_number,
          country_code:
            payload.country_code?.replace(/\D/g, "") ?? DEFAULT_COUNTRY_CODE_NUMERIC,
        };
  const { data } = await http.post<{ message: string }>(API_ENDPOINTS.sendOtp, body);
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
    const body = buildLogoutRequestBody();
    if (body) {
      await http.post(API_ENDPOINTS.logout, body);
    }
  } catch {
    // Best-effort server revoke; always clear local session below
  } finally {
    clearAuthTokens();
  }
}

function persistAuthTokens(auth: AuthResponse): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.authToken, auth.token);
  localStorage.setItem(STORAGE_KEYS.refreshToken, auth.refreshToken);
  setAuthCookie(auth.token);
}

function clearAuthTokens(): void {
  clearAuthSession();
}
