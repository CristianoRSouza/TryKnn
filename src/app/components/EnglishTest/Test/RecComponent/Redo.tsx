import "material-symbols";
import styles from "./styles.module.scss";

type RedoButtonProps = {
  onClick: (e: any) => void;
};

const Redo = ({ onClick }: RedoButtonProps) => {
  return (
    <button className={styles.redo__button} onClick={onClick}>
      <span className={`material-symbols-outlined ${styles.icon}`}>delete</span>
    </button>
  );
};

export default Redo;
