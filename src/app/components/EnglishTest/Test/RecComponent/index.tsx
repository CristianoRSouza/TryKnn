"use client";
import "material-symbols";
import styles from "./styles.module.scss";
import { uploadAudioToElsa } from "@/utils/uploadAudioToElsa";
import { useState, useEffect } from "react";
import { RecButtonProps, RecButtonStates } from "@/types/types";
import { useReactMediaRecorder } from "react-media-recorder";
import PopUp from "../PopUp";
import Redo from "./Redo";
import Confirm from "./Confirm";
import AudioPlayer from "./AudioPlayer";

const RecComponent = ({ sentence, storeElsaData, step }: RecButtonProps) => {
  const [buttonText, setButtonText] = useState("Clique para gravar");
  const [buttonState, setButtonState] = useState<RecButtonStates>("idle");
  const [hasMicrophonePermission, setHasMicrophonePermission] =
    useState<boolean>(true);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    error: recordingError,
  } = useReactMediaRecorder({
    audio: true,
    mediaRecorderOptions: {
      mimeType: "audio/wav",
    },
  });

  const hanldePopUpClick = () => {
    setHasMicrophonePermission(true);
  };

  const handleStartRecording = () => {
    if (status !== "recording") {
      setAudioBlob(null);
      startRecording();
      setButtonState("recording");
      setButtonText("Gravando...");
    }
  };

  const handleStopRecording = () => {
    if (status === "recording") {
      stopRecording();
      setButtonState("reviewing");
    }
  };

  const handleRedo = () => {
    setAudioBlob(null);
    setButtonText("Clique para gravar");
    setButtonState("idle");
  };

  const handleAudioUpload = async () => {
    setButtonText("Enviando gravação");
    setButtonState("processing");
    if (audioBlob) {
      try {
        const result = await uploadAudioToElsa(audioBlob, sentence);
        setButtonText("Gravação concluída");
        setButtonState("completed");
        setTimeout(() => {
          setAudioBlob(null);
          setButtonText("Clique para gravar");
          setButtonState("idle");
        }, 1000);
        storeElsaData(result.utterance[0]);
      } catch (error) {
        console.error("Error sending audio to Elsa:", error);
        setButtonText("Erro ao gravar");
        setButtonState("idle");
      }
    }
  };

  useEffect(() => {
    if (status === "stopped" && mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then((blob) => {
          setAudioBlob(blob);
        })
        .catch((error) => console.error("Error fetching audio blob", error));
    }
  }, [status, mediaBlobUrl]);

  useEffect(() => {
    if (recordingError) {
      console.error("Recording error:", recordingError);
      setButtonState("error");
    }
  }, [recordingError]);
  return (
    <>
      {!hasMicrophonePermission && (
        <PopUp
          title="Cheque suas permissões"
          text="Detectamos que o acesso ao microfone está bloqueado em seu navegador. Acesse as configurações de privacidade do seu navegador, libere acesso ao seu microfone e tente novamente."
          buttonText="Fechar"
          onClick={hanldePopUpClick}
        />
      )}
      <div className={styles.controls}>
        {buttonState === "recording" ? (
          <>
            <div className={`${styles.button} ${styles[buttonState]}`}>
              <span className={`material-symbols-outlined ${styles.icon}`}>
                radio_button_unchecked
              </span>
              <span>{buttonText}</span>
            </div>
            <Confirm onClick={handleStopRecording} icon="check" />
          </>
        ) : buttonState === "reviewing" ? (
          <>
            <Redo onClick={handleRedo} />
            <AudioPlayer audioBlob={audioBlob} />

            <Confirm onClick={handleAudioUpload} icon="send" />
          </>
        ) : buttonState === "processing" || buttonState === "completed" ? (
          <div className={`${styles.button} ${styles[buttonState]}`}>
            <span className={`material-symbols-outlined ${styles.icon}`}>
              {buttonState === "processing"
                ? "progress_activity"
                : buttonState === "completed"
                  ? "check"
                  : "mic"}
            </span>
            <span>{buttonText}</span>
          </div>
        ) : (
          <div
            className={`${styles.button} ${styles.idle}`}
            onClick={handleStartRecording}
          >
            <span className={`material-symbols-outlined ${styles.icon}`}>
              mic
            </span>
            <span>{buttonText}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default RecComponent;
