"use client";

import Image from "next/image";
import { SETTINGS_PAGE_ASSETS } from "@/lib/constants/assets";
import { DELETE_ACCOUNT_LAYOUT } from "@/lib/constants/settings-delete";

type DeleteAccountReasonRowProps = {
  label: string;
  onSelect: () => void;
};

export function DeleteAccountReasonRow({ label, onSelect }: DeleteAccountReasonRowProps) {
  return (
    <button type="button" onClick={onSelect} className={DELETE_ACCOUNT_LAYOUT.reasonRow}>
      <span className={DELETE_ACCOUNT_LAYOUT.reasonText}>{label}</span>
      <Image
        src={SETTINGS_PAGE_ASSETS.dropDownArrow}
        alt=""
        width={20}
        height={20}
        unoptimized
        className={DELETE_ACCOUNT_LAYOUT.reasonChevron}
      />
    </button>
  );
}
