import { useEffect, useMemo, useState } from "react";
import { Lyric } from "./types";
import { findIndexOfGreater, getPrefixSum } from "./utills";

export const useActiveLyricIndex = ({
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
