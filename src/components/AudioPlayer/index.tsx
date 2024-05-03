import React, { useState, useRef, useEffect } from "react";
import {
  ActionButton,
  ErrorIcon,
  ForwardIcon,
  Loader,
  LoopIcon,
  LoopIconFaded,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  QueueIcon,
  Songbar,
  VolumeActive,
  VolumeInactive,
} from "./childComponents";
import { Audio, CurrentPlaybackStateType } from "./types";
import { useBufferedAudioPercentage, useCurrentPLayback } from "./hooks";
import disc from "../AudioPlayer/disc.png";

export interface AudioPlayerProps {
  audios: Array<Audio>;
  activeAudioIndex: number;
  autoplay?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audios }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
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
  } = useCurrentPLayback(audioRef, audios);
  return (
    <div>
      <div className="audio-player  relative shadow-md">
        <div className="cursor-pointer">
          <input
            type="range"
            value={currentPlaybackState.progress}
            onChange={handleSliderChange}
            className="slider appearance-none cursor-pointer bg-gray-200 h-1 w-full rounded-full focus:outline-none absolute top-0 transition-all duration-300 ease-in-out"
            min="0"
            max="100"
            step="0.1"
            style={{
              backgroundImage: `linear-gradient(to right, blue 0%, blue ${currentPlaybackState.progress}%, #B7B8BC ${currentPlaybackState.progress}%, #B7B8BC ${bufferedPercentage}%, #EFF0F3 ${bufferedPercentage}%, #EFF0F3 100%)`,
            }}
          />
        </div>
        <div className="flex justify-between px-1 ">
          <h6 className="mt-1">
            {progressToDurationCoverter(currentPlaybackState.progress)}
          </h6>
          <h6 className="mt-1">{progressToDurationCoverter(100)}</h6>
        </div>
        <div className="p-2 flex justify-between items-center pb-5">
          <div className="basis-52  flex items-center gap-4">
            <img
              src={audios[currentPlaybackState.activeIndex].img ?? disc}
              className="block h-20 w-20"
              style={{ borderRadius: "10px" }}
              alt=""
            />
            <div>
              <h3 className="" style={{fontSize:"1.5rem"}}>{audios[currentPlaybackState.activeIndex].heading ?? ""}</h3>
              <h6>
                {audios[currentPlaybackState.activeIndex].subheading ?? ""}
              </h6>
            </div>
          </div>
          <div className="basis-96  flex justify-center gap-3">
            <ActionButton onAction={goPrev}>
              <PrevIcon />
            </ActionButton>
            <ActionButton
              disabled={currentPlaybackState.loading}
              onAction={togglePlay}
            >
              {currentPlaybackState.isError ? (
                <ErrorIcon />
              ) : currentPlaybackState.loading ? (
                <Loader />
              ) : currentPlaybackState.isPlaying ? (
                <PauseIcon />
              ) : (
                <PlayIcon />
              )}
            </ActionButton>
            <ActionButton onAction={goFwd}>
              <ForwardIcon />
            </ActionButton>
          </div>
          <div className="basis-52 flex items-center gap-2">
            <ActionButton
              onAction={toggleLoop}
              actionButtonColor={{ base: "#EFF0F3", hovered: "#d7d8da" }}
              padding={7}
            >
              {currentPlaybackState.looped ? <LoopIcon /> : <LoopIconFaded />}
            </ActionButton>

            <ActionButton
              onAction={toggleVolume}
              actionButtonColor={{ base: "#EFF0F3", hovered: "#d7d8da" }}
              padding={7}
            >
              {currentPlaybackState.volume === 0 ? (
                <VolumeInactive />
              ) : (
                <VolumeActive />
              )}
            </ActionButton>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={currentPlaybackState.volume}
              onChange={handleVolumeChange}
              className="slider appearance-none cursor-pointer basis-22 bg-gray-200 h-1 w-full rounded-full focus:outline-none transition-all duration-300 ease-in-out"
              style={{
                backgroundImage: `linear-gradient(to right, blue 0%, blue ${currentPlaybackState.volume * 100}%, #e5e7eb ${currentPlaybackState.volume * 100}%, #e5e7eb 100%)`,
              }}
            />
          </div>
        </div>
        <audio
          controls
          key={currentPlaybackState.activeIndex}
          ref={audioRef}
          src={audios[currentPlaybackState.activeIndex].src}
          style={{ display: "none" }}
          crossOrigin="anonymous"
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onError={handleError}
          onLoadedData={handleLoading}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
