import { ASK_ASTROLOGER_UI } from "@/lib/constants/chat-ask-astrologer";
import { cn } from "@/lib/utils";

export function AskRequestDetailField({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn(ASK_ASTROLOGER_UI.portalDetailCard, className)}>
      <p className={ASK_ASTROLOGER_UI.portalDetailLabel}>{label}</p>
      <p className={ASK_ASTROLOGER_UI.portalDetailValue}>{value}</p>
    </div>
  );
}
