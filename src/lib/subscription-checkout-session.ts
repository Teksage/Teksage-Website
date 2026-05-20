import { STORAGE_KEYS } from "@/lib/constants";

const CHECKOUT_KEY = STORAGE_KEYS.subscriptionCheckout;

/** Session payload for subscription payment summary (Flutter navigates with plan + currency). */
export type SubscriptionCheckoutSession = {
  planId: number;
  currency: "INR" | "USD";
};

export function writeSubscriptionCheckout(session: SubscriptionCheckoutSession): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(session));
}

export function readSubscriptionCheckout(): SubscriptionCheckoutSession | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(CHECKOUT_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as SubscriptionCheckoutSession;
    if (!parsed?.planId || (parsed.currency !== "INR" && parsed.currency !== "USD")) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearSubscriptionCheckout(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(CHECKOUT_KEY);
}
