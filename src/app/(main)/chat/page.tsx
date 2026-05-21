"use client";

import { ChatPageView } from "@/components/chat/ChatPageView";
import { useAuthStore } from "@/store/auth.store";

export default function ChatPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (!isAuthenticated) return null;

  return <ChatPageView />;
}
