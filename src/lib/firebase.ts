/** Firebase Web SDK initialisation.
 *  All NEXT_PUBLIC_FIREBASE_* values live in .env.local.
 *  The VAPID key (web push certificate) is generated in Firebase Console
 *  → Project Settings → Cloud Messaging → Web Push certificates.
 */
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirebaseWebConfig, FIREBASE_VAPID_KEY } from "@/lib/firebase-config";

export { FIREBASE_VAPID_KEY };

let _app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (_app) return _app;
  _app =
    getApps().length > 0 ? getApps()[0]! : initializeApp(getFirebaseWebConfig());
  return _app;
}
