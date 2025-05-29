export type ButtonProps = {
  id?: string;
  text?: string;
  icon?: React.ReactNode;
  customStyle?: string;
  onClick?: (e: any) => void;
  direction?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  spinnerColor?: string;
};
