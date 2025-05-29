"use client";
import { useTestScores } from "@/contexts/TestScoresContext";
import ScoreCard from "./ScoreCard";
import styles from "./styles.module.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import { use, useEffect } from "react";
import { useUserData } from "@/contexts/UserDataContext";
import Stars from "@public/stars.svg";
import { useTestFlow } from "@/contexts/TestFlowContext";
import {
  getFluencyFeedback,
  getPronunciationFeedback,
  getIntoantionFeedback,
  getTestFeedback,
} from "@utils/getFeedback";
import { ScoresProps } from "@/types/types";
import { exportToExcel } from "@/utils/exportarExcel";
import Button from "../../Button";

const Scores = ({ isWebComponent, webComponentScores }: ScoresProps) => {
  const { currentStep } = useTestFlow();
  const { testScores: contextScores } = useTestScores();
  const { userData } = useUserData();

  const testScores = isWebComponent ? webComponentScores : contextScores;

  useEffect(() => {
    console.log(testScores)
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentStep === "scores") {
      window.history.pushState({}, "", "/teste-de-nivel-de-ingles/resultados");
    }
  }, [currentStep]);

  const firstName = userData.name.split(" ")[0];

  const fullTestScores = testScores.filter(
    (score: any) =>
      !Number.isNaN(score.pronunciation) &&
      !Number.isNaN(score.intonation) &&
      !Number.isNaN(score.fluency) &&
      !Number.isNaN(score.ielts) &&
      !Number.isNaN(score.toefl) &&
      !Number.isNaN(score.toeic) &&
      !Number.isNaN(score.pte)
  );

  // calcular a media de cada categoria e arredondar para 2 casas decimais
  const pronunciationAverage =
    testScores.reduce((acc: any, score: any) => acc + score.pronunciation, 0) /
    testScores.length;
  const intonationAverage =
    fullTestScores.reduce((acc: any, score: any) => acc + score.intonation, 0) /
    fullTestScores.length;
  const fluencyAverage =
    fullTestScores.reduce((acc: any, score: any) => acc + score.fluency, 0) /
    fullTestScores.length;
  const ieltsAverage =
    fullTestScores.reduce((acc: any, score: any) => acc + score.ielts, 0) /
    fullTestScores.length;
  const toeflAverage =
    fullTestScores.reduce((acc: any, score: any) => acc + score.toefl, 0) /
    fullTestScores.length;
  const toeicAverage =
    fullTestScores.reduce((acc: any, score: any) => acc + score.toeic, 0) /
    fullTestScores.length;
  const pteAverage =
    fullTestScores.reduce((acc: any, score: any) => acc + score.pte, 0) /
    fullTestScores.length;

  const handleWhatsapp = () => {
    const message = `Olá! Me chamo ${userData.name} e gostaria de evoluir meu inglês! \n\n Minha média de pronúncia é ${pronunciationAverage} e minha média de fluência é ${fluencyAverage}. \n\n Como posso começar?`;
    const convertedMessage = encodeURI(message);
    window.open(
      "https://api.whatsapp.com/send?phone=5548998297993&text=" +
        convertedMessage,
      "_blank"
    );
  };

  const hasApproved = () => testScores.filter((res: any) => res.correctly).length > 11;

  return (
    <div className={styles.scores}>
      <div className={styles.main__score}>
        {/* <div className={styles.circle__wrapper}>
          <CircularProgressbar
            value={fluencyAverage}
            text={`${pronunciationAverage}`}
            strokeWidth={4}
            styles={{
              path: {
                stroke: "#3E009F",
              },
              trail: {
                stroke: "#E6EDF4",
              },
              text: {
                fill: "#3E009F",
                fontSize: "24px",
              },
            }}
          />
        </div> */}
        <h2>Você terminou seu Teste</h2>
        <p>{getTestFeedback(hasApproved())}</p>
        <Button text="Abrir Avaliação" onClick={() => exportToExcel(testScores)}/>
      </div>
      {/* <div className={styles.detailed__scores}>
        <header>
          <h4>Pontuação detalhada</h4>
        </header>
        <div className={styles.cards}>
          <ScoreCard
            score={pronunciationAverage}
            category="Pronúncia"
            description={getPronunciationFeedback(pronunciationAverage)}
          />
          <ScoreCard
            score={intonationAverage}
            category="Entonação"
            description={getIntoantionFeedback(intonationAverage)}
          />
          <ScoreCard
            maxScore={9}
            score={ieltsAverage}
            category="IELTS"
            description="A nota que você recebeu está relacionada à sua performance na parte de Speaking do teste IELTS. Isso significa que sua habilidade de fala foi avaliada de maneira semelhante ao que seria no teste oficial do IELTS. Continue praticando para aprimorar suas habilidades de comunicação verbal."
          />
          <ScoreCard
            maxScore={30}
            score={toeflAverage}
            category="TOEFL"
            description="A pontuação que você obteve está relacionada à sua performance na parte de Speaking do teste TOEFL. Isso significa que sua habilidade de fala foi avaliada de maneira semelhante ao que seria no teste TOEFL oficial. Continue trabalhando para aprimorar suas habilidades de comunicação oral."
          />
          <ScoreCard
            maxScore={200}
            score={toeicAverage}
            category="TOEIC"
            description="Sua nota reflete sua proficiência na parte de Speaking do teste TOEIC. Isso significa que sua performance nessa seção do teste corresponde à avaliação que você receberia em um teste TOEIC oficial. Continue praticando para desenvolver suas habilidades de expressão verbal."
          />
          <ScoreCard
            maxScore={90}
            score={pteAverage}
            category="PTE"
            description="Sua pontuação está relacionada à sua habilidade de fala avaliada no teste PTE. Isso significa que sua performance no Speaking reflete como você se sairia nessa seção de um teste PTE oficial. Continue se esforçando para melhorar sua comunicação oral."
          />
        </div>
      </div> */}
      {!isWebComponent && (
        <div className={styles.get__in__touch}>
          <header>
            <Stars />
            <h3>
              {firstName}, você acaba de ganhar 20% de desconto em nosso curso!
            </h3>
          </header>
          <p>
            Em breve um de nossos consultores entrará em contato com você para
            começar a sua jornada de evolução no inglês.
          </p>
          {/* <Button
          text="Quero evoluir meu inglês"
          customStyle={styles.button}
          onClick={handleWhatsapp}
        /> */}
        </div>
      )}
    </div>
  );
};

export default Scores;
