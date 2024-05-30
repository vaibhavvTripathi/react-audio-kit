import { useRef, useState } from "react";
import {
  ActionButton,
  MicOffIcon,
  PauseIcon,
  PlayIcon,
  Tick,
} from "./childComponents";
import { useAudioAnalyser, useDecibles } from "./hooks";
import "../../index.css";
type AudioRecorderPropsType = {
  getAudioBlobOnStop?: (audioBlob: Blob) => void;
  getCurrentAudioBlobPacket?: (audioBlob: Blob) => void;
  handleError?: (error: any) => void;
  timeSlice?: number;
  onPause?: () => void;
  onRecord?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  senstivity?: number;
  color?: Color;
};

type Color = {
  base?: string;
  hover?: string;
  auora?: string;
  iconColor?: string;
};

export const AudioRecorder = ({
  getAudioBlobOnStop,
  getCurrentAudioBlobPacket,
  handleError,
  timeSlice,
  onPause,
  onRecord,
  onResume,
  onStop,
  senstivity,
  color,
}: AudioRecorderPropsType) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Array<Blob>>([]);
  const audioAnalyser = useAudioAnalyser(mediaRecorderRef, isRecording);
  const averageDecibels = useDecibles(audioAnalyser, isRecording);
  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (event) => {
          if (!isPaused) {
            audioChunksRef.current.push(event.data);
            if (getCurrentAudioBlobPacket) {
              getCurrentAudioBlobPacket(event.data);
            }
          }
        };

        mediaRecorder.onstop = () => {
          const allChunks = audioChunksRef.current;
          const audioBlob = new Blob(allChunks, { type: "audio/wav" });
          audioChunksRef.current = [];
          if (getAudioBlobOnStop) {
            getAudioBlobOnStop(audioBlob);
          }
        };

        mediaRecorder.start(timeSlice ?? 1000);
        if (onRecord) onRecord();
        setIsRecording(true);
      })
      .catch((error) => {
        if (handleError) handleError(error);
        console.error("Error accessing microphone:", error);
      });
  };
  const handlePauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      if (onPause) onPause();
      setIsPaused(true);
    }
  };

  const handleResumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      if (onResume) onResume();
      setIsPaused(false);
    }
  };

  const handleStopRecording = () => {
    if (
      mediaRecorderRef.current &&
      (mediaRecorderRef.current.state === "recording" ||
        mediaRecorderRef.current.state === "paused")
    ) {
      mediaRecorderRef.current.stop();
      if (onStop) onStop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap">
          {isRecording ? (
            <div className="flex gap-2">
              {!isPaused ? (
                <div className="flex items-center justify-center mx-10 border relative">
                  <div
                    className="rounded-full absolute z-20"
                    style={{
                      padding: `calc( ${Math.min(((averageDecibels ?? 0) * (senstivity ?? 1)) / 5, 25)}px)`,
                      transition: "padding 0.1s ease-in-out",
                      backgroundColor: color?.auora ?? "rgb(191 219 254)",
                    }}
                  >
                    <ActionButton
                      actionButtonColor={{
                        base: color?.base,
                        hovered: color?.hover,
                      }}
                      onAction={handlePauseRecording}
                    >
                      <PauseIcon color={color?.iconColor} />
                    </ActionButton>
                  </div>
                </div>
              ) : (
                <ActionButton
                  actionButtonColor={{
                    base: color?.base,
                    hovered: color?.hover,
                  }}
                  onAction={handleResumeRecording}
                >
                  <PlayIcon color={color?.iconColor} />
                </ActionButton>
              )}

              <ActionButton
                actionButtonColor={{ base: color?.base, hovered: color?.hover }}
                onAction={handleStopRecording}
              >
                <Tick color={color?.iconColor} />
              </ActionButton>
            </div>
          ) : (
            <ActionButton
              actionButtonColor={{ base: color?.base, hovered: color?.hover }}
              onAction={handleStartRecording}
            >
              <MicOffIcon color={color?.iconColor} />
            </ActionButton>
          )}
        </div>
      </div>
    </div>
  );
};
