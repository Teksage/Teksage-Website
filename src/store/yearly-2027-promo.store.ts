import { create } from "zustand";

/** UI-only: promo sheet open (mobile nav) + desktop banner visible (compact chat). */
type Yearly2027PromoUiState = {
  sheetOpen: boolean;
  setSheetOpen: (open: boolean) => void;
  /** Desktop home: yearly promo banner currently shown above chat. */
  bannerVisible: boolean;
  setBannerVisible: (visible: boolean) => void;
};

export const useYearly2027PromoUiStore = create<Yearly2027PromoUiState>((set) => ({
  sheetOpen: false,
  setSheetOpen: (open) => set({ sheetOpen: open }),
  bannerVisible: false,
  setBannerVisible: (visible) => set({ bannerVisible: visible }),
}));
