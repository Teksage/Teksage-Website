"use client";

import { WhatsAppAskDiscoveryDialog } from "@/components/chat/WhatsAppAskDiscoveryDialog";
import { useFeatureDiscovery } from "@/hooks/useFeatureDiscovery";

/** Shows the feature-discovery popup on any main app page after login when eligible. */
export function FeatureDiscoveryPrompt() {
  const { open, dismiss } = useFeatureDiscovery();

  return <WhatsAppAskDiscoveryDialog open={open} onDismiss={dismiss} />;
}
