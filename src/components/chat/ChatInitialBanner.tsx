import { ChatIntroText } from "@/components/chat/ChatIntroText";
import type { ChatInitialBannerProps } from "@/types/ui/chat";

/** @deprecated Use `ChatIntroText` — kept for import compatibility. */
export function ChatInitialBanner({ visible }: ChatInitialBannerProps) {
  return <ChatIntroText visible={visible} />;
}
