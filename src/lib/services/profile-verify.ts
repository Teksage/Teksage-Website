import axios from "axios";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { http } from "@/lib/services/http";

function messageFromAxiosError(err: unknown): string {
  if (!axios.isAxiosError(err)) return "Something went wrong. Please try again.";
  const raw = err.response?.data;
  if (raw && typeof raw === "object" && "detail" in raw) {
    const detail = (raw as { detail: unknown }).detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      return detail
        .map((item) =>
          item && typeof item === "object" && "msg" in item
            ? String((item as { msg: string }).msg)
            : ""
        )
        .filter(Boolean)
        .join(" ");
    }
  }
  return err.message || "Something went wrong. Please try again.";
}

/** `POST /api/auth/otp/send-authenticated` — same as Flutter `ProfileService.profileVerify`. */
export async function sendAuthenticatedOtp(body: {
  email?: string;
  mobile_number?: string;
  country_code?: string;
}): Promise<{ message?: string }> {
  try {
    const { data } = await http.post<{ message?: string }>(
      API_ENDPOINTS.sendAuthenticatedOtp,
      body
    );
    return data;
  } catch (e) {
    throw new Error(messageFromAxiosError(e));
  }
}

/** `POST /api/auth/otp/verify` — same as Flutter `ProfileService.profileVerifyOtp` (default `update=false`). */
export async function verifyAuthenticatedOtp(
  body: {
    email?: string;
    mobile_number?: string;
    country_code?: string;
    otp: string;
  },
  options?: { update?: boolean }
): Promise<{ status?: string; error?: string }> {
  try {
    const { data } = await http.post<{ status?: string; error?: string }>(
      API_ENDPOINTS.verifyAuthenticatedOtp,
      body,
      options?.update != null ? { params: { update: options.update } } : undefined
    );
    return data;
  } catch (e) {
    throw new Error(messageFromAxiosError(e));
  }
}
