import { getFirebaseWebConfig } from "@/lib/firebase-config";
import {
  FIREBASE_SW_COMPAT_VERSION,
  PUSH_NOTIFICATION_ICON,
} from "@/lib/constants/firebase-push";

/** Service worker script body — config injected from env at request time. */
export function buildFirebaseMessagingSwSource(): string | null {
  const config = getFirebaseWebConfig();
  if (!config.apiKey?.trim() || !config.appId?.trim()) return null;

  const configJson = JSON.stringify(config);
  const icon = JSON.stringify(PUSH_NOTIFICATION_ICON);
  const sdk = FIREBASE_SW_COMPAT_VERSION;

  return `// Generated from NEXT_PUBLIC_FIREBASE_* — do not edit; see src/app/firebase-messaging-sw.js/route.ts
importScripts("https://www.gstatic.com/firebasejs/${sdk}/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/${sdk}/firebase-messaging-compat.js");

firebase.initializeApp(${configJson});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title ?? "Teksage";
  const body = payload.notification?.body ?? "";
  self.registration.showNotification(title, {
    body,
    icon: ${icon},
  });
});
`;

}
