import { http } from "./http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  AstroConnectPopupEvent,
  AstroConnectPopupStatus,
} from "@/types/astroconnect-popup";

type EventDto = {
  id?: number;
  name?: string;
  public_slug?: string | null;
  description?: string | null;
  starts_at?: string;
  ends_at?: string;
  categories?: string[];
};

type StatusDto = {
  should_show?: boolean;
  event?: EventDto | null;
};

function mapEvent(data: EventDto | null | undefined): AstroConnectPopupEvent | null {
  if (!data || data.id == null || !data.starts_at || !data.ends_at) return null;
  return {
    id: data.id,
    name: data.name ?? "",
    publicSlug: data.public_slug ?? null,
    description: data.description ?? null,
    startsAt: data.starts_at,
    endsAt: data.ends_at,
    categories: data.categories ?? [],
  };
}

function mapStatus(data: StatusDto): AstroConnectPopupStatus {
  return {
    shouldShow: Boolean(data.should_show),
    event: mapEvent(data.event),
  };
}

export async function fetchAstroConnectPopup(): Promise<AstroConnectPopupStatus> {
  const { data } = await http.get<StatusDto>(API_ENDPOINTS.marathonPopup);
  return mapStatus(data);
}

export async function dismissAstroConnectPopup(eventId: number): Promise<AstroConnectPopupStatus> {
  const { data } = await http.post<StatusDto>(API_ENDPOINTS.marathonPopupDismiss, {
    event_id: eventId,
  });
  return mapStatus(data);
}
