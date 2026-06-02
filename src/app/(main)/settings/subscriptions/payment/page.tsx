"use client";

import { useRouter } from "next/navigation";
import { SubscriptionPaymentSummaryView } from "@/components/settings/SubscriptionPaymentSummaryView";

export default function SubscriptionPaymentPage() {
  const router = useRouter();
  return <SubscriptionPaymentSummaryView onBack={() => router.back()} />;
}
