import { useEffect, useRef } from "react";
import { useActiveLyricIndex } from "./hooks";
import { LyricsPropType } from "./types";
import { isActiveElementInViewport, scrollToActiveLyric } from "./utills";
import "../../index.css"

export const Lyrics = ({ lyrics, hasStarted, height }: LyricsPropType) => {
  const activeLyric = useActiveLyricIndex({ lyrics, hasStarted });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActiveElementInViewport(containerRef, activeLyric)) {
      scrollToActiveLyric(containerRef, activeLyric);
    }
  }, [activeLyric]);
  return (
    <div
      ref={containerRef}
      className={` flex items-center border flex-col gap-5 hide-scroll overflow-y-scroll fade-top fade-bottom`}
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
