"use client";

import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { MarathonCheckoutView } from "@/components/marathon/MarathonCheckoutView";
import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";

function MarathonCheckoutPage() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const marathonId = Number(params.id);
  const slotId = Number(search.get(MARATHON_CHECKOUT.slotQuery));
  if (!Number.isFinite(marathonId) || !Number.isFinite(slotId)) return null;
  return <MarathonCheckoutView marathonId={marathonId} slotId={slotId} />;
}

export default function Page() {
  return (
    <Suspense>
      <MarathonCheckoutPage />
    </Suspense>
  );
}
