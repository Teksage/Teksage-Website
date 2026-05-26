import { STORAGE_KEYS } from "@/lib/constants";

const CHECKOUT_KEY = STORAGE_KEYS.subscriptionCheckout;

/** Session payload for subscription payment summary (Flutter navigates with plan + currency). */
export type SubscriptionCheckoutSession = {
  planId: number;
  currency: "INR" | "USD";
  autoPay?: boolean;
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

const ACTIVATING_KEY = `${CHECKOUT_KEY}:activating`;

export function markSubscriptionActivating(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ACTIVATING_KEY, String(Date.now()));
}

export function clearSubscriptionActivating(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ACTIVATING_KEY);
}

export function isSubscriptionActivatingRecent(maxAgeMs = 300_000): boolean {
  if (typeof window === "undefined") return false;
  const raw = sessionStorage.getItem(ACTIVATING_KEY);
  if (!raw) return false;
  const ts = Number(raw);
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts < maxAgeMs;
}
