import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { FeatureDiscoveryStatus } from "@/types/feature-discovery";

type FeatureDiscoveryStatusDto = {
  lifetime_chat_count?: number;
  dismissed?: boolean;
  should_show_popup?: boolean;
};

function mapFeatureDiscoveryStatus(
  data: FeatureDiscoveryStatusDto
): FeatureDiscoveryStatus {
  return {
    lifetimeChatCount: data.lifetime_chat_count ?? 0,
    dismissed: Boolean(data.dismissed),
    shouldShowPopup: Boolean(data.should_show_popup),
  };
}

export async function fetchFeatureDiscoveryStatus(): Promise<FeatureDiscoveryStatus> {
  const { data } = await http.get<FeatureDiscoveryStatusDto>(
    API_ENDPOINTS.featureDiscoveryStatus
  );
  return mapFeatureDiscoveryStatus(data);
}

export async function dismissFeatureDiscoveryPopup(): Promise<FeatureDiscoveryStatus> {
  const { data } = await http.post<FeatureDiscoveryStatusDto>(
    API_ENDPOINTS.featureDiscoveryDismiss,
    {}
  );
  return mapFeatureDiscoveryStatus(data);
}
