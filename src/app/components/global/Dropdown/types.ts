export interface DropdownProps {
  placeholder?: string;
  data: DropdownOption[];
  handleSelected?: (value: string) => void;
  accentColor?: string;
  customStyle?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  selectedValue?: string;
}

export type DropdownOption = {
  id?: number | string;
  value?: string;
  [propName: string]: any;
};

export type DropdownItem = {
  accentColor?: string;
};
