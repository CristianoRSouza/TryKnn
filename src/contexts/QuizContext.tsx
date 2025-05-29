import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

type Step = "initial" | "test" | "scores";

interface FormDataType {
  id: string;
  name: string;
  school: string;
  questions_answered: {
    uid: string;
    isRight: boolean;
  }[];
}

export interface UserDataType {
  id: string;
  name: string;
  has_spinned: boolean;
  questions_answered: {
    isRight: boolean;
    uid: string;
  }[];
  questions_right: {
    isRight: boolean;
    uid: string;
  }[];
  school_name: string;
}

interface QuizFlowContext {
  currentStep: Step;
  setCurrentStep: Dispatch<SetStateAction<Step>>;
  goToNextStep: () => void;
  userData: FormDataType;
  setUserData: Dispatch<SetStateAction<FormDataType>>;
  allUsers: UserDataType[];
  setAllUsers: Dispatch<SetStateAction<UserDataType[]>>;
  filteredUsers: UserDataType[];
  setFilteredUsers: Dispatch<SetStateAction<UserDataType[]>>;
  loading: boolean;
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
}

const QuizContext = createContext<QuizFlowContext>({
  currentStep: "initial",
  setCurrentStep: () => {},
  goToNextStep: () => {},
  userData: {
    id: "",
    name: "",
    school: "",
    questions_answered: [],
  },
  setUserData: () => {},
  loading: true,
  allUsers: [],
  setAllUsers: () => {},
  filteredUsers: [],
  setFilteredUsers: () => {},
  term: "",
  setTerm: () => {},
});

export const useQuizFlow = () => useContext(QuizContext);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>("initial");
  const [userData, setUserData] = useState<FormDataType>({
    id: "",
    name: "",
    school: "",
    questions_answered: [],
  });
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<UserDataType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserDataType[]>([]);
  const [term, setTerm] = useState<string>("");

  const loadFromLocalStorage = () => {
    const keys: (keyof FormDataType)[] = [
      "id",
      "name",
      "school",
      "questions_answered",
    ];
    const data: Partial<FormDataType> = {};
    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          data[key] = JSON.parse(value);
        } catch (e) {
          // @ts-ignore
          data[key] = value;
        }
      }
    });

    // Ensure questions_answered is always an array
    data.questions_answered = data.questions_answered || [];

    setUserData(data as FormDataType);
    setLoading(false);
  };

  useEffect(() => {
    loadFromLocalStorage();

    const handleStorageChange = () => {
      loadFromLocalStorage();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const stepsOrder: Step[] = ["initial", "test", "scores"];

  const goToNextStep = useCallback(() => {
    setCurrentStep((prevStep) => {
      const nextIndex = (stepsOrder.indexOf(prevStep) + 1) % stepsOrder.length;
      return stepsOrder[nextIndex];
    });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        goToNextStep,
        userData,
        setUserData,
        loading,
        setAllUsers,
        allUsers,
        filteredUsers,
        setFilteredUsers,
        term,
        setTerm,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
