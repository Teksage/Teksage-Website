import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";

export async function requestDeleteAccountOtp(): Promise<string> {
  const { data } = await http.get<{ message?: string }>(
    API_ENDPOINTS.deleteAccountRequest
  );
  return data?.message ?? "OTP sent successfully";
}

export async function confirmDeleteAccount(
  otp: string,
  deletionReason: string
): Promise<string> {
  const { data } = await http.post<{ message?: string }>(
    API_ENDPOINTS.deleteAccountConfirm,
    { otp, deletion_reason: deletionReason }
  );
  return data?.message ?? "Your account will be deleted in 45 days";
}
