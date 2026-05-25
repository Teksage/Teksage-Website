"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { AstrologerMeetingsList } from "@/components/astrologer/AstrologerMeetingsList";
import { useAstrologerEvents } from "@/hooks/useAstrologerEvents";
import { ROUTES } from "@/lib/constants/routes";
import { ASTRO_PORTAL_UI } from "@/lib/constants/astrologer-portal";

export default function AstrologerMeetingsPage() {
  const router = useRouter();
  const { upcomingEvents, completedEvents, loading } = useAstrologerEvents();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader
        title={ASTRO_PORTAL_UI.meetingsTitle}
        showBack
        onBackClick={() => router.push(ROUTES.astrologer)}
      />
      <div className="mx-auto w-full max-w-2xl flex-1">
        <AstrologerMeetingsList
          upcomingEvents={upcomingEvents}
          completedEvents={completedEvents}
          loading={loading}
        />
      </div>
    </div>
  );
}
