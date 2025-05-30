"use client";
import { useState, useRef, useEffect } from "react";
import ProgressBar from "../ProgressBar";
import styles from "./styles.module.scss";
import { TestProps, Sentence, type SentenceOption } from "@/types/types";

import { useTestFlow } from "@/contexts/TestFlowContext";
import PopUp from "../PopUp";
import { useTestScores } from "@/contexts/TestScoresContext";

import dynamic from "next/dynamic";
import { useUtms } from "@/contexts/UTMContext";

const RecComponent = dynamic(
  () => import("@components/EnglishTest/Test/RecComponent"),
  {
    ssr: false,
  }
);

const Sentences = ({
  sentences,
  isWebComponent = false,
  webComponentFlow,
  setWebComponentFlow,
  setWebComponentScores,
}: TestProps) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [showPopUp, setShowPopUp] = useState<boolean>(true);
  const [selected, setSelected] = useState<keyof SentenceOption | null>(null);

  const handleChange = (optionKey: keyof SentenceOption) => {
    if (selected === optionKey) {
      setSelected(null);
    } else {
      setSelected(optionKey);
    }
  };

  const [activeSentence, setActiveSentence] = useState<Sentence>({
    id: sentences[0].id,
    options: {
      a: {
        label: "At the",
        correct: false
      },
      b: {
        label: "On the",
        correct: false
      },
      c: {
        label: "In the",
        correct: true
      },
      d: {
        label: "For the",
        correct: false
      },
    },
    sentence: sentences[0].sentence,
  });
  const [currentExercise, setCurrentExercise] = useState<number>(1);
  const { goToNextStep, currentStep, setCurrentStep } = useTestFlow();
  const { testScores, addTestScore } = useTestScores();

  const { utms } = useUtms();

  const storeElsaData = (data: any) => {
    const dataToStore = {
      sentence: {
        ...activeSentence,
        id: Number(activeSentence.id),
      },
      correctly: selected ? activeSentence.options[selected].correct : false,
      pronunciation: Math.round(data.pronunciation_score),
      intonation: Math.round(data.intonation_score),
      fluency: Math.round(data.fluency_score),
      ielts: Math.round(data.ielts_score),
      toefl: Math.round(data.toefl_score),
      toeic: Math.round(data.toeic_score),
      pte: Math.round(data.pte_score),
    };

    addTestScore(dataToStore);
    setWebComponentScores &&
      setWebComponentScores([...testScores, dataToStore]);

    if (currentExercise >= sentences.length) {
      setWebComponentFlow && setWebComponentFlow("scores");
      if (utms?.master_id || utms?.filled === "true") {
        setCurrentStep("scores");
      } else {
        goToNextStep();
      }
    } else {
      setTimeout(() => {
        setCurrentExercise(currentExercise + 1);
        setActiveSentence({
          id: sentences[currentExercise].id,
          options: {
            a: {
              correct: sentences[currentExercise].options.a.correct,
              label: sentences[currentExercise].options.a.label
            },
            b: {
              correct: sentences[currentExercise].options.b.correct,
              label: sentences[currentExercise].options.b.label
            },
            c: {
              correct: sentences[currentExercise].options.c.correct,
              label: sentences[currentExercise].options.c.label
            },
            d: {
              correct: sentences[currentExercise].options.d.correct,
              label: sentences[currentExercise].options.d.label
            },
          },
          sentence: sentences[currentExercise].sentence,
        });
      }, 1000);
      setSelected(null)
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowPopUp(true);
  }, []);

  useEffect(() => {
    if (!isWebComponent) {
      // if (showPopUp) {
      //   window.history.pushState(
      //     {},
      //     "",
      //     `/teste-de-nivel-de-ingles/instrucoes`
      //   );
      // } else {
      //   window.history.pushState(
      //     {},
      //     "",
      //     `/teste-de-nivel-de-ingles/frase-${currentExercise}`
      //   );
      // }
    }
  }, [showPopUp, currentExercise, isWebComponent]);

  // useEffect(() => {}, [showPopUp]);

  if (!sentences) {
    console.error("Sentences está indefinido!");
    return <div>Carregando frases...</div>; // ou qualquer mensagem de fallback
  }

  return (
    <>
      <div
        className={`${styles.sentences} ${currentStep !== "test" && styles.hidden
          }`}
        style={{
          paddingTop: isWebComponent ? "32px" : "128px",
          paddingBottom: isWebComponent ? "32px" : "48px",
        }}
      >
        {(currentStep === "test" && showPopUp) ||
          (isWebComponent && showPopUp && (
            <PopUp
              title="Como funciona o teste?"
              text="Pressione o botão para gravar suas respostas, deixe nossa inteligência artificial avaliar sua pronúncia e, ao final, confira sua pontuação detalhada."
              buttonText="Toque para começar"
              setState={setShowPopUp}
            />
          ))}
        <ProgressBar step={currentExercise} sentences={sentences} />
        <div className={styles.sentence__container}>
          <header>
            <h3>
              Frase {activeSentence.id}
            </h3>
          </header>
          <h2>{activeSentence.sentence}</h2>
          <div className={styles.options}>
            {(['a', 'b', 'c', 'd'] as (keyof SentenceOption)[]).map((key) => (
              <label key={key} className={styles.option}>
                <input
                  type="radio"
                  name={`sentence-${activeSentence.id}`}
                  value={key}
                  checked={selected === key}
                  onChange={() => {
                    // armazenar resposta para o excel
                    handleChange(key);
                  }}
                />
                {key.toUpperCase()}: {activeSentence.options[key].label}
              </label>
            ))}
          </div>
        </div>
        <RecComponent
          step={currentExercise}
          sentence={activeSentence.sentence}
          mediaRecorderRef={mediaRecorderRef}
          storeElsaData={storeElsaData}
        />
      </div>
    </>
  );
};

export default Sentences;
