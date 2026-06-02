import { isAxiosError } from "axios";
import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import {
  mapRawProfileToUserProfile,
  type RawProfileResponse,
} from "@/lib/services/profile-mapper";
import type { UserProfile } from "@/types";

function isIncompleteProfileBody(
  body: unknown
): body is { detail: string; profile_data: RawProfileResponse } {
  if (body == null || typeof body !== "object") return false;
  const row = body as Record<string, unknown>;
  return (
    row.detail === "Profile not completed" &&
    row.profile_data != null &&
    typeof row.profile_data === "object"
  );
}

/**
 * GET profile — mirrors Flutter `fetchUserProfile` / `IncompleteProfileException`.
 * Backend returns 400 + `profile_data` until `is_profile_updated` is true.
 */
export async function fetchProfileFromApi(): Promise<UserProfile> {
  try {
    const { data } = await http.get<RawProfileResponse>(API_ENDPOINTS.profile);
    return mapRawProfileToUserProfile(data);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      const body = error.response.data;
      if (isIncompleteProfileBody(body)) {
        return mapRawProfileToUserProfile(body.profile_data);
      }
    }
    throw error;
  }
}
