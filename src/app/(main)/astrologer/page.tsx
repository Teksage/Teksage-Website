"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { AstrologerDashboard } from "@/components/astrologer/AstrologerDashboard";
import { ROUTES } from "@/lib/constants/routes";

export default function AstrologerHomePage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  // Redirect customers away from astrologer portal
  useEffect(() => {
    if (user && user.userType === "customer") {
      router.replace(ROUTES.home);
    }
  }, [user, router]);

  if (user?.userType === "customer") return null;

  return <AstrologerDashboard />;
}
