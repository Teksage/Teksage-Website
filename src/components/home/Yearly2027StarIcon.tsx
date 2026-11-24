import { YEARLY_2027_PROMO_UI as UI } from "@/lib/constants/yearly-2027-promo-ui";
import { cn } from "@/lib/utils";

/** Gold star mark for the 2027 header chip (reference design). */
export function Yearly2027StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      className={cn(UI.headerStar, className)}
    >
      <path d="M10 1.6l2.2 5.1 5.5.5-4.2 3.7 1.3 5.4L10 13.7l-4.8 2.6 1.3-5.4-4.2-3.7 5.5-.5L10 1.6z" />
    </svg>
  );
}
