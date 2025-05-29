import styles from "./styles.module.scss";
import { CircularProgressbar } from "react-circular-progressbar";

type ScoreCardProps = {
  score: number;
  maxScore?: number;
  category: string;
  description: string;
};

const ScoreCard = ({
  score,
  maxScore = 100,
  category,
  description,
}: ScoreCardProps) => {
  return (
    <div className={styles.score__card}>
      <header className={styles.header}>
        <div className={styles.circle__wrapper}>
          <CircularProgressbar
            maxValue={maxScore}
            value={score}
            strokeWidth={20}
            styles={{
              path: {
                stroke: "#645fc9",
              },
              trail: {
                stroke: "#E6EDF4",
              },
            }}
          />
        </div>
        <p className={styles.score__value}>
          <span>{score}</span>
          <span> / {maxScore}</span>
        </p>
        <span>•</span>
        <p>{category}</p>
      </header>
      <p className={styles.feedback}>{description}</p>
    </div>
  );
};

export default ScoreCard;
