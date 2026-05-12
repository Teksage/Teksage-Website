import { AppHeader } from "@/components/common/AppHeader";
import { EmptyState } from "@/components/common/EmptyState";

export default function HoroscopePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-brand-bg)]">
      <AppHeader title="Horoscope" showNotification />
      <EmptyState
        title="Horoscope Coming Soon"
        description="Star charts and zodiac predictions will be available here."
      />
    </div>
  );
}
