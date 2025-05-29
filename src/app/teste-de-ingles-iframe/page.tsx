"use client"; // Garantir que este código seja executado no cliente

import React from "react";
import styles from "./styles.module.scss";
import Sentences from "../components/EnglishTest/Test/Sentences";
import Scores from "../components/EnglishTest/Test/Scores";
import { sentencesOptions } from "@/data/sentences";

// Componente React
const EnglishTestWC: React.FC = () => {
  const [webComponentFlow, setWebComponentFlow] = React.useState<
    "test" | "scores"
  >("test");

  const [webComponentScores, setWebComponentScores] = React.useState<any[]>([]);
  const sentences = sentencesOptions;

  return (
    <div className={styles.container}>
      {webComponentFlow === "test" && (
        <Sentences
          sentences={sentences}
          isWebComponent
          webComponentFlow={webComponentFlow}
          setWebComponentFlow={setWebComponentFlow}
          setWebComponentScores={setWebComponentScores}
        />
      )}
      {webComponentFlow === "scores" && (
        <Scores isWebComponent webComponentScores={webComponentScores} />
      )}
    </div>
  );
};

export default EnglishTestWC;
