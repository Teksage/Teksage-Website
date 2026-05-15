export type LoaderVariant = "spinner" | "dots";
export type LoaderSize = "sm" | "md" | "lg";

export interface LoaderProps {
  /** Default `spinner` — ring spin. `dots` — three pulsing dots (Flutter-style). */
  variant?: LoaderVariant;
  size?: LoaderSize;
  className?: string;
  /** Accessible name; defaults to loader UI constant. */
  label?: string;
}
