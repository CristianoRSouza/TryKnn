import React, { createContext, useState, useContext, useCallback } from "react";

type Step = "initial" | "test" | "final" | "scores";

interface ITestFlowContext {
  currentStep: Step;
  goToNextStep: () => void;
  setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
}

const TestFlowContext = createContext<ITestFlowContext>({
  currentStep: "initial",
  goToNextStep: () => {},
  setCurrentStep: () => {},
});

export const useTestFlow = () => useContext(TestFlowContext);

export const TestFlowProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>("initial");

  const stepsOrder: Step[] = ["initial", "test", "final", "scores"];

  const goToNextStep = useCallback(() => {
    setCurrentStep((prevStep) => {
      const nextIndex = (stepsOrder.indexOf(prevStep) + 1) % stepsOrder.length;
      return stepsOrder[nextIndex];
    });
  }, []);

  return (
    <TestFlowContext.Provider
      value={{ currentStep, goToNextStep, setCurrentStep }}
    >
      {children}
    </TestFlowContext.Provider>
  );
};
