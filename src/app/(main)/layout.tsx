import { BottomNav } from "@/components/common/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-brand-bg)]">
      <main className="flex-1 pb-28">{children}</main>
      <BottomNav />
    </div>
  );
}
