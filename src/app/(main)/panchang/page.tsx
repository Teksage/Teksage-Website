import { AppHeader } from "@/components/common/AppHeader";
import { EmptyState } from "@/components/common/EmptyState";

export default function PanchangPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-brand-bg)]">
      <AppHeader title="Panchang" showNotification />
      <EmptyState
        title="Panchang Coming Soon"
        description="Daily calendar and auspicious timings will be available here."
      />
    </div>
  );
}
