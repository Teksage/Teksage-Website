"use client";

import { WhatsAppUpdatesPageContent } from "@/components/whatsapp-updates/WhatsAppUpdatesPageContent";
import { PAGE_SHELL } from "@/lib/constants/page-shell";

export default function WhatsAppUpdatesPage() {
  return (
    <div className={PAGE_SHELL.root}>
      <WhatsAppUpdatesPageContent />
    </div>
  );
}
