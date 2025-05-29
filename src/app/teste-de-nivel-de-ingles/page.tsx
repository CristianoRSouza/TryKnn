"use client";
import Button from "@components/EnglishTest/Button";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useUtms } from "@/contexts/UTMContext";
import { useEffect } from "react";
import { useTestFlow } from "@/contexts/TestFlowContext";
export default function Home() {
  const { utms } = useUtms();
  const { setCurrentStep } = useTestFlow();

  useEffect(() => {
    if (utms?.filled === "true") {
      setCurrentStep("test");
    }
  }, [utms, setCurrentStep]);

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            src="/home-img.jpg"
            alt="Elsa"
            fill
            quality={65}
            priority={true}
          />
        </div>
        <div className={styles.info}>
          <h1>Descubra seu nível de fluência em inglês</h1>
          <p>
            Avalie sua pronúncia e compreensão em minutos: inicie sua avaliação
            agora e veja como você pode melhorar seu inglês com de feedback
            personalizado.
          </p>
          <Link href="/teste-de-nivel-de-ingles/exercicios">
            <Button text="Comece agora" customStyle={styles.button} />
          </Link>
        </div>
      </div>
    </main>
  );
}
