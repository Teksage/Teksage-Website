"use client";

import { notFound, useParams } from "next/navigation";
import { ConsultationDetailView } from "@/components/consultation/ConsultationDetailView";

export default function ConsultationAstrologerDetailPage() {
  const params = useParams();
  const raw = params.id;
  const astrologerId = Number(typeof raw === "string" ? raw : "");
  if (!Number.isFinite(astrologerId) || astrologerId < 1) notFound();
  return <ConsultationDetailView astrologerId={astrologerId} />;
}
