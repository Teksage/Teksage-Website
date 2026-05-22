export type LoaderVariant =
  | "brand"
  | "inline"
  | "halfTriangle"
  | "spinner"
  | "dots";
export type LoaderSize = "sm" | "md" | "lg";

export interface LoaderProps {
  /** `brand` — Flutter `CustomLoader.show` card. `inline` — button/field embed. */
  variant?: LoaderVariant;
  size?: LoaderSize;
  className?: string;
  label?: string;
}

export interface LoadingOverlayProps {
  open: boolean;
  className?: string;
}
