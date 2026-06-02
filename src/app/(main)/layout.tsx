import { MainLayoutChrome } from "@/components/common/MainLayoutChrome";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayoutChrome>{children}</MainLayoutChrome>;
}
