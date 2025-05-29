import { ProgressBarProps } from "@/types/types";
import styles from "./styles.module.scss";

const ProgressBar = ({ step, sentences }: ProgressBarProps) => {
  return (
    <div className={styles.container}>
      {sentences && sentences.length > 0 ? (
        sentences.map((sentence, index) => {
          return (
            <div
              key={index}
              className={`
                ${styles.step}
                ${step === sentence.id && styles.current}
                ${step > sentence.id && styles.completed}
              `}
            >
              {step > sentence.id && (
                <span className="material-symbols-outlined">check</span>
              )}
            </div>
          );
        })
      ) : (
        <p>No sentences to display.</p> // Adicionando um fallback para exibir se as sentences estiverem indefinidas ou vazias
      )}
    </div>
  );
};

export default ProgressBar;
