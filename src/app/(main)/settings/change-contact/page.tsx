"use client";

import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import { MainTabViewportBackdrop } from "@/components/common/MainTabViewportBackdrop";
import { ChangeContactView } from "@/components/settings/ChangeContactView";
import {
  MAIN_TAB_VIEWPORT_BACKDROP,
  PAGE_SHELL,
  SETTINGS_CHANGE_CONTACT,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function ChangeContactPage() {
  const router = useRouter();
  return (
    <div className={cn(PAGE_SHELL.column, PAGE_SHELL.root)}>
      <MainTabViewportBackdrop className={MAIN_TAB_VIEWPORT_BACKDROP.settings} />
      <AppHeader
        blend
        title={SETTINGS_CHANGE_CONTACT.title}
        showBack
        onBackClick={() => router.back()}
        className={PAGE_SHELL.contentLayer}
      />
      <ChangeContactView />
    </div>
  );
}
