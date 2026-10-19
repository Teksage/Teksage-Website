"use client";

import { Suspense, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { MARATHON_CHECKOUT } from "@/lib/constants/marathon-checkout";
import { marathonCheckoutPath } from "@/lib/constants/routes";
import { fetchPublicMarathon } from "@/lib/services/marathon";

function MarathonCheckoutRedirect() {
  const params = useParams<{ id: string }>();
  const search = useSearchParams();
  const router = useRouter();
  const slotId = Number(search.get(MARATHON_CHECKOUT.slotQuery));

  useEffect(() => {
    const id = Number(params.id);
    if (!Number.isFinite(id) || !Number.isFinite(slotId)) return;
    void fetchPublicMarathon(id)
      .then((event) =>
        router.replace(marathonCheckoutPath(event.public_slug || event.id, slotId))
      )
      .catch(() => router.replace(marathonCheckoutPath(id, slotId)));
  }, [params.id, router, slotId]);

  return <LoadingOverlay open />;
}

export default function Page() {
  return (
    <Suspense>
      <MarathonCheckoutRedirect />
    </Suspense>
  );
}
