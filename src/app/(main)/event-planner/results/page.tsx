import { Suspense } from "react";
import { MuhurthaResultsPage } from "@/components/muhurtha/MuhurthaResultsPage";
import { PageLoadingCenter } from "@/components/common/Loader";
import { PAGE_SHELL } from "@/lib/constants";

export default function Page() {
  return (
    <div className={PAGE_SHELL.root}>
      <Suspense fallback={<PageLoadingCenter />}>
        <MuhurthaResultsPage />
      </Suspense>
    </div>
  );
}
