export const getBufferedProgressFromCurrentTime = (
  audioRef: React.RefObject<HTMLAudioElement>
) => {
  const buffered = audioRef.current?.buffered;
  if (buffered && buffered.length > 0) {
    const lastBufferedEnd = buffered.end(buffered.length - 1);
    const duration = audioRef.current.duration;
    if (!duration) return 0;
    const ans = (lastBufferedEnd * 100) / duration;
    return ans;
  } else {
    return 0;
  }
};
