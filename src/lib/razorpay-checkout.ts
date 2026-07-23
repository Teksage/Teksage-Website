/** Load Razorpay checkout.js and open payment modal — web equivalent of Flutter `razorpay_flutter`. */

type RazorpayOrderHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpaySubscriptionHandlerResponse = {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    code?: string;
    description?: string;
    reason?: string;
  };
};

type RazorpayOptions = {
  key: string;
  currency?: string;
  name: string;
  description: string;
  order_id?: string;
  subscription_id?: string;
  handler: (response: Record<string, string>) => void;
  prefill?: { email?: string; contact?: string };
  modal?: { ondismiss?: () => void };
  theme?: { color?: string };
};

type RazorpayInstance = {
  open: () => void;
  on: (event: "payment.failed", handler: (response: RazorpayFailureResponse) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let scriptPromise: Promise<void> | null = null;

function loadRazorpayScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay is only available in the browser"));
  }
  if (window.Razorpay) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay"));
      document.body.appendChild(script);
    });
  }
  return scriptPromise;
}

export async function openRazorpayCheckout(options: {
  key: string;
  currency: string;
  orderId: string;
  /** Razorpay order amount in paise — mirrors Flutter `response.amount`. */
  amount?: number;
  name?: string;
  description?: string;
  prefill?: { email?: string; contact?: string };
  onSuccess: (response: RazorpayOrderHandlerResponse) => void;
  onDismiss?: () => void;
  onFailure?: (message: string) => void;
}): Promise<void> {
  const currency = (options.currency ?? "").trim().toUpperCase();
  if (currency !== "INR" && currency !== "USD") {
    throw new Error("Invalid payment currency");
  }

  await loadRazorpayScript();
  if (!window.Razorpay) {
    throw new Error("Razorpay unavailable");
  }

  const prefill: { email?: string; contact?: string } = {};
  if (options.prefill?.email?.trim()) prefill.email = options.prefill.email.trim();
  if (options.prefill?.contact?.trim()) prefill.contact = options.prefill.contact.trim();

  const rzp = new window.Razorpay({
    key: options.key,
    currency,
    ...(options.amount != null ? { amount: options.amount } : {}),
    name: options.name ?? "Teksage",
    description: options.description ?? "Consultation",
    order_id: options.orderId,
    ...(Object.keys(prefill).length > 0 ? { prefill } : {}),
    theme: { color: "#10B100" },
    handler: (response) => {
      options.onSuccess(response as RazorpayOrderHandlerResponse);
    },
    modal: { ondismiss: options.onDismiss },
  });

  rzp.on("payment.failed", (response) => {
    const message =
      response.error?.description ??
      response.error?.reason ??
      "Payment failed";
    options.onFailure?.(message);
  });

  rzp.open();
}

export async function openRazorpaySubscriptionCheckout(options: {
  key: string;
  subscriptionId: string;
  name?: string;
  description?: string;
  prefill?: { email?: string; contact?: string };
  onSuccess: (response: RazorpaySubscriptionHandlerResponse) => void;
  onDismiss?: () => void;
  onFailure?: (message: string) => void;
}): Promise<void> {
  await loadRazorpayScript();
  if (!window.Razorpay) {
    throw new Error("Razorpay unavailable");
  }

  const prefill: { email?: string; contact?: string } = {};
  if (options.prefill?.email?.trim()) prefill.email = options.prefill.email.trim();
  if (options.prefill?.contact?.trim()) prefill.contact = options.prefill.contact.trim();

  const rzp = new window.Razorpay({
    key: options.key,
    name: options.name ?? "Teksage",
    description: options.description ?? "Subscription",
    subscription_id: options.subscriptionId,
    ...(Object.keys(prefill).length > 0 ? { prefill } : {}),
    theme: { color: "#10B100" },
    handler: (response) => {
      options.onSuccess(response as RazorpaySubscriptionHandlerResponse);
    },
    modal: { ondismiss: options.onDismiss },
  });

  rzp.on("payment.failed", (response) => {
    const message =
      response.error?.description ??
      response.error?.reason ??
      "Payment failed";
    options.onFailure?.(message);
  });

  rzp.open();
}
