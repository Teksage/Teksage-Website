"use client";

import Image from "next/image";
import { useState } from "react";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";

type FaqAccordionItemProps = {
  question: string;
  answer: string;
};

export function FaqAccordionItem({ question, answer }: FaqAccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-black/[0.08] first:border-t-0">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 px-2.5 py-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="flex-1 text-base font-semibold leading-snug text-[var(--color-brand-black)]">
          {question}
        </span>
        <Image
          src={open ? SETTINGS_PAGE_ASSETS.faqCollapse : SETTINGS_PAGE_ASSETS.faqExpand}
          alt=""
          width={20}
          height={20}
          unoptimized
          className="mt-0.5 size-5 shrink-0"
        />
      </button>
      {open ? (
        <p className="px-4 pb-4 text-sm leading-relaxed text-black/50">{answer}</p>
      ) : null}
    </div>
  );
}

