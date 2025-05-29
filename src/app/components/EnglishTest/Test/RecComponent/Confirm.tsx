import "material-symbols";
import styles from "./styles.module.scss";

type ConfirmButtonProps = {
  onClick: (e: any) => void;
  icon: string;
};

const Confirm = ({ onClick, icon }: ConfirmButtonProps) => {
  return (
    <button className={styles.confirm__button} onClick={onClick}>
      <span className={`material-symbols-rounded ${styles.icon}`}>{icon}</span>
    </button>
  );
};

export default Confirm;
