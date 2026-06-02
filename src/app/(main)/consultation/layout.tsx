"use client";

import { usePathname } from "next/navigation";
import { ConsultationAuthGate } from "@/components/consultation/ConsultationAuthGate";

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <ConsultationAuthGate redirectPath={pathname}>{children}</ConsultationAuthGate>
  );
}
