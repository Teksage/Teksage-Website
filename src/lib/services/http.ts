import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { STORAGE_KEYS } from "@/lib/constants";
import {
  clearAuthSession,
  redirectHomeFromProtectedIfNeeded,
} from "@/lib/auth-session";
import { setAuthCookie } from "@/lib/auth-cookie";
import { getPublicApiBaseUrl } from "@/lib/env";
import { getStoredAppLanguageName } from "@/lib/settings-language-storage";

const http = axios.create({
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use((config) => {
  if (!http.defaults.baseURL) {
    http.defaults.baseURL = getPublicApiBaseUrl();
  }
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(STORAGE_KEYS.authToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) {
      config.headers["X-Timezone"] = tz;
    }
    config.headers.response_language = getStoredAppLanguageName();
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      const url = error.config?.url ?? "";
      // FCM token registration can fail before auth is fully ready — don't wipe session
      if (!url.includes("/register-token")) {
        clearAuthSession();
        redirectHomeFromProtectedIfNeeded();
      }
    }
    return Promise.reject(error);
  }
);

export { http };

export async function refreshAccessToken(): Promise<string> {
  const refreshToken =
    typeof window !== "undefined"
      ? localStorage.getItem(STORAGE_KEYS.refreshToken)
      : null;

  if (!refreshToken) throw new Error("No refresh token");

  if (!http.defaults.baseURL) {
    http.defaults.baseURL = getPublicApiBaseUrl();
  }

  const { data } = await http.post<{ access_token: string }>(
    API_ENDPOINTS.refreshToken,
    { refresh_token: refreshToken }
  );

  localStorage.setItem(STORAGE_KEYS.authToken, data.access_token);
  setAuthCookie(data.access_token);
  return data.access_token;
}
