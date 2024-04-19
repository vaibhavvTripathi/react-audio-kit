import React, { useEffect, useMemo, useRef, useState } from "react";

type Lyric = {
  value: string;
  duration: number;
};

type LyricsPropType = {
  lyrics: Array<Lyric>;
  hasStarted: boolean;
  height: string;
};

export const Lyrics = ({ lyrics, hasStarted, height }: LyricsPropType) => {
  const activeLyric = useActiveLyric({ lyrics, hasStarted });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (activeLyric !== -1) {
        // Get the active index container div
        const activeDiv = containerRef.current.childNodes[
          activeLyric
        ] as HTMLElement;
        if (activeDiv) {
          // Calculate the scroll amount to center the active index container div
          const containerHeight = containerRef.current.clientHeight;
          const activeDivHeight = activeDiv.clientHeight;
          const scrollTop =
            activeDiv.offsetTop - (containerHeight - activeDivHeight) / 2;
          containerRef.current.scrollTo({ top: scrollTop, behavior: "smooth" });
        }
      }
    }
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
            className={`${activeLyric === index ? "text-4xl" : "text-xl"} transition-all duration-400 font-${activeLyric === index ? "bold" : "medium"} ${activeLyric === index ? "text-black" : "text-gray"}`}
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

const useActiveLyric = ({
  lyrics,
  hasStarted,
}: {
  lyrics: Array<Lyric>;
  hasStarted: boolean;
}) => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);

  const prefixSum = useMemo(
    () => getPrefixSum(lyrics.map((l) => l.duration)),
    [lyrics]
  );
  const totalDuration = useMemo(
    () =>
      lyrics.reduce(
        (accumulator, currLyric) => accumulator + currLyric.duration,
        0
      ),
    [lyrics]
  );

  useEffect(() => {
    if (!hasStarted || currentTimestamp >= totalDuration) return;
    const interval = setInterval(() => {
      setCurrentTimestamp((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [hasStarted, currentTimestamp]);

  return findIndexOfGreater(prefixSum, currentTimestamp);
};

const getPrefixSum = (arr: Array<number>) => {
  const prefixSum: Array<number> = [];
  arr.forEach((n, i) => {
    if (i == 0) prefixSum.push(n);
    else prefixSum.push(prefixSum[i - 1] + n);
  });
  return prefixSum;
};

function findIndexOfGreater(array: number[], target: number): number {
  const index = array.findIndex((num) => num > target);
  return index !== -1 ? index : array.length; // Return array length if no element is greater
}
