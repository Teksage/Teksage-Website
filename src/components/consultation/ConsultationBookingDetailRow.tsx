import { CONSULTATION_BOOKING_LAYOUT } from "@/lib/constants/consultation-booking";

type ConsultationBookingDetailRowProps = {
  label: string;
  value: string;
};

export function ConsultationBookingDetailRow({
  label,
  value,
}: ConsultationBookingDetailRowProps) {
  return (
    <div className={CONSULTATION_BOOKING_LAYOUT.detailRow}>
      <span className={CONSULTATION_BOOKING_LAYOUT.detailLabel}>{label}</span>
      <span className="shrink-0">:</span>
      <span className={CONSULTATION_BOOKING_LAYOUT.detailValue}>{value}</span>
    </div>
  );
}
