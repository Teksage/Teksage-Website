import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { APP_SNACKBAR_MESSAGES } from "@/lib/constants/app-snackbar";
import type { UserProfile } from "@/types";
import { mapProfileUpdatesToApiBody } from "@/lib/services/profile-mapper";
import { fetchProfileFromApi } from "@/lib/services/profile-fetch";

export async function fetchProfile(): Promise<UserProfile> {
  return fetchProfileFromApi();
}

export type ProfileUpdateResult = {
  profile: UserProfile;
  message: string;
};

/** Backend returns a message payload on success — we refetch profile for canonical fields. */
export async function updateProfile(
  payload: Partial<UserProfile>
): Promise<ProfileUpdateResult> {
  const body = mapProfileUpdatesToApiBody(payload);
  if (Object.keys(body).length === 0) {
    const profile = await fetchProfile();
    return { profile, message: APP_SNACKBAR_MESSAGES.profileUpdated };
  }
  const { data } = await http.post<{ data?: string }>(
    API_ENDPOINTS.updateProfile,
    body
  );
  const profile = await fetchProfile();
  const message =
    typeof data?.data === "string" && data.data.trim()
      ? data.data
      : APP_SNACKBAR_MESSAGES.profileUpdated;
  return { profile, message };
}
