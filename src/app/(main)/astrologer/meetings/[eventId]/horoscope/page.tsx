import { Suspense, use } from "react";
import { AstrologerMeetingHoroscopePage } from "@/components/astrologer/AstrologerMeetingHoroscopePage";
import { Loader } from "@/components/common/Loader";

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default function AstrologerMeetingHoroscopeRoute({ params }: PageProps) {
  const { eventId } = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <Loader variant="brand" size="lg" />
        </div>
      }
    >
      <AstrologerMeetingHoroscopePage eventId={eventId} />
    </Suspense>
  );
}
