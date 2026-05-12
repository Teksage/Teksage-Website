import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { STORAGE_KEYS } from "@/lib/constants";
import { clearAuthCookie, setAuthCookie } from "@/lib/auth-cookie";
import { getPublicApiBaseUrl } from "@/lib/env";

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
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach((key) =>
        localStorage.removeItem(key)
      );
      clearAuthCookie();
      window.location.href = "/login";
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
