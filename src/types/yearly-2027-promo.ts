export type Yearly2027Scores = {
  career: number;
  relationship: number;
  finance: number;
  health: number;
};

export type Yearly2027PromoStatus = {
  showBanner: boolean;
  showSheet: boolean;
  hiddenToday: boolean;
  scores: Yearly2027Scores | null;
  isPremium: boolean;
  hasYearly: boolean;
  generating: boolean;
};

export type Yearly2027PromoBannerProps = {
  scores?: Yearly2027Scores | null;
  isPremium: boolean;
  generating?: boolean;
  onClose: () => void;
  onOpenYearly: () => void;
  onUpgrade: () => void;
  className?: string;
};

export type Yearly2027PromoSheetProps = {
  open: boolean;
  scores: Yearly2027Scores | null;
  isPremium: boolean;
  generating?: boolean;
  onClose: () => void;
  onOpenYearly: () => void;
  onUpgrade: () => void;
};

export type Yearly2027HeaderChipProps = {
  className?: string;
};
