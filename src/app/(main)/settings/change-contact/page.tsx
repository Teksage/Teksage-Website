"use client";

import { Suspense } from "react";
import { PageLoadingCenter } from "@/components/common/Loader";
import { ChangeContactView } from "@/components/settings/ChangeContactView";

export default function ChangeContactPage() {
  return (
    <Suspense fallback={<PageLoadingCenter className="min-h-dvh" />}>
      <ChangeContactView />
    </Suspense>
  );
}
