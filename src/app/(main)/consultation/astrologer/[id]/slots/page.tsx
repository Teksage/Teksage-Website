"use client";

import { notFound, useParams } from "next/navigation";
import { ConsultationSlotsView } from "@/components/consultation/ConsultationSlotsView";

export default function ConsultationSlotsPage() {
  const params = useParams();
  const raw = params.id;
  const astrologerId = Number(typeof raw === "string" ? raw : "");
  if (!Number.isFinite(astrologerId) || astrologerId < 1) notFound();
  return <ConsultationSlotsView astrologerId={astrologerId} />;
}
