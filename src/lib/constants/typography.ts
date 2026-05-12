// Typography constants — mirrors Flutter AppFont and MyUtility font sizes

export const FONT_FAMILY = {
  sans: "var(--font-urbanist)",
} as const;

// Font size scale (mirrors Flutter MyUtility fontSize steps)
export const FONT_SIZE = {
  xs: "0.75rem",   // 12px ~ fontSize12
  sm: "0.875rem",  // 14px ~ fontSize14
  base: "1rem",    // 16px ~ fontSize16
  md: "1.125rem",  // 18px ~ fontSize18
  lg: "1.25rem",   // 20px ~ fontSize20
  xl: "1.5rem",    // 24px ~ fontSize24
  "2xl": "1.75rem", // 28px
  "3xl": "2rem",   // 32px
  "4xl": "2.25rem", // 36px
} as const;

export const FONT_WEIGHT = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
} as const;

export const LINE_HEIGHT = {
  tight: "1.2",
  normal: "1.4",
  relaxed: "1.6",
} as const;
