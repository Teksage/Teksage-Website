import type { ReactNode, MouseEventHandler } from "react";

export type AuthGatedLinkProps = {
  href: string;
  /** Post-login return path when logged out; defaults to `href`. */
  returnPath?: string;
  redirectHomeOnClose?: boolean;
  className?: string;
  /** Use for icon-only controls (skip full-width button layout). */
  inline?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  "aria-label"?: string;
};
