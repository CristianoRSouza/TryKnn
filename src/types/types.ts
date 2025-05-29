export type ScoreData = {
  sentence: string;
  nativeness: number;
  fluency: number;
  intonation: number;
};

export type SentenceOptionResult = {
  label: string;
  correct: boolean;
}

export type SentenceOption = {
  a: SentenceOptionResult;
  b: SentenceOptionResult;
  c: SentenceOptionResult;
  d: SentenceOptionResult;
}

export type Sentence = {
  id: number;
  sentence: string;
  options: SentenceOption;
};

export type ScoresProps = {
  isWebComponent?: boolean;
  webComponentScores?: any;
};

export type RecButtonProps = {
  step: number;
  sentence: string;
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>;
  storeElsaData: (data: any) => void;
};

export type PermissionButtonProps = {
  handleMicPermission: () => void;
};

export type ProgressBarProps = {
  step: number;
  sentences: Sentence[];
};

export type RecButtonStates =
  | "idle"
  | "recording"
  | "reviewing"
  | "processing"
  | "completed"
  | "error";

export type TestProps = {
  setWebComponentFlow?: React.Dispatch<React.SetStateAction<"test" | "scores">>;
  webComponentFlow?: "test" | "scores";
  webComponentScores?: any;
  setWebComponentScores?: React.Dispatch<React.SetStateAction<any>>;
  isWebComponent?: boolean;
  sentences: Sentence[];
};

export type ButtonProps = {
  text: string;
  icon: string;
  onClick: (e: any) => void;
};

export type PopUpProps = {
  title: string;
  text: string;
  buttonText: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
};
