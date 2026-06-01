// Firebase Cloud Messaging Service Worker — background push notifications.
// Config must match NEXT_PUBLIC_FIREBASE_* in .env.local (SW cannot read env vars).

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCcubz3b68zIRptFKMMtcFI8FwuYL-mNRc",
  authDomain: "astroprompt-a675c.firebaseapp.com",
  projectId: "astroprompt-a675c",
  storageBucket: "astroprompt-a675c.firebasestorage.app",
  messagingSenderId: "483755133089",
  appId: "1:483755133089:web:ad159efb1a3f81d40dc8e0",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title ?? "Teksage";
  const body = payload.notification?.body ?? "";
  self.registration.showNotification(title, {
    body,
    icon: "/flutter-assets/images/teksage-logo.png",
  });
});
