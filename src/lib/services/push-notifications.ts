/** Web push notifications via Firebase Cloud Messaging.
 *  Mirrors Flutter `NotificationService` + `NotificationFirebaseService`.
 *  Same backend endpoint: POST /api/auth/register-token/
 */
import { getFirebaseApp } from "@/lib/firebase";
import { FIREBASE_VAPID_KEY, isFirebaseWebConfigured } from "@/lib/firebase-config";
import { isClientLoggedIn } from "@/lib/auth-session";
import { http } from "@/lib/services/http";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { FIREBASE_MESSAGING_SW_PATH } from "@/lib/constants/firebase-push";

/** Register SW and wait until it is active before calling getToken(). */
async function getMessagingServiceWorker(): Promise<ServiceWorkerRegistration> {
  await navigator.serviceWorker.register(FIREBASE_MESSAGING_SW_PATH);
  return navigator.serviceWorker.ready;
}

/** Register FCM token with backend (mirrors Flutter `saveFcmToken`). */
async function registerFcmTokenWithBackend(token: string): Promise<void> {
  await http.post(API_ENDPOINTS.registerToken, { fcm_token: token });
}

async function fetchFcmToken(): Promise<string | null> {
  const { getMessaging, getToken } = await import("firebase/messaging");
  const app = getFirebaseApp();
  const messaging = getMessaging(app);
  const registration = await getMessagingServiceWorker();
  return getToken(messaging, {
    vapidKey: FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });
}

/**
 * Request permission, get FCM token, register with backend.
 * Retries once after a short delay (auth cookie / SW may not be ready on first paint).
 */
export async function initWebPush(): Promise<void> {
  if (typeof window === "undefined" || !isFirebaseWebConfigured()) return;

  for (let attempt = 0; attempt < 2; attempt++) {
    if (!isClientLoggedIn()) return;

    try {
      if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") return;
      } else if (Notification.permission !== "granted") {
        return;
      }

      const token = await fetchFcmToken();
      if (token) {
        await registerFcmTokenWithBackend(token);
      }
      return;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const is401 =
        message.includes("401") || message.includes("status code 401");
      const isSwRace = message.includes("no active Service Worker");

      if (attempt === 0 && (is401 || isSwRace)) {
        await new Promise((r) => setTimeout(r, 1500));
        continue;
      }

      if (process.env.NODE_ENV === "development") {
        console.warn("[push] initWebPush failed:", message);
        if (message.includes("API key not valid")) {
          console.warn(
            "[push] Fix: Google Cloud Console → Credentials → Browser key → " +
              "add Firebase Installations API or set Don't restrict key"
          );
        }
      }
      return;
    }
  }
}

/** Navigate to the correct page based on notification title (mirrors Flutter routing). */
function resolveNotificationPath(title: string | undefined | null): string {
  if (!title) return "/notifications";
  const lower = title.toLowerCase();
  if (lower.includes("daily wisdom")) return "/predictions/daily";
  if (lower.includes("weekly insights")) return "/predictions/weekly";
  return "/notifications";
}

/**
 * Subscribe to foreground messages. Call once on app mount (client-only).
 * Returns unsubscribe function.
 */
export async function subscribeToForegroundMessages(
  onNavigate: (path: string) => void
): Promise<() => void> {
  if (typeof window === "undefined" || !isConfigured()) return () => undefined;

  try {
    const { getMessaging, onMessage } = await import("firebase/messaging");
    const app = getFirebaseApp();
    const messaging = getMessaging(app);

    const unsubscribe = onMessage(messaging, (payload) => {
      const title = payload.notification?.title;
      const body = payload.notification?.body;

      if (Notification.permission === "granted") {
        new Notification(title ?? "Teksage", { body: body ?? "" });
      }

      onNavigate(resolveNotificationPath(title));
    });

    return unsubscribe;
  } catch {
    return () => undefined;
  }
}
