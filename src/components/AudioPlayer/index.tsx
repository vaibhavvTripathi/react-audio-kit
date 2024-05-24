import { useEffect, useRef } from "react";
import disc from "../AudioPlayer/disc.png";
import {
  ActionButton,
  ErrorIcon,
  ForwardIcon,
  Loader,
  LoopIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  VolumeActive,
  VolumeInactive,
} from "./childComponents";
import { useCurrentPLayback } from "./hooks";
import { Audio, CurrentPlaybackStateType } from "./types";
import "../../index.css";
interface AudioPlayerProps {
  audios: Array<Audio>;
  getCurrentPlayback?: (
    currentPlayback: CurrentPlaybackStateType & {
      bufferedProgressPercentage: number;
    }
  ) => void;
  defaultPlayback?: CurrentPlaybackStateType;
  preload?: "auto" | "metadata" | "none";
  theme?: Theme;
  hideImg?: boolean;
  hideAudioName?: boolean;
  hideLoopIcon?: boolean;
  onClickImage?: () => void;
  onClickTitle?: () => void;
  onClickSubtitle?: () => void;
  borderRadius?: number;
}

type Theme = {
  baseMediaButtonColor?: string;
  hoveredMediaButtonColor?: string;
  mediaIconColor?: string;
  background?: string;
  text?: string;
  loaderColor?: string;
  baseControlButtonColor?: string;
  hoveredControlButtonColor?: string;
  controlButtonIconColor?: string;
  shadow?: boolean;
};

