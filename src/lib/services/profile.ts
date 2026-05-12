import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { UserProfile } from "@/types";

export async function fetchProfile(): Promise<UserProfile> {
  const { data } = await http.get<UserProfile>(API_ENDPOINTS.profile);
  return data;
}

export async function updateProfile(
  payload: Partial<UserProfile>
): Promise<UserProfile> {
  const { data } = await http.patch<UserProfile>(
    API_ENDPOINTS.updateProfile,
    payload
  );
  return data;
}

export async function deleteAccount(): Promise<void> {
  await http.delete(API_ENDPOINTS.deleteAccount);
}
