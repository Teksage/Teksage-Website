import { ChatConsultBanner } from "@/components/chat/ChatConsultBanner";

/** Flutter `ChatBanner(fromChat: true)` — full-bleed below app bar. */
export function ChatConsultStrip() {
  return (
    <div className="relative z-10 shrink-0">
      <ChatConsultBanner isLoggedIn />
    </div>
  );
}
