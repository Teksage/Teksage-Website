import { Suspense, use } from "react";
import { AstrologerMeetingDetailPage } from "@/components/astrologer/AstrologerMeetingDetailPage";
import { Loader } from "@/components/common/Loader";

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default function AstrologerMeetingDetailRoute({ params }: PageProps) {
  const { eventId } = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--color-brand-primary)]">
          <Loader variant="brand" size="lg" />
        </div>
      }
    >
      <AstrologerMeetingDetailPage eventId={eventId} />
    </Suspense>
  );
}
