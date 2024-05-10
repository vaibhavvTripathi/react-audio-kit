export const formatDuration = (currentDuration: number) => {
  const minutes = Math.floor(currentDuration / 60);
  const secs = Math.floor(currentDuration % 60);
  const formattedMins = minutes < 10 ? "0" + minutes : minutes;
  const formattedSecs = secs < 10 ? "0" + secs : secs;
  return `${formattedMins}:${formattedSecs}`;
};
