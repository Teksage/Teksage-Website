"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { marathonEventPath } from "@/lib/constants/routes";
import { fetchPublicMarathon } from "@/lib/services/marathon";

export default function MarathonIdRedirectPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) return;
    void fetchPublicMarathon(id)
      .then((event) => router.replace(marathonEventPath(event.public_slug || event.id)))
      .catch(() => router.replace(marathonEventPath(id)));
  }, [params.id, router]);

  return <LoadingOverlay open />;
}
