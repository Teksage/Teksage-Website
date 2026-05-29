import Image from "next/image";
import { WELCOME_ASSETS } from "@/lib/constants/assets";

type WelcomeFeatureRowProps = {
  label: string;
};

export function WelcomeFeatureRow({ label }: WelcomeFeatureRowProps) {
  return (
    <li className="flex items-start gap-3">
      <Image
        src={WELCOME_ASSETS.check}
        alt=""
        width={18}
        height={18}
        unoptimized
        className="mt-1 size-[18px] shrink-0"
      />
      <span className="text-base font-medium leading-snug text-white">{label}</span>
    </li>
  );
}
