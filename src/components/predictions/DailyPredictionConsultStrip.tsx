"use client";

import { ConsultationBanner } from "@/components/home/ConsultationBanner";
// import { Button } from "@/components/ui/button";
// import { PREDICTION_DETAIL_SCREEN } from "@/lib/constants/prediction-detail-screen";
import { useAuthStore } from "@/store/auth.store";
import { isAstrologerHomeSession } from "@/lib/utils";

export function DailyPredictionConsultStrip() {
  const user = useAuthStore((s) => s.user);
  const isAstrologer = isAstrologerHomeSession(user ?? undefined);

  return (
    <ConsultationBanner
      isLoggedIn
      isAstrologer={isAstrologer}
      className="mt-8 sm:mt-10"
    />
  );
}

/** Download PDF — disabled for now; re-enable when share flow is ready. */
// export function DailyPredictionPdfRow({
//   canPdf,
//   pdfBusy,
//   onPdfClick,
// }: {
//   canPdf: boolean;
//   pdfBusy: boolean;
//   onPdfClick: () => void;
// }) {
//   if (!canPdf) return null;
//   return (
//     <div className="mt-8 flex justify-center sm:mt-10">
//       <Button
//         type="button"
//         className="rounded-full px-8"
//         disabled={pdfBusy}
//         onClick={() => void onPdfClick()}
//       >
//         {pdfBusy ? "…" : PREDICTION_DETAIL_SCREEN.downloadPdfCta}
//       </Button>
//     </div>
//   );
// }
