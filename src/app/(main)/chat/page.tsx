"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChatPageView } from "@/components/chat/ChatPageView";
import { ROUTES } from "@/lib/constants/routes";
import { buildLoginRedirectPath } from "@/lib/login-redirect";
import { useAuthStore } from "@/store/auth.store";

export default function ChatPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(buildLoginRedirectPath(ROUTES.chat));
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return <ChatPageView />;
}
