import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  AskAstrologerCreatePayload,
  AskAstrologerOrderResponse,
  AskAstrologerPricing,
  AskAstrologerRequest,
  AskAstrologerVerifyPayload,
} from "@/types/ask-astrologer";

export async function fetchAskAstrologerPricing(): Promise<AskAstrologerPricing> {
  const res = await http.get(API_ENDPOINTS.askAstrologerPricing);
  return res.data as AskAstrologerPricing;
}

export async function createAskAstrologerRequest(
  payload: AskAstrologerCreatePayload
): Promise<AskAstrologerOrderResponse> {
  const res = await http.post(API_ENDPOINTS.askAstrologerCreate, payload);
  return res.data as AskAstrologerOrderResponse;
}

export async function verifyAskAstrologerPayment(
  payload: AskAstrologerVerifyPayload
): Promise<{ status: string; request_id: number }> {
  const res = await http.post(API_ENDPOINTS.askAstrologerVerify, payload);
  return res.data as { status: string; request_id: number };
}

export async function fetchMyAskRequests(): Promise<AskAstrologerRequest[]> {
  const res = await http.get(API_ENDPOINTS.askAstrologerRequests);
  return (res.data as { requests: AskAstrologerRequest[] }).requests ?? [];
}

export async function fetchAskAstrologerRequest(
  requestId: number
): Promise<AskAstrologerRequest> {
  const res = await http.get(`${API_ENDPOINTS.askAstrologerRequest}/${requestId}`);
  return res.data as AskAstrologerRequest;
}
