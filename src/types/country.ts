/** Country dial entry from `GET /api/countries`. */

export interface CountryDialInfo {
  name: string;
  dial_code: string;
  country_code: string;
  mobile_number_length: number;
  flag: string;
}

export interface CountryDialPickerProps {
  valueDial: string;
  onSelect: (country: CountryDialInfo) => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}
