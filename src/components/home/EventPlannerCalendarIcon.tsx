import { HOME_DASHBOARD_UI } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { EventPlannerCalendarIconProps } from "@/types";

/** Calendar-check icon — mirrors Flutter `Icons.event_available_rounded`. */
export function EventPlannerCalendarIcon({ className }: EventPlannerCalendarIconProps) {
  return (
    <span className={cn(HOME_DASHBOARD_UI.eventPlannerBannerIcon, className)} aria-hidden>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full">
        <path
          d="M7 3.75C7 3.33579 7.33579 3 7.75 3C8.16421 3 8.5 3.33579 8.5 3.75V5H15.5V3.75C15.5 3.33579 15.8358 3 16.25 3C16.6642 3 17 3.33579 17 3.75V5H18.25C19.7688 5 21 6.23122 21 7.75V18.25C21 19.7688 19.7688 21 18.25 21H5.75C4.23122 21 3 19.7688 3 18.25V7.75C3 6.23122 4.23122 5 5.75 5H7V3.75Z"
          className="fill-[var(--color-brand-primary)]"
        />
        <path
          d="M4.5 9.5H19.5V18.25C19.5 18.9404 18.9404 19.5 18.25 19.5H5.75C5.05964 19.5 4.5 18.9404 4.5 18.25V9.5Z"
          className="fill-white"
        />
        <path
          d="M10.03 16.53C10.323 16.823 10.797 16.823 11.09 16.53L15.78 11.84C16.073 11.547 16.073 11.073 15.78 10.78C15.487 10.487 15.013 10.487 14.72 10.78L10.56 14.94L9.28 13.66C8.987 13.367 8.513 13.367 8.22 13.66C7.927 13.953 7.927 14.427 8.22 14.72L10.03 16.53Z"
          className="fill-[var(--color-brand-primary)]"
        />
      </svg>
    </span>
  );
}
