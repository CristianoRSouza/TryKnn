"use client";
import { useTestFlow } from "@/contexts/TestFlowContext";
import styles from "./styles.module.scss";
import Sentences from "@components/EnglishTest/Test/Sentences";
import Form from "@components/EnglishTest/Form";
import Scores from "@components/EnglishTest/Test/Scores";
import { useUtms } from "@/contexts/UTMContext";
import { useEffect } from "react";

const Test = () => {
  const { currentStep } = useTestFlow();

  const sentences = [
    {
      id: 1,
      difficulty: "Iniciante",
      sentence: "Friends",
    },
    {
      id: 2,
      difficulty: "Iniciante",
      sentence: "I have friends",
    },
    {
      id: 3,
      difficulty: "Intermediário",
      sentence: "My friends are Maria and Luke",
    },
    {
      id: 4,
      difficulty: "Avançado",
      sentence: "My friends have been living in Italy since 2005",
    },
    {
      id: 5,
      difficulty: "Avançado",
      sentence: "How long has it been since you saw your friends?",
    },
  ];

  return (
    <main className={styles.container}>
      {currentStep === "initial" || currentStep === "final" ? <Form /> : null}
      {/* {currentStep === "test" && <Sentences sentences={sentences} />} */}
      {currentStep === "scores" && <Scores />}
    </main>
  );
};

export default Test;
