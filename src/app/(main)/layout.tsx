import { BottomNav } from "@/components/common/BottomNav";
import { DesktopMainNav } from "@/components/common/DesktopMainNav";
import { HOME_LAYOUT } from "@/lib/constants";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-transparent">
      <DesktopMainNav />
      <div className="relative flex min-h-screen min-w-0 flex-1 flex-col">
        <main className={HOME_LAYOUT.bottomNavClearance}>{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
