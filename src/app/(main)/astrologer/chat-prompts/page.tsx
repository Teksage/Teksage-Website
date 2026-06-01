"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { AstrologerChatPromptsView } from "@/components/astrologer/AstrologerChatPromptsView";
import { ASTRO_PORTAL_COLORS, ASTRO_PORTAL_UI } from "@/lib/constants/astrologer-portal";
import { ROUTES } from "@/lib/constants/routes";

export default function AstrologerChatPromptsPage() {
  const router = useRouter();

  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: ASTRO_PORTAL_COLORS.brandGreen }}
    >
      <AppHeader
        title={ASTRO_PORTAL_UI.card.chatPrompts.title}
        showBack
        onBackClick={() => router.push(ROUTES.astrologer)}
        className="text-white"
      />
      <AstrologerChatPromptsView />
    </div>
  );
}