export const AudioPlayer = ({
  audios,
  getCurrentPlayback,
  defaultPlayback,
  preload,
  theme,
  hideAudioName,
  hideImg,
  hideLoopIcon,
  onClickImage,
  onClickSubtitle,
  onClickTitle,
  borderRadius,
}: AudioPlayerProps) => {
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
  } = useCurrentPLayback(audioRef, audios, defaultPlayback);
  useEffect(() => {
    if (getCurrentPlayback) {
      getCurrentPlayback({
        ...currentPlaybackState,
        bufferedProgressPercentage: bufferedPercentage,
      });
    }
  }, [currentPlaybackState, bufferedPercentage]);
  if (audios.length === 0) {
    return (
      <div className="mx-auto">{"Uh..ohh no media files present :("} </div>
    );
  }
  return (
    <>
      <div
        className={`audio-player  relative ${theme?.shadow && "shadow-md"}`}
        style={{ borderRadius: `${borderRadius ?? 0}px` }}
      >
        <div className="cursor-pointer">
          <input
            type="range"
            value={currentPlaybackState.progress}
            onChange={handleSliderChange}
            className={`slider appearance-none cursor-pointer customSlider bg-gray-200 h-1 w-full rounded-full focus:outline-none absolute top-0 transition-all duration-300 ease-in-out`}
            min="0"
            max="100"
            step="0.1"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme?.hoveredMediaButtonColor ?? "blue"} 0%, ${theme?.hoveredMediaButtonColor ?? "blue"} ${currentPlaybackState.progress}%, #B7B8BC ${currentPlaybackState.progress}%, #B7B8BC ${bufferedPercentage}%, #EFF0F3 ${bufferedPercentage}%, #EFF0F3 100%)`,
            }}
          />
        </div>
        <div className="flex justify-between px-1 ">
          <h6 className="mt-1 text-sm">
            {progressToDurationCoverter(currentPlaybackState.progress)}
          </h6>
          <h6 className="mt-1 text-sm">{progressToDurationCoverter(100)}</h6>
        </div>
        <div className="p-2 flex justify-between items-center pb-5">
          <div className="basis-52 flex items-center gap-4">
            {!hideImg && (
              <img
                src={audios[currentPlaybackState.activeIndex].img ?? disc}
                className="block h-12 w-12 "
                style={{
                  borderRadius: "10px",
                  cursor: onClickImage ? "pointer" : "default",
                }}
                alt=""
                onClick={() => (onClickImage ? onClickImage() : {})}
              />
            )}
            {!hideAudioName && (
              <div>
                <h3
                  className=" text-sm  truncate"
                  style={{
                    color: `${theme?.text ?? "black"}`,
                    cursor: onClickTitle ? "pointer" : "default",
                  }}
                  onClick={() => (onClickTitle ? onClickTitle() : {})}
                >
                  {audios[currentPlaybackState.activeIndex].heading ??
                    audios[currentPlaybackState.activeIndex].src
                      .substring(
                        audios[
                          currentPlaybackState.activeIndex
                        ].src.lastIndexOf("/") + 1
                      )
                      .split(".")[0]}
                </h3>
                <h6
                  className="text-xs w-20 truncate "
                  style={{
                    color: `${theme?.text ?? "black"}`,
                    opacity: 0.7,
                    cursor: onClickSubtitle ? "pointer" : "default",
                  }}
                  onClick={() => (onClickSubtitle ? onClickSubtitle() : {})}
                >
                  {audios[currentPlaybackState.activeIndex].subheading ?? "---"}
                </h6>
              </div>
            )}
          </div>

          <div className="basis-96  flex justify-center gap-3">
            <ActionButton
              actionButtonColor={{
                base: theme?.baseMediaButtonColor,
                hovered: theme?.hoveredMediaButtonColor,
              }}
              onAction={goPrev}
              disabled={audios.length <= 1}
            >
              <PrevIcon color={theme?.mediaIconColor} />
            </ActionButton>
            <ActionButton
              disabled={currentPlaybackState.loading}
              onAction={togglePlay}
              actionButtonColor={{
                base: theme?.baseMediaButtonColor,
                hovered: theme?.hoveredMediaButtonColor,
              }}
            >
              {currentPlaybackState.isError ? (
                <ErrorIcon color={theme?.mediaIconColor} />
              ) : currentPlaybackState.loading ? (
                <Loader color={theme?.loaderColor} />
              ) : currentPlaybackState.isPlaying ? (
                <PauseIcon color={theme?.mediaIconColor} />
              ) : (
                <PlayIcon color={theme?.mediaIconColor} />
              )}
            </ActionButton>
            <ActionButton
              actionButtonColor={{
                base: theme?.baseMediaButtonColor,
                hovered: theme?.hoveredMediaButtonColor,
              }}
              onAction={goFwd}
              disabled={audios.length <= 1}
            >
              <ForwardIcon color={theme?.mediaIconColor} />
            </ActionButton>
          </div>
          <div className="basis-52 flex items-center gap-2">
            {!hideLoopIcon && (
              <ActionButton
                onAction={toggleLoop}
                actionButtonColor={{
                  base: theme?.baseControlButtonColor ?? "#EFF0F3",
                  hovered: theme?.hoveredControlButtonColor ?? "#d7d8da",
                }}
                padding={7}
              >
                <LoopIcon
                  color={theme?.controlButtonIconColor ?? "black"}
                  opacity={currentPlaybackState.looped ? 1 : 0.4}
                />
              </ActionButton>
            )}

            <ActionButton
              onAction={toggleVolume}
              actionButtonColor={{
                base: theme?.baseControlButtonColor ?? "#EFF0F3",
                hovered: theme?.hoveredControlButtonColor ?? "#d7d8da",
              }}
              padding={7}
            >
              {currentPlaybackState.volume === 0 ? (
                <VolumeInactive
                  color={theme?.controlButtonIconColor ?? "black"}
                />
              ) : (
                <VolumeActive
                  color={theme?.controlButtonIconColor ?? "black"}
                />
              )}
            </ActionButton>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={currentPlaybackState.volume}
              onChange={handleVolumeChange}
              className={`slider appearance-none cursor-pointer basis-22 customSlider bg-gray-200 h-1 w-full rounded-full focus:outline-none transition-all duration-300 ease-in-out `}
              style={{
                backgroundImage: `linear-gradient(to right, ${theme?.hoveredMediaButtonColor ?? "blue"} 0%, ${theme?.hoveredMediaButtonColor ?? "blue"} ${currentPlaybackState.volume * 100}%, #e5e7eb ${currentPlaybackState.volume * 100}%, #e5e7eb 100%)`,
                background: theme?.hoveredMediaButtonColor ?? "blue",
              }}
            />
          </div>
        </div>
        <audio
          controls
          key={currentPlaybackState.activeIndex}
          ref={audioRef}
          src={audios[currentPlaybackState.activeIndex % audios.length].src}
          style={{ display: "none" }}
          crossOrigin="anonymous"
          preload={preload ?? "metadata"}
          onTimeUpdate={handleTimeUpdate}
          onError={handleError}
          onLoadedData={handleLoading}
        />
      </div>
      <style>
        {`
          .customSlider[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 10px;
            height: 10px;
            cursor: pointer;
            border-radius: 100%;
            background-color: ${theme?.hoveredMediaButtonColor ?? "blue"};
          }

          .customSlider[type="range"]::-moz-range-thumb {
            width: 25px;
            height: 25px;
            background-color: ${theme?.hoveredMediaButtonColor ?? "blue"};
            cursor: pointer;
          }
          
          input[type="range"]:focus {
            outline: none;
        }
        `}
      </style>
    </>
  );
};
