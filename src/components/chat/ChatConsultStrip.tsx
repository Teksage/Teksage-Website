import { ChatConsultBanner } from "@/components/chat/ChatConsultBanner";
import { CHAT_LAYOUT } from "@/lib/constants/chat-screen";

/** Flutter `ChatBanner(fromChat: true)` — full-bleed below app bar. */
export function ChatConsultStrip() {
  return (
    <div className={CHAT_LAYOUT.consultStripRoot}>
      <ChatConsultBanner />
    </div>
  );
}
