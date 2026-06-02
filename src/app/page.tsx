"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTES.home);
  }, [router]);

  return null;
}
