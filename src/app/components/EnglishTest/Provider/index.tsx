"use client";
import { UserDataProvider } from "@contexts/UserDataContext";
import { TestScoresProvider } from "@contexts/TestScoresContext";
import { TestFlowProvider } from "@/contexts/TestFlowContext";
import { UtmsProvider } from "@/contexts/UTMContext";

const ProviderComponent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <UtmsProvider>
      <TestFlowProvider>
        <TestScoresProvider>
          <UserDataProvider>{children}</UserDataProvider>
        </TestScoresProvider>
      </TestFlowProvider>
    </UtmsProvider>
  );
};

export default ProviderComponent;
