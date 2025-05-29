export interface InputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (e: any) => void;
  isDisabled?: boolean;
  isFocused?: boolean;
  isSearch?: boolean;
  onClick?: (e: any) => void;
  variant?: "default" | "error" | "success" | "warning";
  data?: SearchItem[];
  accentColor?: string;
  customStyle?: string;
  maxLength?: number;
  type?: "default" | "name" | "password" | "email" | "phone" | "search";
  state?: "default" | "error" | "success" | "warning";
  onBlur?: (e: any) => void;
  formData?: any;
  setFormData?: any;
}

export interface SearchItem {
  id?: number | string;
  value?: string;
  [propName: string]: any;
}
