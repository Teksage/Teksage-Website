import { Suspense, use } from "react";
import { AstrologerAskRequestDetailPage } from "@/components/astrologer/AstrologerAskRequestDetailPage";
import { Loader } from "@/components/common/Loader";

interface PageProps {
  params: Promise<{ requestId: string }>;
}

export default function AstrologerAskRequestHoroscopeRoute({ params }: PageProps) {
  const { requestId } = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <Loader variant="brand" size="lg" />
        </div>
      }
    >
      <AstrologerAskRequestDetailPage requestId={requestId} />
    </Suspense>
  );
}
