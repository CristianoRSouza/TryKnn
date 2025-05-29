'use client';

import EnglishTestWC from "./teste-de-ingles-iframe/page";
import { TestFlowProvider } from "@/contexts/TestFlowContext";
import { TestScoresProvider } from "@/contexts/TestScoresContext";

const Home = () => {
  return (
    <TestFlowProvider>
      <TestScoresProvider>
        <EnglishTestWC />
      </TestScoresProvider>
    </TestFlowProvider>
  )
};

export default Home;
