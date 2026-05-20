import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { UserProfile } from "@/types";
import {
  mapProfileUpdatesToApiBody,
  mapRawProfileToUserProfile,
  type RawProfileResponse,
} from "@/lib/services/profile-mapper";

export async function fetchProfile(): Promise<UserProfile> {
  const { data } = await http.get<RawProfileResponse>(API_ENDPOINTS.profile);
  return mapRawProfileToUserProfile(data);
}

/** Backend returns a message payload on success — we refetch profile for canonical fields. */
export async function updateProfile(
  payload: Partial<UserProfile>
): Promise<UserProfile> {
  const body = mapProfileUpdatesToApiBody(payload);
  if (Object.keys(body).length === 0) {
    return fetchProfile();
  }
  await http.post(API_ENDPOINTS.updateProfile, body);
  return fetchProfile();
}
