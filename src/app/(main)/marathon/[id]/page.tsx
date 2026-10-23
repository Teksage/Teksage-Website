"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingOverlay } from "@/components/common/LoadingOverlay";
import { ROUTES } from "@/lib/constants/routes";

/** Numeric event links return to the list. The session page was removed. */
export default function MarathonIdRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTES.expertHours);
  }, [router]);

  return <LoadingOverlay open />;
}
