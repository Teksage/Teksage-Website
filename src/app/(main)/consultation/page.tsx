import { Suspense } from "react";
import { PageLoadingCenter } from "@/components/common/Loader";
import { ConsultationHomeView } from "@/components/consultation/ConsultationHomeView";

export default function ConsultationPage() {
  return (
    <Suspense fallback={<PageLoadingCenter className="min-h-dvh" />}>
      <ConsultationHomeView />
    </Suspense>
  );
}
