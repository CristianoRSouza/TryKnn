import type { Sentence } from "@/types/types";
import React, { createContext, useContext, useState } from "react";

interface TestScore {
  sentence: Sentence;
  correctly: boolean;
  pronunciation: number;
  intonation: number;
  fluency: number;
  ielts: number;
  toefl: number;
  toeic: number;
  pte: number;
}

interface UserDataContextProps {
  testScores: TestScore[];
  addTestScore: (newScore: TestScore) => void;
}

export const TestScoresContext = createContext<UserDataContextProps>({
  testScores: [],
  addTestScore: () => {},
});

export const TestScoresProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [testScores, setTestScores] = useState<TestScore[]>([]);

  const addTestScore = (newScore: TestScore) => {
    setTestScores((prevScores) => [...prevScores, newScore]);
  };

  return (
    <TestScoresContext.Provider value={{ testScores, addTestScore }}>
      {children}
    </TestScoresContext.Provider>
  );
};

export const useTestScores = () => {
  const context = useContext(TestScoresContext);
  if (!context) {
    throw new Error("useTestScores must be used within a TestScoresProvider");
  }
  return context;
};
