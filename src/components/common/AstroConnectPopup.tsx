"use client";

import { useRouter } from "next/navigation";
import { AstroConnectPopupDialog } from "@/components/marathon/AstroConnectPopupDialog";
import { marathonEventPath } from "@/lib/constants/routes";
import { useAstroConnectPopup } from "@/hooks/useAstroConnectPopup";

/** One-time popup for the latest published AstroConnect Pro event. */
export function AstroConnectPopup() {
  const router = useRouter();
  const { event, dismiss } = useAstroConnectPopup();
  if (!event) return null;

  return (
    <AstroConnectPopupDialog
      event={event}
      onClose={() => {
        void dismiss();
      }}
      onBook={() => {
        const slug = event.publicSlug || event.id;
        void dismiss().then(() => router.push(marathonEventPath(slug)));
      }}
    />
  );
}
