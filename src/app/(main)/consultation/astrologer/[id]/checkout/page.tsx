"use client";

import { notFound, useParams } from "next/navigation";
import { ConsultationCheckoutView } from "@/components/consultation/ConsultationCheckoutView";

export default function ConsultationCheckoutPage() {
  const params = useParams();
  const raw = params.id;
  const astrologerId = Number(typeof raw === "string" ? raw : "");
  if (!Number.isFinite(astrologerId) || astrologerId < 1) notFound();
  return <ConsultationCheckoutView astrologerId={astrologerId} />;
}
