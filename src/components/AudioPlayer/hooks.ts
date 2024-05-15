import { useEffect, useState } from "react";
import { getBufferedProgressFromCurrentTime } from "./utills";
import { Audio, CurrentPlaybackStateType } from "./types";

export const useBufferedAudioPercentage = (
  audioRef: React.RefObject<HTMLAudioElement>
) => {
  const [loadedPercentage, setLoadedPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const bufferedPercentage = getBufferedProgressFromCurrentTime(audioRef);
      if (loadedPercentage !== bufferedPercentage) {
        setLoadedPercentage(bufferedPercentage);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [audioRef, loadedPercentage]);
  return loadedPercentage;
};

const fallbackPlaybackState: CurrentPlaybackStateType = {
  progress: 0,
  isPlaying: false,
  volume: 1,
  activeIndex: 0,
  loading: true,
  isError: false,
  looped: true,
};
export const useCurrentPLayback = (
  audioRef: React.RefObject<HTMLAudioElement>,
  audios: Array<Audio>,
  defaultPlayback?: CurrentPlaybackStateType
) => {
  const [currentPlaybackState, setCurrentPlaybackState] =
    useState<CurrentPlaybackStateType>(
      defaultPlayback ?? fallbackPlaybackState
    );
  useEffect(() => {
    setCurrentPlaybackState(defaultPlayback ?? fallbackPlaybackState);
  }, [audios]);
  const bufferedPercentage = useBufferedAudioPercentage(audioRef);
  const [fallbackVolume, setFallbackVolume] = useState<number>(1);
  useEffect(() => {
    if (currentPlaybackState.isError) return;
    if (!audioRef || !audioRef.current || audioRef.current.readyState < 2) {
      setCurrentPlaybackState((prev) => {
        return { ...prev, loading: true };
      });
    } else {
      setCurrentPlaybackState((prev) => {
        return { ...prev, loading: false };
      });
    }
  }, [audioRef.current?.readyState]);

  const togglePlay = () => {
    if (currentPlaybackState.loading || currentPlaybackState.isError) return;
    if (audioRef.current) {
      if (currentPlaybackState.isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setCurrentPlaybackState((prev) => {
        return { ...prev, isPlaying: !prev.isPlaying };
      });
    }
  };

  const toggleVolume = () => {
    const volumeValue =
      currentPlaybackState.volume === 0 ? Math.max(0.2, fallbackVolume) : 0;

    setCurrentPlaybackState((prev) => {
      return { ...prev, volume: volumeValue };
    });
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  };
  const toggleLoop = () => {
    setCurrentPlaybackState((prev) => {
      return { ...prev, looped: !currentPlaybackState.looped };
    });
  };
  const goPrev = () => {
    if (!audioRef?.current) return;
    let prevIndex = currentPlaybackState.activeIndex - 1;
    prevIndex = prevIndex < 0 ? audios.length - 1 : prevIndex;
    setCurrentPlaybackState((prev) => {
      return {
        ...prev,
        progress: 0,
        activeIndex: prevIndex,
        isPlaying: false,
        loading: true,
        isError: false,
      };
    });
  };

  const goFwd = () => {
    if (!audioRef?.current) return;
    const nextIndex = (currentPlaybackState.activeIndex + 1) % audios.length;
    setCurrentPlaybackState((prev) => {
      return {
        ...prev,
        progress: 0,
        activeIndex: nextIndex,
        isPlaying: false,
        loading: true,
        isError: false,
      };
    });
  };
  const progressToDurationCoverter = (progress: number) => {
    if (!audioRef || !audioRef.current) return `00:00`;
    const duration = !audioRef.current.duration ? 1 : audioRef.current.duration;

    const currentDuration = duration * (progress / 100);
    const minutes = Math.floor(currentDuration / 60);
    const secs = Math.floor(currentDuration % 60);
    const formattedMins = minutes < 10 ? "0" + minutes : minutes;
    const formattedSecs = secs < 10 ? "0" + secs : secs;
    return `${formattedMins}:${formattedSecs}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef || !audioRef.current) return;
    const value = parseFloat(e.target.value);
    const duration = audioRef.current?.duration || 0;
    const currentTime = (value / 100) * duration;
    setCurrentPlaybackState((prev) => {
      return { ...prev, progress: value };
    });
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef || !audioRef.current) return;
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = !audioRef.current.duration
        ? 1
        : audioRef.current.duration;
      const calculatedProgress = (currentTime / duration) * 100;
      setCurrentPlaybackState((prev) => {
        return { ...prev, progress: calculatedProgress };
      });

      if (calculatedProgress === 100) {
        if (!currentPlaybackState.looped) goFwd();
        else {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      }
    }
  };
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volumeValue = parseFloat(event.target.value);
    setFallbackVolume(volumeValue);
    setCurrentPlaybackState((prev) => {
      return { ...prev, volume: volumeValue };
    });
    if (audioRef.current) {
      audioRef.current.volume = volumeValue;
    }
  };

  const handleLoading = () => {
    if (!audioRef || !audioRef.current) return;
    if (audioRef.current.readyState >= 2) {
      setCurrentPlaybackState((prev) => {
        return { ...prev, loading: false };
      });
    }
  };
  const handleError = () => {
    setCurrentPlaybackState((prev) => {
      return { ...prev, loading: false, isError: true };
    });
  };
  return {
    handleLoading,
    handleVolumeChange,
    handleTimeUpdate,
    handleSliderChange,
    progressToDurationCoverter,
    goFwd,
    goPrev,
    togglePlay,
    bufferedPercentage,
    currentPlaybackState,
    handleError,
    toggleVolume,
    toggleLoop,
  };
};
