"use client";
import styles from "./styles.module.scss";
import { ButtonProps } from "./types";

const Button = ({
  id,
  text,
  icon,
  customStyle = "outlined",
  onClick,
  direction = "left",
  loading = false,
  disabled = false,
  spinnerColor = "#fff",
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <button
      id={id}
      disabled={disabled}
      className={`${styles.button} ${customStyle} ${
        disabled && styles.disabled
      }`}
      onClick={handleClick}
    >
      {loading && (
        <div
          className={styles.loading}
          // @ts-ignore
          style={{ "--spinner-color": spinnerColor }}
        ></div>
      )}
      {direction === "left" && loading === false && icon}
      {text}
      {direction === "right" && loading === false && icon}
    </button>
  );
};

export default Button;
