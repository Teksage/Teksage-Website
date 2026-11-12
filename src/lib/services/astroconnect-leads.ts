import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type { AstroConnectLeadPayload, AstroConnectLeadResponse } from "@/types/astroconnect-lead";

export async function submitAstroConnectLead(
  payload: AstroConnectLeadPayload
): Promise<AstroConnectLeadResponse> {
  const res = await http.post(API_ENDPOINTS.marathonLeads, payload);
  return res.data as AstroConnectLeadResponse;
}

export async function lookupAstroConnectLead(params: {
  country_code: string;
  mobile_number: string;
  source_marathon_id: number;
}): Promise<AstroConnectLeadResponse | null> {
  const res = await http.get(API_ENDPOINTS.marathonLeadsLookup, { params });
  return (res.data as AstroConnectLeadResponse | null) ?? null;
}
