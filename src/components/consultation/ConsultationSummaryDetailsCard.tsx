import { CONSULTATION_SUMMARY_LAYOUT as L } from "@/lib/constants/consultation-summary";
import type { ConsultationSummaryDetailsCardProps } from "@/types/ui/consultation-summary";

export function ConsultationSummaryDetailsCard({
  title,
  items,
}: ConsultationSummaryDetailsCardProps) {
  return (
    <section className={L.detailsCard}>
      <h2 className={L.sectionTitle}>{title}</h2>
      <div className={L.detailList}>
        {items.map((item) => (
          <div key={item.label} className={L.detailRow}>
            <p className={L.detailLabel}>{item.label}</p>
            <p className={L.detailValue}>{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
