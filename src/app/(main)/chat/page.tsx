"use client";

import { useEffect, useState } from "react";
import { ChatPageView } from "@/components/chat/ChatPageView";
import { PageLoadingCenter } from "@/components/common/Loader";
import { isClientLoggedIn } from "@/lib/auth-session";

export default function ChatPage() {
  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isClientLoggedIn());
    setReady(true);
  }, []);

  if (!ready) return <PageLoadingCenter className="min-h-dvh" />;
  if (!loggedIn) return null;

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <ChatPageView />
    </div>
  );
}
