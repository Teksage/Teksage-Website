import { Suspense } from "react";
import { AskSummaryView } from "@/components/ask-astrologer/AskSummaryView";
import { PageLoadingCenter } from "@/components/common/Loader";

export default function AskAstrologerSummaryPage() {
  return (
    <Suspense fallback={<PageLoadingCenter />}>
      <AskSummaryView />
    </Suspense>
  );
}
