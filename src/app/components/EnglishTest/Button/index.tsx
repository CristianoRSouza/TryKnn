"use client";
import "material-symbols";
import styles from "./styles.module.scss";

type ButtonProps = {
  text: string;
  icon?: string;
  iconStyle?: "filled" | "outlined";
  customStyle?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
};

const Button = ({
  text,
  icon,
  iconStyle,
  customStyle = "outlined",
  onClick,
  disabled,
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <button
      className={`${styles.button} ${customStyle}`}
      onClick={handleClick}
      style={{
        opacity: `${disabled ? 0.5 : 1}`,
        pointerEvents: `${disabled ? "none" : "auto"}`,
        cursor: `${disabled ? "not-allowed" : "pointer"}`,
      }}
    >
      <span
        className={`material-symbols-rounded ${styles.icon}`}
        style={{
          fontVariationSettings: `"FILL" ${iconStyle === "filled" ? 1 : 0}`,
        }}
      >
        {icon}
      </span>
      <span>{text}</span>
    </button>
  );
};

export default Button;
