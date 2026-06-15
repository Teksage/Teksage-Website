import { ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";

export function AskRequestDetailField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className={ASK_ASTROLOGER_UI.portalDetailLabel}>{label}</p>
      <p className={ASK_ASTROLOGER_UI.portalDetailValue}>{value}</p>
    </div>
  );
}
