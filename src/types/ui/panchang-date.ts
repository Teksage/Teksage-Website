export type PanchangDatePickerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  today?: Date;
  onSelectDate: (date: Date) => void;
};
