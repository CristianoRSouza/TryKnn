import styles from "./styles.module.scss";
import Logo from "@public/logo.svg";
import Flags from "@public/flags.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <Logo />
        <Flags />
      </div>
    </header>
  );
};

export default Header;
