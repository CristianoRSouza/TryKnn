import "material-symbols";
import styles from "./styles.module.scss";
import { useRef, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioPlayer = ({ audioBlob }: { audioBlob: Blob | null }) => {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioBlob && waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        backend: "MediaElement",
        waveColor: "#ffffff",
        progressColor: "#ffffff",
        cursorWidth: 0,
        barWidth: 4,
        barGap: 2,
        barRadius: 16,
        height: "auto",
      });

      const audioUrl = URL.createObjectURL(audioBlob);
      wavesurfer.current.load(audioUrl);

      return () => {
        wavesurfer.current?.destroy();
        URL.revokeObjectURL(audioUrl);
      };
    }
  }, [audioBlob]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setOptions({
        waveColor: isPlaying ? "#8883f7" : "#ffffff",
      });
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
      setIsPlaying(wavesurfer.current.isPlaying());
    }

    wavesurfer.current?.on("finish", () => {
      setIsPlaying(false);
      wavesurfer.current?.stop();
      wavesurfer.current?.seekTo(0);
    });

    setIsPlaying(wavesurfer.current?.isPlaying() || false);
  };

  if (!audioBlob) {
    return null;
  }

  return (
    <div
      className={`${styles.audio__player} ${isPlaying ? styles.playing : ""}`}
      onClick={handlePlayPause}
      data-content="Ouça, regrave ou envie seu áudio"
    >
      {isPlaying ? (
        <span className={`material-symbols-rounded ${styles.icon}`}>pause</span>
      ) : (
        <span className={`material-symbols-rounded ${styles.icon}`}>
          play_arrow
        </span>
      )}
      <div className={styles.waveform} ref={waveformRef} />
    </div>
  );
};

export default AudioPlayer;
