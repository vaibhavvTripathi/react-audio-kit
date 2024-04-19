import { useEffect, useRef } from "react";
import {
  scrollToActiveLyric,
} from "./utills";
import { LyricsPropType } from "./types";
import { useActiveLyricIndex } from "./hooks";

export const Lyrics = ({ lyrics, hasStarted, height }: LyricsPropType) => {
  const activeLyric = useActiveLyricIndex({ lyrics, hasStarted });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToActiveLyric(containerRef, activeLyric);
  }, [activeLyric]); // Trigger effect when activeLyric changes
  return (
    <div
      ref={containerRef}
      className={` flex items-center flex-col gap-5 hide-scroll overflow-y-scroll`}
      style={{ height: height }}
    >
      {lyrics.map((item, index) => {
        return (
          <div
            key={index}
            className={`${activeLyric === index ? "text-4xl" : "text-xl"} transition-all duration-400 ${activeLyric === index ? "font-bold" : "font-medium"} ${activeLyric === index ? "text-black" : "text-gray"}`}
            style={{
              color: activeLyric === index ? "black" : "gray",
              fontWeight: activeLyric === index ? 800 : 500,
            }}
          >
            {item.value}
          </div>
        );
      })}
    </div>
  );
};
