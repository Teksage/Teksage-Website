import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import type {
  MarathonBooking,
  MarathonCheckoutOrder,
  MarathonDraft,
  MarathonEvent,
} from "@/types/marathon";

function detailOf(error: unknown): string {
  const data = (error as { response?: { data?: { detail?: string } } })?.response?.data;
  return data?.detail || "Something went wrong. Try again.";
}

export { detailOf as marathonErrorMessage };

export async function fetchPublicMarathons(): Promise<MarathonEvent[]> {
  const res = await http.get(API_ENDPOINTS.marathonPublic);
  return (res.data as { data: MarathonEvent[] }).data ?? [];
}

export async function fetchPublicMarathon(id: number): Promise<MarathonEvent> {
  const res = await http.get(`${API_ENDPOINTS.marathonPublic}/${id}`);
  return res.data as MarathonEvent;
}

export async function checkoutMarathonSlot(
  slotId: number,
  currency: "INR" | "USD" = "INR"
): Promise<MarathonCheckoutOrder> {
  const res = await http.post(
    `${API_ENDPOINTS.marathonCheckout}/${slotId}/checkout?currency=${currency}`
  );
  return res.data as MarathonCheckoutOrder;
}

export async function verifyMarathonPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<{ booking_id: number; warning?: string | null; summary: string }> {
  const res = await http.post(API_ENDPOINTS.paymentVerify, payload);
  return res.data as { booking_id: number; warning?: string | null; summary: string };
}

export async function fetchMyMarathonBookings(): Promise<MarathonBooking[]> {
  const res = await http.get(API_ENDPOINTS.marathonMine);
  return (res.data as { data: MarathonBooking[] }).data ?? [];
}

export async function fetchAstrologerDrafts(): Promise<MarathonDraft[]> {
  const res = await http.get(API_ENDPOINTS.marathonAstrologerDrafts);
  return (res.data as { data: MarathonDraft[] }).data ?? [];
}

export async function confirmMarathonParticipation(marathonId: number): Promise<void> {
  await http.post(`${API_ENDPOINTS.marathonConfirm}/${marathonId}/confirm`);
}

export async function fetchAstrologerMarathonSeats(): Promise<{
  waiting: MarathonBooking[];
  mine: MarathonBooking[];
}> {
  const res = await http.get(API_ENDPOINTS.marathonAstrologerSeats);
  return res.data as { waiting: MarathonBooking[]; mine: MarathonBooking[] };
}

export async function acceptMarathonSeat(bookingId: number): Promise<{ warning?: string | null }> {
  const res = await http.post(`${API_ENDPOINTS.marathonAccept}/${bookingId}/accept`);
  return res.data as { warning?: string | null };
}

export async function completeMarathonSeat(bookingId: number): Promise<void> {
  await http.post(`${API_ENDPOINTS.marathonAccept}/${bookingId}/complete`);
}
