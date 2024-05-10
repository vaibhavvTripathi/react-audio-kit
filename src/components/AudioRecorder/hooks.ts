import { useEffect, useState } from "react";

export const useDecibles = (
  audioAnalyser: AnalyserNode | null,
  isRecording: boolean
) => {
  const [averageDecibels, setAverageDecibels] = useState<number | null>(null);
  useEffect(() => {
    if (!isRecording) return;
    if (audioAnalyser) {
      const bufferLength = audioAnalyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const calculateAverageDecibels = () => {
        audioAnalyser.getByteFrequencyData(dataArray);
        const sum = dataArray.reduce((acc, value) => acc + value, 0);
        const avg = sum / bufferLength;
        setAverageDecibels(avg);
      };

      const interval = setInterval(calculateAverageDecibels, 100);
      return () => clearInterval(interval);
    }
  }, [audioAnalyser, isRecording]);
  return averageDecibels;
};

export const useAudioAnalyser = (
  mediaRecorderRef: React.MutableRefObject<MediaRecorder | null>
) => {
  const [audioAnalyser, setAudioAnalyser] = useState<AnalyserNode | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  useEffect(() => {
    const audioCtx = new AudioContext();
    setAudioContext(audioCtx);
  }, []);
  useEffect(() => {
    if (audioContext && mediaRecorderRef.current?.stream) {
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(
        mediaRecorderRef.current?.stream
      );
      source.connect(analyser);
      setAudioAnalyser(analyser);
    }
  }, [audioContext, mediaRecorderRef, mediaRecorderRef.current?.stream]);
  return audioAnalyser;
};
