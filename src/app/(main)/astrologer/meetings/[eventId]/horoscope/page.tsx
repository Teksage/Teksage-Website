import { Suspense, use } from "react";
import { AstrologerMeetingHoroscopePage } from "@/components/astrologer/AstrologerMeetingHoroscopePage";

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default function AstrologerMeetingHoroscopeRoute({ params }: PageProps) {
  const { eventId } = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-brand-primary)] border-t-transparent" />
        </div>
      }
    >
      <AstrologerMeetingHoroscopePage eventId={eventId} />
    </Suspense>
  );
}
