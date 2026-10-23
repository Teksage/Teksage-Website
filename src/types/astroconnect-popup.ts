export type AstroConnectPopupEvent = {
  id: number;
  name: string;
  publicSlug: string | null;
  description: string | null;
  startsAt: string;
  endsAt: string;
  categories: string[];
};

export type AstroConnectPopupStatus = {
  shouldShow: boolean;
  event: AstroConnectPopupEvent | null;
};

export type AstroConnectPopupDialogProps = {
  event: AstroConnectPopupEvent;
  onClose: () => void;
  onBook: () => void;
};
