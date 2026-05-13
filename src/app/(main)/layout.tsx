import { BottomNav } from "@/components/common/BottomNav";
import { DesktopMainNav } from "@/components/common/DesktopMainNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--color-brand-bg)]">
      <DesktopMainNav />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <main className="flex-1 pb-28 lg:pb-8">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
