"use client";

import { useI18nConstants } from "@/hooks/useT";
import { useRouter } from "next/navigation";
import { ChatAppBarMenu } from "@/components/chat/ChatAppBarMenu";
import { CHAT_ASSETS } from "@/lib/constants/chat-assets";
import { CHAT_LAYOUT, CHAT_SCREEN } from "@/lib/constants/chat-screen";
import { cn } from "@/lib/utils";

type ChatAppBarProps = {
  isPremium?: boolean;
  messageCount?: number;
  maintainHistory?: boolean;
  planStatus?: string;
  onToast?: (message: string) => void;
};

/** Flutter `ChatAppBarWithDownload` — green header + actions menu. */
export function ChatAppBar({
  isPremium = false,
  messageCount = 0,
  maintainHistory = false,
  planStatus = "",
  onToast = () => {},
}: ChatAppBarProps) {
  const CS = useI18nConstants(CHAT_SCREEN);
  const router = useRouter();

  return (
    <header className={cn("relative z-20 shrink-0", CHAT_LAYOUT.headerBlock)}>
      <div className="flex items-center gap-2 px-3 pb-3 pt-[max(0.5rem,env(safe-area-inset-top,0px))] lg:pb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex size-10 shrink-0 items-center justify-center"
          aria-label={CS.backAria}
        >
          <img src={CHAT_ASSETS.appBarBack} alt="" className="size-5 brightness-0 invert" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight text-white">
          {CS.title}
        </h1>
        <ChatAppBarMenu
          isPremium={isPremium}
          messageCount={messageCount}
          maintainHistory={maintainHistory}
          planStatus={planStatus}
          onToast={onToast}
        />
      </div>
    </header>
  );
}
