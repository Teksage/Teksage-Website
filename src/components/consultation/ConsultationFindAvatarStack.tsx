"use client";

import Image from "next/image";
import {
  CONSULTATION_HOME_ASSETS,
  CONSULTATION_HOME_AVATAR_STACK,
  CONSULTATION_HOME_LAYOUT,
} from "@/lib/constants/consultation-home";

export function ConsultationFindAvatarStack() {
  const { count, widthPx, offsetPx, sizePx } = CONSULTATION_HOME_AVATAR_STACK;
  const avatars = CONSULTATION_HOME_ASSETS.astrologerStack.slice(0, count);

  return (
    <div
      className={CONSULTATION_HOME_LAYOUT.avatarStack}
      style={{ width: widthPx, height: sizePx }}
      aria-hidden
    >
      {avatars.map((src, index) => (
        <div
          key={src}
          className={CONSULTATION_HOME_LAYOUT.avatarStackItem}
          style={{
            left: index * offsetPx,
            zIndex: index,
            width: sizePx,
            height: sizePx,
          }}
        >
          <Image
            src={src}
            alt=""
            width={sizePx}
            height={sizePx}
            unoptimized
            className="size-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
