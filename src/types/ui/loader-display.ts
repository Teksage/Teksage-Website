export type LoaderVariant =
  | "brand"
  | "inline"
  | "halfTriangle"
  | "spinner"
  | "dots";
export type LoaderSize = "sm" | "md" | "lg";

export interface LoaderProps {
  /** `brand` / `inline` — pulsing Teksage logo (no card). `inline` uses compact layout in buttons. */
  variant?: LoaderVariant;
  size?: LoaderSize;
  className?: string;
  label?: string;
}

export interface LoadingOverlayProps {
  open: boolean;
  className?: string;
}
