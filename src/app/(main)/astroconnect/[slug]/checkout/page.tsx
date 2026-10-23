"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { MarathonCheckoutView } from "@/components/marathon/MarathonCheckoutView";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";
import { fetchPublicMarathon } from "@/lib/services/marathon";

function AstroConnectCheckoutPage() {
  const params = useParams<{ slug: string }>();
  const search = useSearchParams();
  const slug = params.slug;
  const slotId = Number(search.get(MARATHON_CHECKOUT.slotQuery));
  const [marathonId, setMarathonId] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    void fetchPublicMarathon(slug)
      .then((event) => setMarathonId(event.id))
      .catch(() => setMarathonId(null));
  }, [slug]);

  if (!slug || !Number.isFinite(slotId)) return null;
  if (marathonId == null) return <LoadingOverlay open />;
  return <MarathonCheckoutView marathonId={marathonId} slotId={slotId} eventKey={slug} />;
}

export default function Page() {
  return (
    <Suspense>
      <AstroConnectCheckoutPage />
    </Suspense>
  );
}
