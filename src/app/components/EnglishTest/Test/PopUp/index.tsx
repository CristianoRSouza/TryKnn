"use client";
import "material-symbols";
import styles from "./styles.module.scss";
import { Button } from "knn-ui";
import { useState } from "react";
import { PopUpProps } from "@/types/types";

const PopUp = ({ title, text, buttonText, onClick, setState }: PopUpProps) => {
  const [visible, setVisible] = useState(true);

  const handleClick = (e: any) => {
    setVisible(false);
    setState && setState(false);
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <div className={`${styles.container} ${!visible ? styles.invisible : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.instructions}>
          <h3>{title}</h3>
          <p>{text}</p>
          <div
            onClick={handleClick}
            onTouchStart={handleClick}
            onPointerDown={handleClick}
          >
            <Button text={buttonText} customStyle={styles.button} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
