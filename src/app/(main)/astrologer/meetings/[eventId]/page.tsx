import { Suspense, use } from "react";
import { AstrologerMeetingDetailPage } from "@/components/astrologer/AstrologerMeetingDetailPage";

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default function AstrologerMeetingDetailRoute({ params }: PageProps) {
  const { eventId } = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-brand-primary)]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      }
    >
      <AstrologerMeetingDetailPage eventId={eventId} />
    </Suspense>
  );
}
